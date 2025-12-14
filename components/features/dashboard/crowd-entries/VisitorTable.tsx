"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { getEntryExit } from "@/services/api/analytics.service";
import { EntryExitRequest } from "@/types/contracts";

interface VisitorTableProps {
  siteId?: string;
}

export default function VisitorTable({ siteId }: VisitorTableProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10;

  useEffect(() => {
    if (!siteId) {
      setIsLoading(false);
      return;
    }

    const fetchEntryExitData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate time range: last 24 hours
        const now = new Date();
        const toUtc = now.getTime().toString();
        const fromUtc = (now.getTime() - 24 * 60 * 60 * 1000).toString(); // 24 hours ago

        const request: EntryExitRequest = {
          siteId,
          fromUtc,
          toUtc,
          pageNumber: currentPage,
          pageSize,
        };

        const response = await getEntryExit(request);
        setRecords(response.records);
        setTotalPages(response.totalPages);
        setTotalRecords(response.totalRecords);
      } catch (err) {
        // Handle axios errors
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError<{ message?: string }>;
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to load entry-exit data. Please try again.";
          setError(errorMessage);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntryExitData();
  }, [siteId, currentPage]);

  // Format time from local string (format: "10/12/2025 00:00:00")
  const formatTime = (localTime: string) => {
    if (!localTime) return "--";
    const timeMatch = localTime.match(/(\d{1,2}):(\d{2}):(\d{2})/);
    if (!timeMatch) return localTime;

    const hour = parseInt(timeMatch[1]);
    const minute = timeMatch[2];
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minute} ${ampm}`;
  };

  // Format dwell time from minutes to "HH:MM" format
  const formatDwellTime = (minutes: number) => {
    if (minutes === 0 || !minutes) return "--";
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("…");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("…");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("…");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("…");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-center py-12 text-gray-500">
          Loading entry-exit data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-center py-12 text-red-600 text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 text-left text-gray-600">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Zone</th>
            <th className="px-6 py-4 font-medium">Entry</th>
            <th className="px-6 py-4 font-medium">Exit</th>
            <th className="px-6 py-4 font-medium">Dwell Time</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {records.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                No records found
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.personId} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-800">
                      {record.personName || "--"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {record.zoneName || "--"}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {formatTime(record.entryLocal)}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {record.exitLocal ? formatTime(record.exitLocal) : "--"}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {formatDwellTime(record.dwellMinutes)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-2 text-gray-500 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          {getPageNumbers().map((page, index) => {
            if (page === "…") {
              return (
                <span key={`ellipsis-${index}`} className="px-2">
                  …
                </span>
              );
            }
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page as number)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === page
                    ? "border bg-gray-100 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-2 text-gray-500 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

