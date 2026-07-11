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

    // Check existing table structure
    if (action === "inspect" && drizzle) {
      const { sql } = await import("drizzle-orm");
      const cols = await drizzle.execute(sql`SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name = 'pages_blocks_hero' ORDER BY ordinal_position`);
      const arrayTableCols = await drizzle.execute(sql`SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name = 'pages_blocks_steps_steps' ORDER BY ordinal_position`).catch(() => []);
      return NextResponse.json({ hero_block_cols: cols.rows || cols, steps_array_cols: (arrayTableCols as { rows?: unknown[] }).rows || arrayTableCols });
    }

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

      // Drop incorrectly typed tables first
      try {
        await drizzle.execute(sql.raw(`DROP TABLE IF EXISTS "pages_blocks_hero_carousel_images" CASCADE`));
        await drizzle.execute(sql.raw(`DROP TABLE IF EXISTS "_pages_v_blocks_hero_carousel_images" CASCADE`));
        await drizzle.execute(sql.raw(`DROP TABLE IF EXISTS "pages_blocks_gallery_section_photos" CASCADE`));
        await drizzle.execute(sql.raw(`DROP TABLE IF EXISTS "_pages_v_blocks_gallery_section_photos" CASCADE`));
      } catch { /* ignore */ }

      // Hero carousel images - id and _parent_id must be varchar to match Payload's schema
      const heroCarouselCols = `"_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(), "image_id" integer, "alt" varchar, "_uuid" varchar`;
      await createTable("pages_blocks_hero_carousel_images", heroCarouselCols);
      await createTable("_pages_v_blocks_hero_carousel_images", heroCarouselCols);

      // Gallery section photos
      const galleryPhotosCols = `"_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY DEFAULT gen_random_uuid(), "image_id" integer, "caption" varchar, "_uuid" varchar`;
      await createTable("pages_blocks_gallery_section_photos", galleryPhotosCols);
      await createTable("_pages_v_blocks_gallery_section_photos", galleryPhotosCols);

      return NextResponse.json({ success: true, created });
    }

    // Default: test pages collection
    try {
      const r = await payload.find({ collection: "pages" as never, limit: 0 });
      return NextResponse.json({ pages: `OK (${r.totalDocs} docs)` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cause = (e as any)?.cause?.message || (e as any)?.detail || "";
      return NextResponse.json({ pages: `ERROR: ${msg.slice(0, 200)}`, detail: `${cause}`.slice(0, 200) });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
