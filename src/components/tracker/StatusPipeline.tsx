"use client";

import type { TrackerStatus } from "@/lib/types";

interface StatusPipelineProps {
  currentStatus: TrackerStatus;
  onStatusChange?: (status: TrackerStatus) => void;
}

const STATUSES: { value: TrackerStatus; label: string }[] = [
  { value: "watching", label: "Watching" },
  { value: "contacted", label: "Contacted" },
  { value: "viewing", label: "Viewing" },
  { value: "negotiating", label: "Negotiating" },
  { value: "passed", label: "Passed" },
  { value: "bought", label: "Bought" },
];

export function StatusPipeline({
  currentStatus,
  onStatusChange,
}: StatusPipelineProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onStatusChange?.(value)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            currentStatus === value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
