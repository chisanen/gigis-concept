import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.PAYLOAD_SECRET || "default-secret-change-me";

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const action = req.nextUrl.searchParams.get("action");

  try {
    const payload = await getPayload();

    // Action: create-popups - manually create the popups table
    if (action === "create-popups") {
      const db = payload.db as Record<string, unknown>;
      const pool = (db.pool || db.client) as { query: (sql: string) => Promise<unknown> } | undefined;
      const drizzle = db.drizzle as { execute: (sql: unknown) => Promise<unknown> } | undefined;

      // Try using the Drizzle SQL executor
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
