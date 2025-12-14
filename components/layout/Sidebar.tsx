"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ViewType = "overview" | "crowd-entries";

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    // Clear any auth state if needed
    router.push("/login");
  };

  return (
    <>
      {/* Floating toggle button when collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed left-4 top-16 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-b from-[#1f2a2a] via-[#0f4f4a] to-[#0b3f3a] text-white shadow-lg hover:opacity-80 transition-opacity"
          aria-label="Open sidebar"
        >
          <span className="text-xl">☰</span>
        </button>
      )}

      <div 
        className={`flex h-screen flex-col justify-between bg-linear-to-b from-[#1f2a2a] via-[#0f4f4a] to-[#0b3f3a] text-white transition-all duration-300 ease-in-out ${
          isCollapsed ? "-translate-x-full w-0" : "w-64"
        }`}
      >
        
        {/* Top Section */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className={`flex items-center gap-2 ${isCollapsed ? "opacity-0" : "opacity-100"} transition-opacity`}>
              <Image src="/kloudspot-logo.png" alt="Kloudspot" width={120} height={40} className="object-contain" />
            </div>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-xl hover:opacity-80 transition-opacity"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
          </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2 px-3">
          
          {/* Overview */}
          <button 
            onClick={() => onViewChange("overview")}
            className={`relative flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm transition ${
              activeView === "overview"
                ? "bg-white/20 font-medium"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            {activeView === "overview" && (
              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-white" />
            )}
            <Image src="/home.png" alt="Home" width={20} height={20} />
            <span className={isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}>{isCollapsed ? "" : "Overview"}</span>
          </button>

          {/* Crowd Entries */}
          <button 
            onClick={() => onViewChange("crowd-entries")}
            className={`relative flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm transition ${
              activeView === "crowd-entries"
                ? "bg-white/20 font-medium"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            {activeView === "crowd-entries" && (
              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-white" />
            )}
            <Image src="/arrow.png" alt="Arrow" width={20} height={20} />
            <span className={isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}>{isCollapsed ? "" : "Crowd Entries"}</span>
          </button>

        </nav>
      </div>

      {/* Logout */}
      <div className={`px-5 py-4 ${isCollapsed ? "opacity-0" : "opacity-100"} transition-opacity`}>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition"
        >
          <span className="text-lg">⏻</span>
          <span className={isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}>{isCollapsed ? "" : "Logout"}</span>
        </button>
      </div>
    </div>
    </>
  );
}

