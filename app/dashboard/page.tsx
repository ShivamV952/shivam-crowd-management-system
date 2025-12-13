"use client";

import { useState } from "react";
import Topbar from "../Components/layout/Topbar";
import Sidebar from "../Components/layout/Sidebar";
import StatCard from "../Components/ui/StatCard";
import AvgDwellTimeCard from "../Components/ui/AvgDwellTimeCard";
import OccupancyFootfallCard from "../Components/ui/OccupancyFootfallCard";
import OverallOccupancyChart from "../Components/ui/OverallOccupancyChart";
import DemographicsCard from "../Components/ui/DemographicsCard";
import DemographicsAnalysisChart from "../Components/ui/DemographicsAnalysisChart";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<"overview" | "crowd-entries">(
    "overview"
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Dashboard
            </h2>
            <p className="text-gray-600">
              Welcome to the Crowd Management System Dashboard
            </p>
          </div>
          {activeView === "overview" && (
            <div className="pt-10 px-5">
              <div className="flex flex-row justify-center items-center">
                <StatCard title={""} value={""} trendText={""} trend={"up"} />
                <AvgDwellTimeCard />
                <OccupancyFootfallCard />
              </div>
              <div className="pt-10 px-10">
                <OverallOccupancyChart />
              </div>
              <div className="pt-10 flex justify-around items-center">
                <DemographicsCard />
                <DemographicsAnalysisChart />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
