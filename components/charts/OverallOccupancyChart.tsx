"use client";

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

const data = [
  { time: "08:00", count: 150 },
  { time: "09:00", count: 155 },
  { time: "10:00", count: 160 },
  { time: "11:00", count: 170 },
  { time: "12:00", count: 165 },
  { time: "13:00", count: 175 },
  { time: "14:00", count: 180 },
  { time: "15:00", count: 175 },
  { time: "16:00", count: 185 },
];

export default function OverallOccupancyChart() {
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
          <AreaChart data={data}>
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
            <ReferenceLine
              x="16:00"
              stroke="#dc2626"
              strokeDasharray="4 4"
              label={{
                value: "Live",
                position: "top",
                fill: "#dc2626",
                fontSize: 12,
              }}
            />

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

