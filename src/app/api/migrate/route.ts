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

      // If &create=true, actually create the missing tables
      if (req.nextUrl.searchParams.get("create") === "true") {
        const created: string[] = [];

        async function createBlockTable(name: string, extraCols: string) {
          if (existingNames.has(name)) return;
          await drizzle.execute(sql.raw(`CREATE TABLE IF NOT EXISTS "${name}" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL, "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY, ${extraCols} "_uuid" varchar)`));
          created.push(name);
        }

        async function createArrayTable(name: string, extraCols: string) {
          if (existingNames.has(name)) return;
          await drizzle.execute(sql.raw(`CREATE TABLE IF NOT EXISTS "${name}" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY, ${extraCols} "_uuid" varchar)`));
          created.push(name);
        }

        const sdCols = `"eyebrow" varchar, "title" varchar, "description" varchar, "secondary_description" varchar, "image_id" integer, "layout_direction" varchar DEFAULT 'imageLeft', "included_heading" varchar, "cta1_label" varchar, "cta1_href" varchar, "cta2_label" varchar, "cta2_href" varchar, "is_visible" boolean DEFAULT true,`;
        await createBlockTable("pages_blocks_service_detail", sdCols);
        await createBlockTable("_pages_v_blocks_service_detail", sdCols);

        const itemCols = `"label" varchar, "value" varchar,`;
        await createArrayTable("pages_blocks_service_detail_included_items", itemCols);
        await createArrayTable("_pages_v_blocks_service_detail_included_items", itemCols);

        const vgCols = `"heading" varchar, "is_visible" boolean DEFAULT true,`;
        await createBlockTable("pages_blocks_values_grid", vgCols);
        await createBlockTable("_pages_v_blocks_values_grid", vgCols);

        const valCols = `"title" varchar, "description" varchar,`;
        await createArrayTable("pages_blocks_values_grid_values", valCols);
        await createArrayTable("_pages_v_blocks_values_grid_values", valCols);

        const fsCols = `"text" varchar, "is_visible" boolean DEFAULT true,`;
        await createBlockTable("pages_blocks_fomo_strip", fsCols);
        await createBlockTable("_pages_v_blocks_fomo_strip", fsCols);

        const rfCols = `"eyebrow" varchar, "heading" varchar, "description" varchar, "success_heading" varchar, "success_message" varchar, "is_visible" boolean DEFAULT true,`;
        await createBlockTable("pages_blocks_review_form", rfCols);
        await createBlockTable("_pages_v_blocks_review_form", rfCols);

        results.push(`Created ${created.length} tables: ${created.join(", ")}`);
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
        const errMsg = e instanceof Error ? e.message : String(e);
        // Try to get the Postgres error detail
        const pgErr = (e as Record<string, unknown>)?.cause || (e as Record<string, unknown>)?.detail || "";
        results[slug] = `ERROR: ${errMsg.slice(0, 200)} | ${String(pgErr).slice(0, 200)}`;
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
