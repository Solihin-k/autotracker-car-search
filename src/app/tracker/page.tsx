const STATUSES = [
  { key: "watching", label: "Watching", color: "bg-blue-50 text-blue-700" },
  { key: "contacted", label: "Contacted", color: "bg-yellow-50 text-yellow-700" },
  { key: "viewing", label: "Viewing", color: "bg-purple-50 text-purple-700" },
  { key: "negotiating", label: "Negotiating", color: "bg-orange-50 text-orange-700" },
  { key: "passed", label: "Passed", color: "bg-gray-50 text-gray-500" },
  { key: "bought", label: "Bought", color: "bg-green-50 text-green-700" },
] as const;

export default function TrackerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Listing Tracker</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {STATUSES.map(({ key, label, color }) => (
          <div key={key} className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
              >
                {label}
              </span>
              <span className="text-xs text-gray-400">0</span>
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-xs text-gray-400">No listings</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
