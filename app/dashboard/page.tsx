"use client";

import { Suspense, lazy, useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";

// Lazy load heavy components for faster initial load
const AvgDwellTimeCard = lazy(() => import("@/components/dashboard/cards/AvgDwellTimeCard"));
const DemographicsAnalysisChart = lazy(() => import("@/components/dashboard/charts/DemographicsAnalysisChart"));
const DemographicsCard = lazy(() => import("@/components/dashboard/cards/DemographicsCard"));
const OccupancyFootfallCard = lazy(() => import("@/components/dashboard/cards/OccupancyFootfallCard"));
const OverallOccupancyChart = lazy(() => import("@/components/dashboard/charts/OverallOccupancyChart"));
const VisitorTable = lazy(() => import("@/components/dashboard/tables/VisitorTable"));

const CONTAINER_WIDTH = "w-[1420px]";

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse rounded-xl bg-gray-200 h-32 w-full" />
);

export default function DashboardPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<"overview" | "crowd-entries">("overview");
  const [selectedSiteId, setSelectedSiteId] = useState<string>(
    () => localStorage.getItem("selectedSiteId") || ""
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Protect route - check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const handleSiteChange = () => {
      setSelectedSiteId(localStorage.getItem("selectedSiteId") || "");
      setRefreshKey((prev) => prev + 1);
    };

    window.addEventListener("siteChanged", handleSiteChange);
    return () => window.removeEventListener("siteChanged", handleSiteChange);
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
              <div className={CONTAINER_WIDTH}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
              </div>
            </div>
          </div>

          {activeView === "overview" && (
            <div className="px-5">
              <div className="flex justify-center">
                <div className={CONTAINER_WIDTH}>
                  <p className="text-gray-600 pb-5 text-xl font-semibold">Occupancy</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 w-[1420px] mx-auto">
                <div className="w-[1000px]">
                  <Suspense fallback={<LoadingSkeleton />}>
                    <OccupancyFootfallCard siteId={selectedSiteId} />
                  </Suspense>
                </div>
                <Suspense fallback={<LoadingSkeleton />}>
                  <AvgDwellTimeCard siteId={selectedSiteId} />
                </Suspense>
              </div>
              <div className="pt-10 flex justify-center">
                <div className={CONTAINER_WIDTH}>
                  <Suspense fallback={<LoadingSkeleton />}>
                    <OverallOccupancyChart key={refreshKey} siteId={selectedSiteId} />
                  </Suspense>
                </div>
              </div>
              <div className="flex justify-center">
                <div className={CONTAINER_WIDTH}>
                  <p className="text-gray-600 py-5 text-xl font-semibold">Demographics</p>
                </div>
              </div>
              <div className="pt-2 flex justify-center">
                <div className={`flex gap-2 ${CONTAINER_WIDTH}`}>
                  <div className="w-[35%]">
                    <Suspense fallback={<LoadingSkeleton />}>
                      <DemographicsCard siteId={selectedSiteId} />
                    </Suspense>
                  </div>
                  <div className="w-[65%]">
                    <Suspense fallback={<LoadingSkeleton />}>
                      <DemographicsAnalysisChart siteId={selectedSiteId} />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === "crowd-entries" && (
            <div className="px-5">
              <div className="flex justify-center">
                <div className={CONTAINER_WIDTH}>
                  <Suspense fallback={<LoadingSkeleton />}>
                    <VisitorTable siteId={selectedSiteId} />
                  </Suspense>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}