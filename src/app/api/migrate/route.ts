import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");
  const token = req.nextUrl.searchParams.get("token");

  // One-time migration token - will be removed after popups table is created
  if (token !== "gigi-migrate-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload();

    // Action: check-table - see if a table exists and what columns it has
    if (action === "check-table") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = payload.db as any;
      const drizzle = db.drizzle;
      if (drizzle) {
        const { sql } = await import("drizzle-orm");
        const tables = await drizzle.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`);
        const popupCols = await drizzle.execute(sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'popups' ORDER BY ordinal_position`).catch(() => []);
        return NextResponse.json({
          allTables: tables.map((r: Record<string, string>) => r.table_name),
          popupColumns: popupCols,
        });
      }
    }

    // Action: force-create - use Payload's db.push to sync schema
    if (action === "force-create") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = payload.db as any;
      try {
        await db.push({ acceptWarnings: true, forceAcceptWarning: true });
        return NextResponse.json({ success: true, message: "DB push completed" });
      } catch (e) {
        // Try without args
        try {
          await db.push();
          return NextResponse.json({ success: true, message: "DB push completed (no args)" });
        } catch (e2) {
          return NextResponse.json({ error: `Push failed: ${String(e)} / ${String(e2)}` }, { status: 500 });
        }
      }
    }

    // Action: drop-popups - drop the bad table so push:true can recreate it
    if (action === "drop-popups") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = payload.db as any;
      const drizzle = db.drizzle;
      if (drizzle && typeof drizzle.execute === "function") {
        const { sql } = await import("drizzle-orm");
        await drizzle.execute(sql`DROP TABLE IF EXISTS "popups" CASCADE`);
        return NextResponse.json({ success: true, message: "Popups table dropped. Payload push:true should recreate it on next request." });
      }
      return NextResponse.json({ error: "Cannot access database" }, { status: 500 });
    }

    // Action: create-popups - manually create the popups table
    if (action === "create-popups") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = payload.db as any;
      const drizzle = db.drizzle;

      if (drizzle && typeof drizzle.execute === "function") {
        const { sql } = await import("drizzle-orm");
        await drizzle.execute(sql`
          CREATE TABLE IF NOT EXISTS "popups" (
            "id" serial PRIMARY KEY,
            "name" varchar NOT NULL,
            "heading" varchar,
            "body" varchar,
            "image_id" integer,
            "offer_label" varchar,
            "discount_code" varchar,
            "cta_label" varchar,
            "cta_href" varchar,
            "trigger" varchar DEFAULT 'delay',
            "delay_seconds" numeric DEFAULT 5,
            "frequency" varchar DEFAULT 'session',
            "is_active" boolean DEFAULT false,
            "starts_at" timestamptz,
            "ends_at" timestamptz,
            "updated_at" timestamptz DEFAULT now() NOT NULL,
            "created_at" timestamptz DEFAULT now() NOT NULL
          )
        `);
        return NextResponse.json({ success: true, message: "Popups table created" });
      }

      return NextResponse.json({ error: "Cannot access database directly" }, { status: 500 });
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

    for (const slug of ["site-settings", "navigation", "service-area", "availability-rules"]) {
      try {
        await payload.findGlobal({ slug: slug as never });
        results[`global:${slug}`] = "OK";
      } catch (e) {
        results[`global:${slug}`] = `ERROR: ${String(e).slice(0, 120)}`;
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
