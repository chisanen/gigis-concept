import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== "gigi-migrate-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload();
    const results: string[] = [];

    // Check if gallery already has images
    const existing = await payload.find({ collection: "gallery-images", limit: 0 });
    if (existing.totalDocs > 0) {
      return NextResponse.json({ message: `Gallery already has ${existing.totalDocs} images. Skipping seed.` });
    }

    const collections = [
      {
        name: "Portfolio Highlights",
        category: "public",
        images: [
          { mediaId: 43, title: "Elegant wedding on the steps", sortOrder: 1 },
          { mediaId: 44, title: "Champagne tower at reception", sortOrder: 2 },
          { mediaId: 45, title: "Traditional attire celebration", sortOrder: 3 },
          { mediaId: 46, title: "Romantic wedding moment", sortOrder: 4 },
        ],
      },
      {
        name: "Wedding Moments",
        category: "public",
        images: [
          { mediaId: 47, title: "Reception celebration", sortOrder: 1 },
          { mediaId: 48, title: "Behind the scenes", sortOrder: 2 },
          { mediaId: 49, title: "Content creation session", sortOrder: 3 },
          { mediaId: 50, title: "Photo booth setup", sortOrder: 4 },
        ],
      },
    ];

    for (const col of collections) {
      for (const img of col.images) {
        try {
          await payload.create({
            collection: "gallery-images",
            data: {
              title: img.title,
              image: img.mediaId,
              collectionName: col.name,
              category: col.category,
              sortOrder: img.sortOrder,
            },
          });
          results.push(`Created: ${col.name} / ${img.title}`);
        } catch (e) {
          results.push(`Failed: ${col.name} / ${img.title}: ${String(e).slice(0, 80)}`);
        }
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
