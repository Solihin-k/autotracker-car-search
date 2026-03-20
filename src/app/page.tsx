import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-2">AutoTracker SG</h1>
      <p className="text-lg text-gray-600 mb-8">
        Used car search across sgCarMart &amp; Carro
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </Link>
        <Link
          href="/tracker"
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Tracker
        </Link>
        <Link
          href="/compare"
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}
