"use client";

import { useState } from "react";

interface LocationDropdownProps {
  locations: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function LocationDropdown({
  locations,
  selected,
  onChange,
}: LocationDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-48">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{selected}</span>
        </div>
        <span className="text-gray-500">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-sm">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => {
                onChange(location);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                selected === location ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

