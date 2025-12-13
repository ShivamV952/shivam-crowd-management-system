"use client";

import { useMemo } from "react";

interface DemographicsData {
  male: number;
  female: number;
}

interface DemographicsCardProps {
  data?: DemographicsData;
}

export default function DemographicsCard({
  data = { male: 110, female: 90 }, // dummy data
}: DemographicsCardProps) {
  const total = data.male + data.female;

  const { malePercentage, femalePercentage } = useMemo(() => {
    if (total === 0) {
      return { malePercentage: 0, femalePercentage: 0 };
    }

    return {
      malePercentage: Math.round((data.male / total) * 100),
      femalePercentage: Math.round((data.female / total) * 100),
    };
  }, [data, total]);

  return (
    <div className="w-[320px] rounded-xl bg-white p-5">
      {/* Header */}
      <h2 className="text-sm font-medium text-gray-800 mb-3">
        Demographics
      </h2>

      <div className="relative rounded-lg bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-700 mb-4">
          Chart of Demographics
        </p>

        <div className="flex items-center gap-6">
          {/* Donut */}
          <div className="relative h-32 w-32">
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
              <span className="text-xs text-gray-500">
                Total Crowd
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {total > 0 ? "100%" : "0%"}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded bg-[#7fb3b2]" />
              <span className="text-gray-700">
                {malePercentage}% Males
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded bg-[#b7e3e1]" />
              <span className="text-gray-700">
                {femalePercentage}% Females
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
