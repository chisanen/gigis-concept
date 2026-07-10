import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getPayload } from "@/lib/payload";

export async function POST(request: NextRequest) {
  try {
    const { prompt, quality } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured. Go to Settings → Integrations to add it." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Generate image
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1536x1024",
      quality: quality || "high",
    });

    const imageData = response.data?.[0];

    if (!imageData) {
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    // If we got base64 data, save it to Payload Media
    if (imageData.b64_json) {
      const payload = await getPayload();
      const buffer = Buffer.from(imageData.b64_json, "base64");

      // Create a slug from the prompt
      const slug = prompt.slice(0, 40).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const filename = `ai-${slug}-${Date.now()}.png`;

      // Upload to Payload media
      const media = await payload.create({
        collection: "media",
        data: {
          alt: prompt.slice(0, 100),
          isAiGenerated: true,
          aiPrompt: prompt,
        },
        file: {
          data: buffer,
          name: filename,
          mimetype: "image/png",
          size: buffer.length,
        },
      });

      return NextResponse.json({
        success: true,
        mediaId: media.id,
        url: media.url,
        message: "Image generated and saved to Media library!",
      });
    }

    // If we got a URL instead
    if (imageData.url) {
      return NextResponse.json({
        success: true,
        url: imageData.url,
        message: "Image generated! Download and upload to Media.",
      });
    }

    return NextResponse.json({ error: "Unexpected response format" }, { status: 500 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("AI image generation error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
