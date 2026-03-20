import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const size = request.nextUrl.searchParams.get("size") ?? "thumb";

  if (!url) {
    return Response.json(
      { error: "url parameter is required" },
      { status: 400 },
    );
  }

  if (size !== "thumb" && size !== "full") {
    return Response.json(
      { error: "size must be 'thumb' or 'full'" },
      { status: 400 },
    );
  }

  // Stub: return a placeholder SVG
  const width = size === "thumb" ? 400 : 1200;
  const height = size === "thumb" ? 300 : 900;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="#e5e7eb"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-size="16">
      Image Placeholder (${size})
    </text>
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
