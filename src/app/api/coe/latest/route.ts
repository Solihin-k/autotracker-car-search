export async function GET() {
  const mockPremiums = {
    fetchedAt: new Date().toISOString(),
    biddingRound: "2026-03 (2nd)",
    categories: {
      A: { premium: 96000, description: "Cat A (≤1600cc, ≤97kW)" },
      B: { premium: 120000, description: "Cat B (>1600cc or >97kW)" },
      C: { premium: 72000, description: "Cat C (Goods vehicles)" },
      E: { premium: 125000, description: "Cat E (Open)" },
    },
  };

  return Response.json(mockPremiums);
}
