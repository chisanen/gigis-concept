import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

// Temporary migration endpoint. Adds columns for the gallery show/hide toggles
// and the per-photo hidden flag. Safe to run multiple times (IF NOT EXISTS).
// Remove this route after running it once in production.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const statements = [
    `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS show_home_gallery boolean DEFAULT true;`,
    `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS show_gallery_page boolean DEFAULT true;`,
    `ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS hidden boolean DEFAULT false;`,
  ];

  try {
    const payload = await getPayload();
    const pool = (payload.db as unknown as { pool: { query: (sql: string) => Promise<unknown> } }).pool;
    for (const sql of statements) {
      await pool.query(sql);
    }
    return NextResponse.json({ ok: true, ran: statements });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
