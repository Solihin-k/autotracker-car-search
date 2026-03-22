import type { Listing } from "@/lib/types";

interface CompareTableProps {
  listings: Listing[];
}

const FIELDS: { key: keyof Listing; label: string; format?: (v: unknown) => string }[] = [
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "year", label: "Year" },
  {
    key: "price",
    label: "Price",
    format: (v) => `$${(v as number).toLocaleString()}`,
  },
  {
    key: "annualDepreciation",
    label: "Depreciation",
    format: (v) => (v ? `$${(v as number).toLocaleString()}/yr` : "—"),
  },
  {
    key: "mileage",
    label: "Mileage",
    format: (v) => (v ? `${(v as number).toLocaleString()} km` : "—"),
  },
  {
    key: "coeMonthsLeft",
    label: "COE Left",
    format: (v) => (v ? `${v} months` : "—"),
  },
  { key: "numOwners", label: "Owners" },
  { key: "source", label: "Source" },
];

export function CompareTable({ listings }: CompareTableProps) {
  if (listings.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        Add listings to compare them side-by-side.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 pr-4 text-left text-gray-500 font-medium">
              Field
            </th>
            {listings.map((l) => (
              <th
                key={l.id}
                className="py-2 px-4 text-left font-medium"
              >
                {l.year} {l.make} {l.model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FIELDS.map(({ key, label, format }) => (
            <tr key={key} className="border-b border-gray-100">
              <td className="py-2 pr-4 text-gray-500">{label}</td>
              {listings.map((l) => {
                const raw = l[key];
                const display = format
                  ? format(raw)
                  : (raw?.toString() ?? "—");
                return (
                  <td key={l.id} className="py-2 px-4">
                    {display}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
