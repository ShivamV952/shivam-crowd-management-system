"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

import LocationDropdown from "../common/ui/LocationDropdown";
import { Site } from "@/types/contracts";
import { getSites } from "@/services/api/sites.service";

interface TopbarProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function Topbar({
  isSidebarCollapsed,
  onToggleSidebar,
}: TopbarProps) {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSiteId, setSelectedSiteId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const sitesData = await getSites();
        setSites(sitesData);

        // Set first site as default if available
        if (sitesData.length > 0) {
          setSelectedLocation(sitesData[0].name);
          setSelectedSiteId(sitesData[0].siteId);
          localStorage.setItem("selectedSiteId", sitesData[0].siteId);
        }
      } catch (err) {
        // Handle axios errors
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to load sites. Please try again.";
          setError(errorMessage);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSites();
  }, []);

  const handleLocationChange = (locationName: string) => {
    setSelectedLocation(locationName);
    const selectedSite = sites.find((site) => site.name === locationName);
    if (selectedSite) {
      setSelectedSiteId(selectedSite.siteId);
      localStorage.setItem("selectedSiteId", selectedSite.siteId);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("siteChanged"));
    }
  };

  const locationNames = sites.map((site) => site.name);

  return (
    <header className="flex h-14 w-full items-center gap-4 border-b border-gray-200 bg-white px-6">
      {/* Hamburger Menu Button - Only show when sidebar is collapsed */}
      {isSidebarCollapsed && (
        <button
          onClick={onToggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <span className="text-xl">☰</span>
        </button>
      )}

      {/* Title */}
      <h1 className="text-sm font-medium text-gray-800">Crowd Solutions</h1>

      <span className="text-gray-300">|</span>

      {/* Dropdown */}
      {isLoading ? (
        <div className="w-48 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
          Loading sites...
        </div>
      ) : error ? (
        <div className="w-48 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      ) : (
        <LocationDropdown
          locations={locationNames}
          selected={selectedLocation}
          onChange={handleLocationChange}
        />
      )}
    </header>
  );
}
