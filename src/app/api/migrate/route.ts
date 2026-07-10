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

  try {
    const payload = await getPayload();

    // Test each collection by trying to count docs
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
        results[slug] = `ERROR: ${String(e).slice(0, 100)}`;
      }
    }

    // Test globals
    for (const slug of ["site-settings", "navigation", "service-area", "availability-rules"]) {
      try {
        await payload.findGlobal({ slug: slug as never });
        results[`global:${slug}`] = "OK";
      } catch (e) {
        results[`global:${slug}`] = `ERROR: ${String(e).slice(0, 100)}`;
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
