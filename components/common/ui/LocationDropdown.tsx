"use client";

import Image from "next/image";
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
        className="flex w-full min-w-0 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Image
            src="/location.png"
            alt="Location"
            width={16}
            height={16}
            className="flex-shrink-0"
          />
          <span className="truncate">{selected}</span>
        </div>
        <div className="opacity-60 shrink-0 ml-2">
          <Image src="/down-arrow.png" alt="Dropdown" width={16} height={16} />
        </div>
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
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 truncate ${
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
