"use client";

import { FootfallRequest, OccupancyRequest } from "@/types/contracts";
import axios, { AxiosError } from "axios";
import { getFootfall, getOccupancy } from "@/services/api/analytics.service";
import { useEffect, useState } from "react";

import StatCard from "../../ui/StatCard";

interface OccupancyFootfallCardProps {
  siteId?: string;
}

export default function OccupancyFootfallCard({
  siteId,
}: OccupancyFootfallCardProps) {
  const [liveOccupancy, setLiveOccupancy] = useState<number | null>(null);
  const [footfall, setFootfall] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate time range: last 24 hours
        const now = new Date();
        const toUtc = now.getTime().toString();
        const fromUtc = (now.getTime() - 24 * 60 * 60 * 1000).toString();

        // Fetch occupancy and footfall data in parallel
        const [occupancyResponse, footfallResponse] = await Promise.all([
          getOccupancy({ siteId, fromUtc, toUtc } as OccupancyRequest),
          getFootfall({ siteId, fromUtc, toUtc } as FootfallRequest),
        ]);

        // Get the most recent occupancy value (last bucket's avg)
        if (occupancyResponse.buckets && occupancyResponse.buckets.length > 0) {
          const latestBucket =
            occupancyResponse.buckets[occupancyResponse.buckets.length - 1];
          setLiveOccupancy(Math.round(latestBucket.avg));
        }

        setFootfall(footfallResponse.footfall);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to load data. Please try again.";
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

    fetchData();
  }, [siteId]);

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="flex w-full rounded-xl bg-white divide-x divide-gray-200">
      <div className="flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
            <p className="text-sm font-medium text-gray-700">Live Occupancy</p>
            <p className="text-3xl font-semibold text-gray-900">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
            <p className="text-sm font-medium text-gray-700">Live Occupancy</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : (
          <StatCard
            title="Live Occupancy"
            value={liveOccupancy !== null ? formatNumber(liveOccupancy) : "--"}
            trend="up"
            trendText="10% More than yesterday"
          />
        )}
      </div>

      <div className="flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
            <p className="text-sm font-medium text-gray-700">
              Today&apos;s Footfall
            </p>
            <p className="text-3xl font-semibold text-gray-900">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
            <p className="text-sm font-medium text-gray-700">
              Today&apos;s Footfall
            </p>
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
