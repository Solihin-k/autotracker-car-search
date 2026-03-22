interface DepreciationBreakdownProps {
  price: number;
  parfRebate: number;
  coeRebate: number;
  paperValue: number;
  annualDepreciation: number;
  coeMonthsLeft: number;
}

function formatSgd(amount: number) {
  return `$${amount.toLocaleString()}`;
}

export function DepreciationBreakdown({
  price,
  parfRebate,
  coeRebate,
  paperValue,
  annualDepreciation,
  coeMonthsLeft,
}: DepreciationBreakdownProps) {
  const rows = [
    { label: "Asking Price", value: formatSgd(price) },
    { label: "PARF Rebate", value: formatSgd(parfRebate) },
    { label: "COE Rebate", value: formatSgd(coeRebate) },
    {
      label: "Paper Value",
      value: formatSgd(paperValue),
      highlight: true,
    },
    {
      label: "Annual Depreciation",
      value: `${formatSgd(annualDepreciation)}/yr`,
      highlight: true,
    },
    {
      label: "COE Remaining",
      value: `${coeMonthsLeft} months`,
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="font-semibold mb-3 text-sm">
        Depreciation Breakdown
      </h3>
      <dl className="space-y-2">
        {rows.map(({ label, value, highlight }) => (
          <div key={label} className="flex justify-between text-sm">
            <dt className="text-gray-500">{label}</dt>
            <dd
              className={
                highlight ? "font-semibold text-gray-900" : "text-gray-700"
              }
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
