import type { DealLabel, Listing } from "@/lib/types";

export interface ScoringResult {
  score: number;
  label: DealLabel;
  notes: string[];
  flags: string[];
}

function getLabel(score: number): DealLabel {
  if (score >= 80) return "great";
  if (score >= 65) return "good";
  if (score >= 45) return "fair";
  if (score >= 25) return "overpriced";
  return "red_flag";
}

/**
 * Score a listing on a 0–100 scale based on SG market factors.
 *
 * Weights:
 *   - Annual depreciation vs class avg: 30%
 *   - Price vs similar listings: 20%
 *   - COE remaining: 15%
 *   - Mileage for age: 15%
 *   - Number of owners: 10%
 *   - PARF vs COE car: 10%
 */
export function scoreListing(
  _listing: Listing,
  _comparables: Listing[] = [],
): ScoringResult {
  // TODO: Implement real scoring based on comparables
  const score = 50;
  return {
    score,
    label: getLabel(score),
    notes: ["Scoring not yet implemented — using default score"],
    flags: [],
  };
}
