"use client";

import { useState, useEffect, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { getDemographics } from "@/services/api/analytics.service";
import { DemographicsRequest } from "@/types/contracts";

interface DemographicsCardProps {
  siteId?: string;
}

export default function DemographicsCard({ siteId }: DemographicsCardProps) {
  const [demographicsData, setDemographicsData] = useState<{
    male: number;
    female: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) {
      setIsLoading(false);
      return;
    }

    const fetchDemographicsData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate time range: last 24 hours
        const now = new Date();
        const toUtc = now.getTime().toString();
        const fromUtc = (now.getTime() - 24 * 60 * 60 * 1000).toString(); // 24 hours ago

        const request: DemographicsRequest = {
          siteId,
          fromUtc,
          toUtc,
        };

        const response = await getDemographics(request);

        // Sum up all male and female values from buckets
        const totals = response.buckets.reduce(
          (acc, bucket) => {
            acc.male += bucket.male;
            acc.female += bucket.female;
            return acc;
          },
          { male: 0, female: 0 }
        );

        setDemographicsData(totals);
      } catch (err) {
        // Handle axios errors
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to load demographics data. Please try again.";
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

    fetchDemographicsData();
  }, [siteId]);

  const { total, malePercentage, femalePercentage } = useMemo(() => {
    if (!demographicsData) {
      return { total: 0, malePercentage: 0, femalePercentage: 0 };
    }

    const totalValue = demographicsData.male + demographicsData.female;
    if (totalValue === 0) {
      return { total: 0, malePercentage: 0, femalePercentage: 0 };
    }

    return {
      total: totalValue,
      malePercentage: Math.round((demographicsData.male / totalValue) * 100),
      femalePercentage: Math.round(
        (demographicsData.female / totalValue) * 100
      ),
    };
  }, [demographicsData]);

  if (isLoading) {
    return (
      <div className="w-full h-full rounded-xl bg-white p-5">
        <h2 className="text-sm font-medium text-gray-800 mb-3">Demographics</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full rounded-xl bg-white p-5">
        <h2 className="text-sm font-medium text-gray-800 mb-3">Demographics</h2>
        <div className="flex items-center justify-center h-64 text-red-600 text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl bg-white p-5">
      {/* Header */}
      <h2 className="text-sm font-medium text-gray-800 mb-3">Demographics</h2>

      <div className="relative rounded-lg bg-gray-50 p-4 h-64">
        <p className="text-sm font-medium text-gray-700 mb-4">
          Chart of Demographics
        </p>

        <div className="flex items-center gap-6">
          {/* Donut */}
          <div className="relative h-40 w-40">
            <div
              className="absolute inset-0 rounded-full transition-all duration-500"
              style={{
                background: `conic-gradient(
                  #7fb3b2 0% ${malePercentage}%,
                  #b7e3e1 ${malePercentage}% 100%
                )`,
              }}
            />

            {/* Inner circle */}
            <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center text-center">
              <span className="text-xs text-gray-500">Total Crowd</span>
              <span className="text-sm font-semibold text-gray-900">
                {total > 0 ? "100%" : "0%"}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded bg-[#7fb3b2]" />
              <span className="text-gray-700">{malePercentage}% Males</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded bg-[#b7e3e1]" />
              <span className="text-gray-700">{femalePercentage}% Females</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
