import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const mockAnalysis = {
    listingId: params.id,
    dealScore: 72,
    dealLabel: "good",
    annualDepreciation: 9350,
    paperValue: 51250,
    parfRebate: 18750,
    coeRebate: 32500,
    notes: [
      "Below average depreciation for this model/year",
      "Single owner vehicle",
      "PARF eligible — rebate recoverable at deregistration",
    ],
    flags: [],
    comparisonToMarket: {
      medianPrice: 102000,
      percentile: 35,
      sampleSize: 12,
    },
  };

  return Response.json(mockAnalysis);
}
