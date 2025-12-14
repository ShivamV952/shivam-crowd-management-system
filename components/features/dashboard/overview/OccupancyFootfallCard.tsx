"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import StatCard from "../../../common/ui/StatCard";
import { getFootfall } from "@/services/api/analytics.service";
import { FootfallRequest } from "@/types/contracts";

interface OccupancyFootfallCardProps {
  siteId?: string;
}

export default function OccupancyFootfallCard({
  siteId,
}: OccupancyFootfallCardProps) {
  const [footfall, setFootfall] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) {
      setIsLoading(false);
      return;
    }

    const fetchFootfallData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate time range: last 24 hours
        const now = new Date();
        const toUtc = now.getTime().toString();
        const fromUtc = (now.getTime() - 24 * 60 * 60 * 1000).toString(); // 24 hours ago

        const request: FootfallRequest = {
          siteId,
          fromUtc,
          toUtc,
        };

        const response = await getFootfall(request);
        setFootfall(response.footfall);
      } catch (err) {
        // Handle axios errors
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to load footfall data. Please try again.";
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

    fetchFootfallData();
  }, [siteId]);

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="flex w-full rounded-xl bg-white divide-x divide-gray-200">
      <div className="flex-1">
        <StatCard
          title="Live Occupancy"
          value="734"
          trend="up"
          trendText="10% More than yesterday"
        />
      </div>

      <div className="flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
            <p className="text-sm font-medium text-gray-700">Today's Footfall</p>
            <p className="text-3xl font-semibold text-gray-900">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
            <p className="text-sm font-medium text-gray-700">Today's Footfall</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : (
          <StatCard
            title="Today's Footfall"
            value={footfall !== null ? formatNumber(footfall) : "--"}
            trend="down"
            trendText="10% Less than yesterday"
          />
        )}
      </div>
    </div>
  );
}

