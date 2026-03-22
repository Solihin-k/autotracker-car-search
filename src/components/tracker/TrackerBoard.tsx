import type { SavedListing, TrackerStatus } from "@/lib/types";

interface TrackerBoardProps {
  savedListings: SavedListing[];
}

const COLUMNS: { status: TrackerStatus; label: string; color: string }[] = [
  { status: "watching", label: "Watching", color: "bg-blue-50 text-blue-700" },
  { status: "contacted", label: "Contacted", color: "bg-yellow-50 text-yellow-700" },
  { status: "viewing", label: "Viewing", color: "bg-purple-50 text-purple-700" },
  { status: "negotiating", label: "Negotiating", color: "bg-orange-50 text-orange-700" },
  { status: "passed", label: "Passed", color: "bg-gray-50 text-gray-500" },
  { status: "bought", label: "Bought", color: "bg-green-50 text-green-700" },
];

export function TrackerBoard({ savedListings }: TrackerBoardProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {COLUMNS.map(({ status, label, color }) => {
        const items = savedListings.filter((sl) => sl.status === status);
        return (
          <div
            key={status}
            className="rounded-lg border border-gray-200 bg-white p-3"
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
              >
                {label}
              </span>
              <span className="text-xs text-gray-400">{items.length}</span>
            </div>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-xs text-gray-400">No listings</p>
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded border border-gray-100 bg-gray-50 p-2 text-xs"
                  >
                    <p className="font-medium text-gray-700">
                      {item.listingId}
                    </p>
                    <p className="text-gray-400">
                      ${item.priceAtSave.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
