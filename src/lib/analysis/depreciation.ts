/**
 * PARF rebate percentage tiers based on vehicle age at deregistration.
 * Applies only to vehicles on original COE (< 10 years old).
 */
const PARF_TIERS: { maxYears: number; percentage: number }[] = [
  { maxYears: 5, percentage: 0.75 },
  { maxYears: 6, percentage: 0.7 },
  { maxYears: 7, percentage: 0.65 },
  { maxYears: 8, percentage: 0.6 },
  { maxYears: 9, percentage: 0.55 },
  { maxYears: 10, percentage: 0.5 },
];

/** Maximum PARF rebate for cars registered after Feb 2023. */
const PARF_CAP = 60000;

export interface DepreciationResult {
  annualDepreciation: number;
  paperValue: number;
  parfRebate: number;
  coeRebate: number;
}

export interface DepreciationInput {
  price: number;
  arf: number;
  coePremium: number;
  coeMonthsLeft: number;
  vehicleAgeYears: number;
  parfEligible: boolean;
  registeredAfterFeb2023?: boolean;
}

export function getParfPercentage(vehicleAgeYears: number): number {
  for (const tier of PARF_TIERS) {
    if (vehicleAgeYears <= tier.maxYears) {
      return tier.percentage;
    }
  }
  return 0;
}

export function calculateDepreciation(
  input: DepreciationInput,
): DepreciationResult {
  // PARF rebate
  let parfRebate = 0;
  if (input.parfEligible) {
    const percentage = getParfPercentage(input.vehicleAgeYears);
    parfRebate = percentage * input.arf;
    if (input.registeredAfterFeb2023) {
      parfRebate = Math.min(parfRebate, PARF_CAP);
    }
  }

  // COE rebate = (months remaining / 120) * original COE premium
  const coeRebate = (input.coeMonthsLeft / 120) * input.coePremium;

  // Paper value
  const paperValue = parfRebate + coeRebate;

  // Annual depreciation
  const coeYearsLeft = input.coeMonthsLeft / 12;
  const annualDepreciation =
    coeYearsLeft > 0 ? (input.price - paperValue) / coeYearsLeft : 0;

  return {
    annualDepreciation: Math.round(annualDepreciation),
    paperValue: Math.round(paperValue),
    parfRebate: Math.round(parfRebate),
    coeRebate: Math.round(coeRebate),
  };
}
