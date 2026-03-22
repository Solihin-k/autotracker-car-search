import type { DealLabel } from "@/lib/types";

interface DealScoreProps {
  score: number;
  label: DealLabel;
}

const LABEL_STYLES: Record<DealLabel, string> = {
  great: "bg-green-100 text-green-800",
  good: "bg-blue-100 text-blue-800",
  fair: "bg-yellow-100 text-yellow-800",
  overpriced: "bg-orange-100 text-orange-800",
  red_flag: "bg-red-100 text-red-800",
};

const LABEL_TEXT: Record<DealLabel, string> = {
  great: "Great Deal",
  good: "Good Deal",
  fair: "Fair",
  overpriced: "Overpriced",
  red_flag: "Red Flag",
};

export function DealScore({ score, label }: DealScoreProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
        <span className="text-lg font-bold">{score}</span>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${LABEL_STYLES[label]}`}
      >
        {LABEL_TEXT[label]}
      </span>
    </div>
  );
}
