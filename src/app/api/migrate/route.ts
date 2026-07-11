import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== "gigi-migrate-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const action = req.nextUrl.searchParams.get("action");

  try {
    const payload = await getPayload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = payload.db as any;
    const drizzle = db.drizzle;

    if (action === "create-tables" && drizzle) {
      const { sql } = await import("drizzle-orm");
      const created: string[] = [];

      async function createTable(name: string, cols: string) {
        try {
          await drizzle.execute(sql.raw(`CREATE TABLE IF NOT EXISTS "${name}" (${cols})`));
          created.push(name);
        } catch (e) {
          created.push(`FAILED:${name}:${String(e).slice(0, 80)}`);
        }
      }

      // Hero carousel images (pages + versions)
      const heroCarouselCols = `"_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY, "image_id" integer, "alt" varchar, "block_name" varchar, "_uuid" varchar`;
      await createTable("pages_blocks_hero_carousel_images", heroCarouselCols);
      await createTable("_pages_v_blocks_hero_carousel_images", heroCarouselCols);

      // Gallery section photos (pages + versions)
      const galleryPhotosCols = `"_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY, "image_id" integer, "caption" varchar, "block_name" varchar, "_uuid" varchar`;
      await createTable("pages_blocks_gallery_section_photos", galleryPhotosCols);
      await createTable("_pages_v_blocks_gallery_section_photos", galleryPhotosCols);

      return NextResponse.json({ success: true, created });
    }

    // Default: test pages collection
    try {
      const r = await payload.find({ collection: "pages" as never, limit: 0 });
      return NextResponse.json({ pages: `OK (${r.totalDocs} docs)` });
    } catch (e) {
      return NextResponse.json({ pages: `ERROR: ${String(e).slice(0, 200)}` });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
