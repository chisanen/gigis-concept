import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password) return NextResponse.json({ error: "Password required" }, { status: 400 });

    const payload = await getPayload();
    const results = await payload.find({
      collection: "gallery-images",
      where: { category: { equals: "password" }, password: { equals: password } },
      limit: 100,
      depth: 2,
    });

    if (results.docs.length === 0) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const collectionName = (results.docs[0] as Record<string, unknown>).collectionName as string || "Gallery";
    const images = results.docs.map((doc: Record<string, unknown>) => {
      const media = doc.image as Record<string, unknown> | null;
      const url = media?.url as string || "";
      const kind = media?.kind as string || "image";
      return {
        src: url,
        alt: (doc.title as string) || "",
        kind,
      };
    }).filter(img => img.src);

    return NextResponse.json({ collectionName, images });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
