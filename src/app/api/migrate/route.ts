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
      const results: string[] = [];

      // Get list of existing tables
      const existing = await drizzle.execute(sql`
        SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
      `);
      const existingNames = new Set((existing.rows || existing).map((r: Record<string, string>) => r.table_name));

      // Create missing tables for new block types
      const blockTables = [
        { name: "pages_blocks_service_detail", parent: "pages" },
        { name: "pages_blocks_service_detail_included_items", parent: "pages" },
        { name: "pages_blocks_values_grid", parent: "pages" },
        { name: "pages_blocks_values_grid_values", parent: "pages" },
        { name: "pages_blocks_fomo_strip", parent: "pages" },
        { name: "pages_blocks_review_form", parent: "pages" },
        { name: "_pages_v_blocks_service_detail", parent: "_pages_v" },
        { name: "_pages_v_blocks_service_detail_included_items", parent: "_pages_v" },
        { name: "_pages_v_blocks_values_grid", parent: "_pages_v" },
        { name: "_pages_v_blocks_values_grid_values", parent: "_pages_v" },
        { name: "_pages_v_blocks_fomo_strip", parent: "_pages_v" },
        { name: "_pages_v_blocks_review_form", parent: "_pages_v" },
      ];

      for (const bt of blockTables) {
        if (!existingNames.has(bt.name)) {
          results.push(`Missing: ${bt.name}`);
        } else {
          results.push(`Exists: ${bt.name}`);
        }
      }

      return NextResponse.json({ results, existingTables: Array.from(existingNames).sort() });
    }

    // Default: test all collections
    const collections = [
      "pages", "blog-posts", "media", "gallery-images", "testimonials",
      "popups", "discount-codes", "leads", "bookings", "inquiries",
      "packages", "add-ons", "quotes", "contracts", "invoices", "tasks",
      "customers", "consultations", "team", "equipment", "email-templates",
      "automations", "broadcasts", "contract-templates", "questionnaires",
      "questionnaire-responses", "activity-log", "users",
    ];

    const results: Record<string, string> = {};
    for (const slug of collections) {
      try {
        const r = await payload.find({ collection: slug as never, limit: 0 });
        results[slug] = `OK (${r.totalDocs} docs)`;
      } catch (e) {
        results[slug] = `ERROR: ${String(e).slice(0, 120)}`;
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
