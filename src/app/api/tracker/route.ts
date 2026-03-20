import { NextRequest } from "next/server";

export async function GET() {
  return Response.json({ listings: [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { listingId, priceAtSave } = body as {
    listingId: string;
    priceAtSave: number;
  };

  if (!listingId || priceAtSave === undefined) {
    return Response.json(
      { error: "listingId and priceAtSave are required" },
      { status: 400 },
    );
  }

  const mockSaved = {
    id: `saved-${Date.now()}`,
    listingId,
    status: "watching",
    notes: "",
    tags: [],
    priceAtSave,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return Response.json(mockSaved, { status: 201 });
}
