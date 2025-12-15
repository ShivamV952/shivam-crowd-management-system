"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getOccupancy } from "@/services/api/analytics.service";
import { OccupancyRequest } from "@/types/contracts";

interface OverallOccupancyChartProps {
  siteId?: string;
}

export default function OverallOccupancyChart({
  siteId,
}: OverallOccupancyChartProps) {
  const [chartData, setChartData] = useState<
    { time: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    if (!siteId) {
      setIsLoading(false);
      return;
    }

    const fetchOccupancyData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate time range: last 24 hours
        const now = new Date();
        const toUtc = now.getTime().toString();
        const fromUtc = (now.getTime() - 24 * 60 * 60 * 1000).toString(); // 24 hours ago

        const request: OccupancyRequest = {
          siteId,
          fromUtc,
          toUtc,
        };

        const response = await getOccupancy(request);

        // Transform API response to chart data format
        const transformedData = response.buckets.map((bucket) => {
          // Extract time from local string (format: "10/12/2025 00:00:00")
          const timeMatch = bucket.local.match(/(\d{1,2}):\d{2}:\d{2}/);
          const time = timeMatch ? timeMatch[1] : "";
          
          return {
            time: `${time}:00`,
            count: Math.round(bucket.avg),
          };
        });

        setChartData(transformedData);

        // Set current time for live marker
        const currentHour = now.getHours();
        setCurrentTime(`${currentHour.toString().padStart(2, "0")}:00`);
      } catch (err) {
        // Handle axios errors
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to load occupancy data. Please try again.";
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

    fetchOccupancyData();
  }, [siteId]);

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-800">
            Overall Occupancy
          </h2>
        </div>
        <div className="h-[280px] flex items-center justify-center text-gray-500">
          Loading occupancy data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-800">
            Overall Occupancy
          </h2>
        </div>
        <div className="h-[280px] flex items-center justify-center text-red-600 text-sm">
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
            Overall Occupancy
          </h2>
        </div>
        <div className="h-[280px] flex items-center justify-center text-gray-500">
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
          Overall Occupancy
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="h-2 w-2 rounded-full bg-teal-600" />
          Occupancy
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0d9488" stopOpacity={0.05} />
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

            {/* Live marker */}
            {currentTime && (
              <ReferenceLine
                x={currentTime}
                stroke="#dc2626"
                strokeDasharray="4 4"
                label={{
                  value: "Live",
                  position: "top",
                  fill: "#dc2626",
                  fontSize: 12,
                }}
              />
            )}

            <Area
              type="monotone"
              dataKey="count"
              stroke="#0d9488"
              strokeWidth={2}
              fill="url(#occupancyGradient)"
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

