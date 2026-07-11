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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = payload.db as any;
    const drizzle = db.drizzle;

    if (req.nextUrl.searchParams.get("action") === "fix-columns" && drizzle) {
      const { sql } = await import("drizzle-orm");
      const results: string[] = [];

      // Add missing columns to version tables
      const alterations = [
        // Hero block version table - slide columns
        `ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "slide2_id" integer`,
        `ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "slide3_id" integer`,
        `ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "slide4_id" integer`,
        `ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "slide5_id" integer`,
        // Hero block main table too (in case push:true missed it)
        `ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "slide2_id" integer`,
        `ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "slide3_id" integer`,
        `ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "slide4_id" integer`,
        `ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "slide5_id" integer`,
        // Gallery section version table - photo columns
        `ALTER TABLE "_pages_v_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo1_id" integer`,
        `ALTER TABLE "_pages_v_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo2_id" integer`,
        `ALTER TABLE "_pages_v_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo3_id" integer`,
        `ALTER TABLE "_pages_v_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo4_id" integer`,
        `ALTER TABLE "_pages_v_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo5_id" integer`,
        `ALTER TABLE "_pages_v_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo6_id" integer`,
        `ALTER TABLE "_pages_v_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo7_id" integer`,
        `ALTER TABLE "_pages_v_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo8_id" integer`,
        // Gallery section main table too
        `ALTER TABLE "pages_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo1_id" integer`,
        `ALTER TABLE "pages_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo2_id" integer`,
        `ALTER TABLE "pages_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo3_id" integer`,
        `ALTER TABLE "pages_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo4_id" integer`,
        `ALTER TABLE "pages_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo5_id" integer`,
        `ALTER TABLE "pages_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo6_id" integer`,
        `ALTER TABLE "pages_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo7_id" integer`,
        `ALTER TABLE "pages_blocks_gallery_section" ADD COLUMN IF NOT EXISTS "photo8_id" integer`,
      ];

      for (const alter of alterations) {
        try {
          await drizzle.execute(sql.raw(alter));
          results.push(`OK: ${alter.split("ADD COLUMN")[1]?.trim() || alter}`);
        } catch (e) {
          results.push(`FAIL: ${String(e).slice(0, 80)}`);
        }
      }

      return NextResponse.json({ success: true, results });
    }

    // Default: test pages
    try {
      const r = await payload.find({ collection: "pages" as never, limit: 0 });
      return NextResponse.json({ pages: `OK (${r.totalDocs} docs)` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return NextResponse.json({ pages: `ERROR`, detail: msg.slice(-200) });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
