"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any auth state if needed
    router.push("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-gradient-to-b from-[#1f2a2a] via-[#0f4f4a] to-[#0b3f3a] text-white">
      
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">kloudspot</span>
          </div>
          <button className="text-xl">☰</button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2 px-3">
          
          {/* Overview */}
          <button className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm text-gray-200 hover:bg-white/10 transition">
            <span className="text-lg">🏠</span>
            <span>Overview</span>
          </button>

          {/* Crowd Entries - Active */}
          <button className="relative flex w-full items-center gap-3 rounded-md bg-white/20 px-4 py-3 text-sm font-medium">
            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-white" />
            <span className="text-lg">↗</span>
            <span>Crowd Entries</span>
          </button>

        </nav>
      </div>

      {/* Logout */}
      <div className="px-5 py-4">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition"
        >
          <span className="text-lg">⏻</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

