"use client";

import { useState, useEffect } from "react";
import Topbar from "../../components/layout/Topbar";
import Sidebar from "../../components/layout/Sidebar";
import StatCard from "../../components/common/ui/StatCard";
import AvgDwellTimeCard from "../../components/features/dashboard/overview/AvgDwellTimeCard";
import OccupancyFootfallCard from "../../components/features/dashboard/overview/OccupancyFootfallCard";
import OverallOccupancyChart from "../../components/charts/OverallOccupancyChart";
import DemographicsCard from "../../components/features/dashboard/overview/DemographicsCard";
import DemographicsAnalysisChart from "../../components/charts/DemographicsAnalysisChart";
import VisitorTable from "../../components/features/dashboard/crowd-entries/VisitorTable";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<"overview" | "crowd-entries">(
    "overview"
  );
  const [selectedSiteId, setSelectedSiteId] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Get selected site ID from localStorage
    const siteId = localStorage.getItem("selectedSiteId") || "";
    setSelectedSiteId(siteId);

    // Listen for custom event when site changes
    const handleSiteChange = () => {
      const newSiteId = localStorage.getItem("selectedSiteId") || "";
      setSelectedSiteId(newSiteId);
      setRefreshKey((prev) => prev + 1); // Trigger chart refresh
    };

    window.addEventListener("siteChanged", handleSiteChange);

    return () => {
      window.removeEventListener("siteChanged", handleSiteChange);
    };
  }, []);

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
                 {/* <StatCard title={""} value={""} trendText={""} trend={"up"} /> */}
                 <OccupancyFootfallCard />
                 <AvgDwellTimeCard siteId={selectedSiteId} />
               </div>
              <div className="pt-10 px-10">
                <OverallOccupancyChart key={refreshKey} siteId={selectedSiteId} />
              </div>
              <div className="pt-10 flex justify-around items-center">
                <DemographicsCard />
                <DemographicsAnalysisChart />
              </div>
            </div>
          )}
          {activeView === "crowd-entries" && (
            <div className="pt-10 px-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Crowd Entries View
              </h3>
              <VisitorTable />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
