import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export async function POST(request: NextRequest) {
  const { secret } = await request.json();

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload();
  const results: string[] = [];

  // Create admin user
  try {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: "admin@gigisconcept.com" } },
      limit: 1,
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@gigisconcept.com",
          password: "admin123",
          name: "Gigi",
          role: "admin",
        },
      });
      results.push("Admin user created");
    } else {
      results.push("Admin user already exists");
    }
  } catch (e: unknown) {
    results.push(`Admin error: ${e instanceof Error ? e.message : e}`);
  }

  // Create testimonial
  try {
    const existing = await payload.find({ collection: "testimonials", limit: 1 });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "testimonials",
        data: {
          quote: "My mom started crying! She loves it so much — thank you so much. You are amazing at what you do.",
          authorName: "Latoya E.",
          eventDescription: "60th Birthday Celebration",
          featured: true,
          sortOrder: 1,
        },
      });
      results.push("Testimonial created");
    } else {
      results.push("Testimonial already exists");
    }
  } catch (e: unknown) {
    results.push(`Testimonial error: ${e instanceof Error ? e.message : e}`);
  }

  // Update site settings
  try {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        siteName: "Gigi's Concept",
        tagline: "Content Creation & Luxury Photo Booth",
        contactEmail: "hello@gigisconcept.com",
        instagramUrl: "https://instagram.com",
        facebookUrl: "https://facebook.com",
        tiktokUrl: "https://tiktok.com",
        boothRatePerHour: 150,
        basicRatePerHour: 50,
        storytellerPrice: 450,
        shortEditPrice: 30,
        longEditPrice: 40,
        primaryColor: "#3A2D28",
        accentColor: "#76220B",
        backgroundColor: "#F8F5F1",
        defaultMetaTitle: "Gigi's Concept | Content Creation & Luxury Photo Booth — Dallas TX",
        defaultMetaDescription: "Editorial content and a timeless photo-booth experience in Dallas, Texas. Quietly crafted, beautifully delivered.",
      },
    });
    results.push("Site settings updated");
  } catch (e: unknown) {
    results.push(`Settings error: ${e instanceof Error ? e.message : e}`);
  }

  return NextResponse.json({ results });
}
