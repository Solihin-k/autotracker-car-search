import type { Listing } from "@/lib/types";

interface ResultCardProps {
  listing: Listing;
}

export function ResultCard({ listing }: ResultCardProps) {
  const depreciationText = listing.annualDepreciation
    ? `$${listing.annualDepreciation.toLocaleString()}/yr`
    : "—";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
      <div className="aspect-video w-full rounded bg-gray-200 mb-3 flex items-center justify-center">
        <span className="text-xs text-gray-400">
          {listing.imageCount > 0
            ? `${listing.imageCount} photos`
            : "No photos"}
        </span>
      </div>
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-medium text-sm">
          {listing.year} {listing.make} {listing.model}
        </h3>
        <span className="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-500">
          {listing.source}
        </span>
      </div>
      <p className="text-lg font-bold text-gray-900">
        ${listing.price.toLocaleString()}
      </p>
      <div className="mt-1 flex gap-3 text-xs text-gray-500">
        {listing.mileage !== undefined && (
          <span>{listing.mileage.toLocaleString()} km</span>
        )}
        {listing.coeMonthsLeft !== undefined && (
          <span>{listing.coeMonthsLeft} mths COE</span>
        )}
      </div>
      <p className="mt-1 text-xs text-blue-600 font-medium">
        {depreciationText} depreciation
      </p>
    </div>
  );
}
