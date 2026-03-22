"use client";

import type { Listing } from "@/lib/types";

interface SwipeTriageProps {
  listings: Listing[];
  onShortlist?: (listing: Listing) => void;
  onDismiss?: (listing: Listing) => void;
}

export function SwipeTriage({
  listings,
  onShortlist: _onShortlist,
  onDismiss: _onDismiss,
}: SwipeTriageProps) {
  if (listings.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-400">No listings to triage</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-sm">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="aspect-video w-full rounded bg-gray-200 mb-4" />
        <p className="font-medium text-sm text-gray-400">
          Swipe triage — coming soon
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Swipe right to shortlist, left to dismiss
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {listings.length} listings queued
        </p>
      </div>
    </div>
  );
}
