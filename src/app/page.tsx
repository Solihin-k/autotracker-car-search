export default function SearchPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Used Cars</h1>

      {/* Search form placeholder */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <select
              disabled
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500"
            >
              <option>Select make...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <select
              disabled
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500"
            >
              <option>Select model...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Range
            </label>
            <div className="flex gap-2">
              <input
                disabled
                type="number"
                placeholder="Min"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                disabled
                type="number"
                placeholder="Max"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (SGD)
            </label>
            <div className="flex gap-2">
              <input
                disabled
                type="number"
                placeholder="Min"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                disabled
                type="number"
                placeholder="Max"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
        <button
          disabled
          className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white opacity-50"
        >
          Search
        </button>
      </div>

      {/* Sample result card */}
      <h2 className="text-lg font-semibold mb-4 text-gray-500">
        Results will appear here
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
          <div className="aspect-video w-full rounded bg-gray-200 mb-3" />
          <p className="font-medium text-gray-400">Sample Listing</p>
          <p className="text-sm text-gray-400">$XX,XXX &middot; XX,XXXkm</p>
          <p className="text-xs text-gray-400 mt-1">
            $X,XXX/yr depreciation
          </p>
        </div>
      </div>
    </div>
  );
}
