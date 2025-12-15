"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDemographics } from "@/services/api/analytics.service";
import { DemographicsRequest } from "@/types/contracts";

interface DemographicsAnalysisChartProps {
  siteId?: string;
}

export default function DemographicsAnalysisChart({
  siteId,
}: DemographicsAnalysisChartProps) {
  const [chartData, setChartData] = useState<
    { time: string; male: number; female: number }[]
  >([]);
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

        // Transform API response to chart data format
        const transformedData = response.buckets.map((bucket) => {
          // Extract time from local string (format: "10/12/2025 00:00:00")
          const timeMatch = bucket.local.match(/(\d{1,2}):\d{2}:\d{2}/);
          const time = timeMatch ? timeMatch[1] : "";

          return {
            time: `${time}:00`,
            male: Math.round(bucket.male),
            female: Math.round(bucket.female),
          };
        });

        setChartData(transformedData);
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
  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-800">
            Demographics Analysis
          </h2>
        </div>
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          Loading demographics data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-800">
            Demographics Analysis
          </h2>
        </div>
        <div className="h-[300px] flex items-center justify-center text-red-600 text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-800">
            Demographics Analysis
          </h2>
        </div>
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-800">
          Demographics Analysis
        </h2>

        {/* Legend */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#6faeaa]" />
            Male
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#bfe6e3]" />
            Female
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="maleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6faeaa" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6faeaa" stopOpacity={0.05} />
              </linearGradient>

              <linearGradient id="femaleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bfe6e3" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#bfe6e3" stopOpacity={0.08} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              label={{
                value: "Count",
                angle: -90,
                position: "insideLeft",
                fill: "#6b7280",
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="male"
              stroke="#6faeaa"
              strokeWidth={2}
              fill="url(#maleGradient)"
            />

            <Area
              type="monotone"
              dataKey="female"
              stroke="#bfe6e3"
              strokeWidth={2}
              fill="url(#femaleGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* X-axis label */}
      <div className="mt-2 text-center text-sm text-gray-600">
        Time
      </div>
    </div>
  );
}

