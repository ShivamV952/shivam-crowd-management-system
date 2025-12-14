"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import StatCard from "../../../common/ui/StatCard";
import { getDwell } from "@/services/api/analytics.service";
import { DwellRequest } from "@/types/contracts";

interface AvgDwellTimeCardProps {
  siteId?: string;
}

export default function AvgDwellTimeCard({ siteId }: AvgDwellTimeCardProps) {
  const [avgDwellMinutes, setAvgDwellMinutes] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) {
      setIsLoading(false);
      return;
    }

    const fetchDwellData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate time range: last 24 hours
        const now = new Date();
        const toUtc = now.getTime().toString();
        const fromUtc = (now.getTime() - 24 * 60 * 60 * 1000).toString(); // 24 hours ago

        const request: DwellRequest = {
          siteId,
          fromUtc,
          toUtc,
        };

        const response = await getDwell(request);
        setAvgDwellMinutes(response.avgDwellMinutes);
      } catch (err) {
        // Handle axios errors
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to load dwell time data. Please try again.";
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

    fetchDwellData();
  }, [siteId]);

  // Format minutes to "XXmin XXsec" format
  const formatDwellTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins.toString().padStart(2, "0")}min ${secs
      .toString()
      .padStart(2, "0")}sec`;
  };

  return (
    <div className="w-[400px]">
      {isLoading ? (
        <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
          <p className="text-sm font-medium text-gray-700">Avg Dwell Time</p>
          <p className="text-3xl font-semibold text-gray-900">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col gap-2 rounded-xl bg-white px-6 py-5">
          <p className="text-sm font-medium text-gray-700">Avg Dwell Time</p>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : (
        <StatCard
          title="Avg Dwell Time"
          value={
            avgDwellMinutes !== null ? formatDwellTime(avgDwellMinutes) : "--"
          }
          trend="up"
          trendText="6% More than yesterday"
        />
      )}
    </div>
  );
}
