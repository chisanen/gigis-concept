import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Map of static files to their metadata
const STATIC_IMAGES = [
  { file: "hero-wedding.png", alt: "Elegant bride and groom on wedding steps", kind: "image" },
  { file: "hero-champagne.png", alt: "Luxurious champagne tower at reception", kind: "image" },
  { file: "hero-nigerian.png", alt: "Nigerian Americans in traditional attire at photo booth", kind: "image" },
  { file: "hero-kiss.png", alt: "Bride and groom sharing a romantic kiss", kind: "image" },
  { file: "hero-reception.png", alt: "Opulent wedding reception celebration", kind: "image" },
  { file: "gigi-portrait.png", alt: "Gigi, Founder of Gigi's Concept", kind: "image" },
  { file: "content-creation-bts.png", alt: "Behind the scenes content creation shoot", kind: "image" },
  { file: "photo-booth.png", alt: "Luxury photo booth setup", kind: "image" },
];

// Which images go where on the Home page blocks
const HOME_PAGE_ASSIGNMENTS = {
  hero: {
    backgroundImage: "hero-wedding.png",
    slide2: "hero-champagne.png",
    slide3: "hero-nigerian.png",
    slide4: "hero-kiss.png",
    slide5: "hero-reception.png",
  },
  aboutSplit: {
    image: "gigi-portrait.png",
  },
  twoWays: {
    card1Image: "content-creation-bts.png",
    card2Image: "photo-booth.png",
  },
};

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== "gigi-migrate-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload();
    const results: string[] = [];

    // Step 1: Upload each static image to Media collection
    const mediaMap: Record<string, number> = {};

    for (const img of STATIC_IMAGES) {
      // Check if already uploaded (by alt text)
      const existing = await payload.find({
        collection: "media",
        where: { alt: { equals: img.alt } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        mediaMap[img.file] = existing.docs[0].id as number;
        results.push(`EXISTS: ${img.file} (id: ${existing.docs[0].id})`);
        continue;
      }

      // Read the file from public directory
      const filePath = path.join(process.cwd(), "public", img.file);
      if (!fs.existsSync(filePath)) {
        results.push(`MISSING FILE: ${filePath}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const mimeType = img.file.endsWith(".png") ? "image/png"
        : img.file.endsWith(".jpg") || img.file.endsWith(".jpeg") ? "image/jpeg"
        : img.file.endsWith(".webp") ? "image/webp"
        : "image/png";

      try {
        const created = await payload.create({
          collection: "media",
          data: {
            alt: img.alt,
            kind: img.kind,
          },
          file: {
            data: fileBuffer,
            name: img.file,
            mimetype: mimeType,
            size: fileBuffer.length,
          },
        });
        mediaMap[img.file] = created.id as number;
        results.push(`UPLOADED: ${img.file} (id: ${created.id})`);
      } catch (e) {
        results.push(`UPLOAD FAILED: ${img.file}: ${String(e).slice(0, 100)}`);
      }
    }

    // Step 2: Assign images to the Home page blocks
    const homePages = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
      depth: 0,
    });

    if (homePages.docs.length === 0) {
      results.push("HOME PAGE NOT FOUND - skipping assignments");
      return NextResponse.json({ results, mediaMap });
    }

    const homePage = homePages.docs[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layout = (homePage as any).layout as any[] || [];
    let updated = false;

    for (const block of layout) {
      if (block.blockType === "hero") {
        const heroAssign = HOME_PAGE_ASSIGNMENTS.hero;
        for (const [field, file] of Object.entries(heroAssign)) {
          if (!block[field] && mediaMap[file]) {
            block[field] = mediaMap[file];
            updated = true;
            results.push(`ASSIGNED: hero.${field} = ${file} (id: ${mediaMap[file]})`);
          } else if (block[field]) {
            results.push(`ALREADY SET: hero.${field}`);
          }
        }
      }

      if (block.blockType === "aboutSplit") {
        const file = HOME_PAGE_ASSIGNMENTS.aboutSplit.image;
        if (!block.image && mediaMap[file]) {
          block.image = mediaMap[file];
          updated = true;
          results.push(`ASSIGNED: aboutSplit.image = ${file} (id: ${mediaMap[file]})`);
        } else if (block.image) {
          results.push(`ALREADY SET: aboutSplit.image`);
        }
      }

      if (block.blockType === "twoWays") {
        for (const [field, file] of Object.entries(HOME_PAGE_ASSIGNMENTS.twoWays)) {
          if (!block[field] && mediaMap[file]) {
            block[field] = mediaMap[file];
            updated = true;
            results.push(`ASSIGNED: twoWays.${field} = ${file} (id: ${mediaMap[file]})`);
          } else if (block[field]) {
            results.push(`ALREADY SET: twoWays.${field}`);
          }
        }
      }
    }

    if (updated) {
      await payload.update({
        collection: "pages",
        id: homePage.id,
        data: { layout },
      });
      results.push("HOME PAGE UPDATED with image assignments");
    } else {
      results.push("NO UPDATES NEEDED - all images already assigned");
    }

    return NextResponse.json({ success: true, results, mediaMap });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
