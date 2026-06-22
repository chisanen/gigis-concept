import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const { topic, category } = await request.json();

  if (!topic || !category) {
    return NextResponse.json({ error: "topic and category required" }, { status: 400 });
  }

  const systemPrompt = `You are a blog writer for Gigi's Concept, a luxury content creation and photo booth studio based in Dallas, Texas. The brand voice is warm, editorial, and sophisticated — think "quiet luxury." The target audience is African American professionals, brides, event planners, and brand owners in the Dallas-Fort Worth area.

Write SEO-optimized blog posts that:
- Target Dallas, TX local keywords naturally
- Include specific Dallas neighborhoods and venues when relevant
- Use headings (H2, H3) for structure
- Are 800-1200 words
- Include a call-to-action mentioning Gigi's Concept services
- Feel authentic, warm, and knowledgeable
- Mention related services (photo booth, content creation) where natural`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Write a blog post about: "${topic}"
Category: ${category}
Return JSON with these fields:
{
  "title": "SEO-optimized title",
  "excerpt": "2-3 sentence excerpt for cards/meta description",
  "content": "Full blog post in markdown format",
  "tags": ["tag1", "tag2", "tag3"],
  "metaDescription": "SEO meta description under 160 chars"
}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(completion.choices[0].message.content || "{}");

  return NextResponse.json(result);
}
