"use client";

import { useState } from "react";
import LocationDropdown from "../ui/LocationDropdown";

export default function Topbar() {
  const [selectedLocation, setSelectedLocation] = useState("Avenue Mall");

  return (
    <header className="flex h-14 w-full items-center gap-4 border-b border-gray-200 bg-white px-6">
      {/* Title */}
      <h1 className="text-sm font-medium text-gray-800">
        Crowd Solutions
      </h1>

      <span className="text-gray-300">|</span>

      {/* Dropdown */}
      <LocationDropdown
        locations={["Avenue Mall", "City Center", "Downtown Plaza"]}
        selected={selectedLocation}
        onChange={setSelectedLocation}
      />
    </header>
  );
}

