export default function ComparePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Compare Listings</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8"
          >
            <div className="mb-2 text-3xl text-gray-300">+</div>
            <p className="text-sm text-gray-400">
              {i === 0 ? "Add a listing to compare" : `Slot ${i + 1}`}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="font-semibold mb-4">Comparison Table</h2>
        <p className="text-sm text-gray-400">
          Add listings above to see a side-by-side comparison of price,
          depreciation, COE, mileage, and more.
        </p>
      </div>
    </div>
  );
}
