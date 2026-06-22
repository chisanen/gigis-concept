import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getPayload } from "@/lib/payload";
import { getNextTopic } from "@/lib/blog-topics";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload();
  const { topic, category } = getNextTopic();

  // Check if this topic already exists
  const existing = await payload.find({
    collection: "blog-posts",
    where: { title: { equals: topic } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    return NextResponse.json({ message: "Topic already exists, skipping" });
  }

  // Generate blog content
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a blog writer for Gigi's Concept, a luxury content creation and photo booth studio in Dallas, Texas. Write warm, editorial, SEO-optimized content targeting Dallas-area African American professionals, brides, and event planners. 800-1200 words.`,
      },
      {
        role: "user",
        content: `Write a blog post: "${topic}". Category: ${category}. Return JSON: {"title","excerpt","content" (markdown),"tags":[],"metaDescription"}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(completion.choices[0].message.content || "{}");

  // Create slug
  const slug = result.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Create blog post
  const autoPublish = process.env.AUTO_PUBLISH_BLOG === "true";

  const post = await payload.create({
    collection: "blog-posts",
    data: {
      title: result.title || topic,
      slug,
      excerpt: result.excerpt || "",
      content: { root: { type: "root", children: [{ type: "paragraph", children: [{ type: "text", text: result.content || "" }] }] } },
      category,
      tags: (result.tags || []).map((tag: string) => ({ tag })),
      author: "Gigi",
      publishedDate: new Date().toISOString(),
      aiGenerated: true,
      aiPrompt: topic,
      _status: autoPublish ? "published" : "draft",
    },
  });

  return NextResponse.json({
    success: true,
    postId: post.id,
    title: result.title,
    status: autoPublish ? "published" : "draft",
  });
}
