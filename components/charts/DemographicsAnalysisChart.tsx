"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { time: "08:00", male: 175, female: 135 },
  { time: "09:00", male: 180, female: 138 },
  { time: "10:00", male: 185, female: 140 },
  { time: "11:00", male: 190, female: 142 },
  { time: "12:00", male: 198, female: 147 },
  { time: "13:00", male: 200, female: 148 },
  { time: "14:00", male: 190, female: 142 },
  { time: "15:00", male: 202, female: 150 },
  { time: "16:00", male: 208, female: 152 },
  { time: "17:00", male: 205, female: 150 },
  { time: "18:00", male: 215, female: 158 },
];

export default function DemographicsAnalysisChart() {
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
          <AreaChart data={data}>
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

