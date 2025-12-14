"use client";

import { useEffect, useState } from "react";

import AvgDwellTimeCard from "../../components/features/dashboard/overview/AvgDwellTimeCard";
import DemographicsAnalysisChart from "../../components/charts/DemographicsAnalysisChart";
import DemographicsCard from "../../components/features/dashboard/overview/DemographicsCard";
import OccupancyFootfallCard from "../../components/features/dashboard/overview/OccupancyFootfallCard";
import OverallOccupancyChart from "../../components/charts/OverallOccupancyChart";
import Sidebar from "../../components/layout/Sidebar";
import StatCard from "../../components/common/ui/StatCard";
import Topbar from "../../components/layout/Topbar";
import VisitorTable from "../../components/features/dashboard/crowd-entries/VisitorTable";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<"overview" | "crowd-entries">(
    "overview"
  );
  const [selectedSiteId, setSelectedSiteId] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="pt-7 px-5">
            <div className="flex justify-center">
              <div className="w-[1420px]">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Overview
                </h2>
              </div>
            </div>
          </div>
          {activeView === "overview" && (
            <div className="px-5">
              <div className="flex justify-center">
                <div className="w-[1420px]">
                  <p className="text-gray-600 pb-5 text-xl font-semibold">
                    Occupancy
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-4 mx-auto w-[1420px]">
                <div className="w-[1000px]">
                  <OccupancyFootfallCard siteId={selectedSiteId} />
                </div>
                <AvgDwellTimeCard siteId={selectedSiteId} />
              </div>
              <div className="pt-10 flex justify-center">
                <div className="w-[1420px]">
                  <OverallOccupancyChart
                    key={refreshKey}
                    siteId={selectedSiteId}
                  />
                </div>
              </div>
              <p className="text-gray-600 py-5 text-xl font-semibold">
                Demographics
              </p>
              <div className="pt-2 flex justify-center">
                <div className="flex gap-2 w-[1420px]">
                  <div className="w-[35%]">
                    <DemographicsCard siteId={selectedSiteId} />
                  </div>
                  <div className="w-[65%]">
                    <DemographicsAnalysisChart siteId={selectedSiteId} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeView === "crowd-entries" && (
            <div className="px-5">
              <div className="flex justify-center">
                <div className="w-[1420px]">
                  <VisitorTable siteId={selectedSiteId} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
