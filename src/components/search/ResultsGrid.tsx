import type { Listing } from "@/lib/types";
import { ResultCard } from "./ResultCard";

interface ResultsGridProps {
  listings: Listing[];
  isLoading?: boolean;
}

export function ResultsGrid({ listings, isLoading }: ResultsGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500">Searching...</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-400">No results yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ResultCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
