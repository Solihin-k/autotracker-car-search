"use client";

export function SearchForm() {
  return (
    <form className="rounded-lg border border-gray-200 bg-white p-6">
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
        type="submit"
        className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white opacity-50"
      >
        Search
      </button>
    </form>
  );
}
