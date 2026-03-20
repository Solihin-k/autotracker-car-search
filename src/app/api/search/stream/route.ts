import { NextRequest } from "next/server";

const MOCK_LISTING = {
  id: "mock-1",
  sourceId: "12345",
  source: "sgcarmart" as const,
  url: "https://www.sgcarmart.com/used_cars/info.php?ID=12345",
  make: "Toyota",
  model: "Camry",
  year: 2021,
  price: 98000,
  mileage: 35000,
  annualDepreciation: 12500,
  coeMonthsLeft: 72,
  imageCount: 0,
  images: [],
  sellerType: "dealer" as const,
  sellerName: "Sample Dealer",
  fetchedAt: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const make = searchParams.get("make");

  if (!make) {
    return new Response(
      JSON.stringify({ error: "make parameter is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Simulate sgCarMart results
      const sgcarmartEvent = JSON.stringify({
        source: "sgcarmart",
        listings: [{ ...MOCK_LISTING, id: "sgcm-1" }],
      });
      controller.enqueue(
        encoder.encode(`data: ${sgcarmartEvent}\n\n`),
      );

      // Simulate delay between sources
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate Carro results
      const carroEvent = JSON.stringify({
        source: "carro",
        listings: [
          {
            ...MOCK_LISTING,
            id: "carro-1",
            source: "carro",
            sourceId: "c-67890",
            url: "https://carro.co/sg/en/buy-car/sample",
            price: 96000,
          },
        ],
      });
      controller.enqueue(encoder.encode(`data: ${carroEvent}\n\n`));

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
