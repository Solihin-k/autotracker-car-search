export default function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Listing Detail</h1>
      <p className="text-sm text-gray-500 mb-6">ID: {params.id}</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Image gallery placeholder */}
        <div>
          <div className="aspect-video w-full rounded-lg bg-gray-200 mb-3" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Details placeholder */}
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="font-semibold mb-2">Vehicle Details</h2>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-gray-500">Make</dt>
              <dd className="text-gray-400">—</dd>
              <dt className="text-gray-500">Model</dt>
              <dd className="text-gray-400">—</dd>
              <dt className="text-gray-500">Year</dt>
              <dd className="text-gray-400">—</dd>
              <dt className="text-gray-500">Mileage</dt>
              <dd className="text-gray-400">—</dd>
              <dt className="text-gray-500">Price</dt>
              <dd className="text-gray-400">$—</dd>
            </dl>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="font-semibold mb-2">Deal Analysis</h2>
            <p className="text-sm text-gray-400">
              Analysis will be computed when data is available.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="font-semibold mb-2">COE &amp; Depreciation</h2>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-gray-500">COE Expiry</dt>
              <dd className="text-gray-400">—</dd>
              <dt className="text-gray-500">Paper Value</dt>
              <dd className="text-gray-400">$—</dd>
              <dt className="text-gray-500">Annual Depreciation</dt>
              <dd className="text-gray-400">$—/yr</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
