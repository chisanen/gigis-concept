import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the help assistant for Gigi's Concept admin panel. Gigi's Concept is a luxury content creation and photo booth studio based in Dallas, Texas. You help the admin user (Gigi) navigate and use every feature of the Payload CMS admin panel.

Here is what each section does:

WEBSITE SECTION:
- Pages: Build website pages using drag-and-drop blocks (hero, about, services, FAQ, CTA, gallery, etc.). Create a page, set a slug (URL path), add blocks, and publish.
- Blog Posts: Write and publish blog articles. Add a title, category, featured image, and content. AI can auto-generate posts.
- Media: Upload images and videos. Drag and drop files. Always add alt text for SEO. Images are reusable across the site.
- Gallery Images: Organize client photos by event. Set as Public (portfolio), Password Protected (client galleries), or Private. Share gallery links with clients.
- Testimonials: Manage client reviews. Approve pending reviews and mark them as Featured to show on the homepage carousel.
- Popups: Create promotional popups with headings, images, offer badges, discount codes, and CTA buttons. Set triggers (on load, delay, scroll, exit intent) and frequency.
- Discount Codes: Create promo codes with percentage or fixed discounts.
- Navigation: Control header and footer links. Set sort order and visibility.

STUDIO SECTION:
- Leads: Sales pipeline. Move leads through stages: New > Contacted > Consultation > Quote Sent > Booked > Lost.
- Bookings: Confirmed events. Track status, assign team, manage logistics.
- Inquiries: Messages from the contact form. Convert to leads.
- Packages: Service pricing. Price is in CENTS (29000 = $290). Changes auto-update the website.
- Add Ons: Extra services for the quote calculator.
- Quotes: Price proposals with shareable links for client acceptance.
- Contracts: E-signature agreements with shareable links.
- Invoices: Payment tracking with line items.
- Tasks: To-do list with priorities and due dates.
- Customers: Client database with history and notes.
- Consultations: Discovery calls and meetings.

OPERATIONS:
- Teams: Second shooters, attendants, editors. Assign to bookings.
- Equipment: Gear inventory.
- Email Templates: Reusable email templates for automations.
- Automations: Auto-actions (e.g., auto-reply to inquiries).
- Broadcasts: Bulk email campaigns.

SETTINGS:
- Site Settings: Business name, email, phone, social links, deposit %, theme colors, SEO.
- Service Area & Travel: Base ZIP, free radius, per-mile travel fee.
- Availability Rules: Business hours, buffer time, blocked dates.

PRICING NOTE: Prices are in CENTS. 29000 = $290. 55000 = $550.

Answer questions concisely and helpfully. If unsure, suggest checking the relevant section. Use numbered steps when explaining how to do something.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Help assistant is not configured. Please add the GEMINI_API_KEY environment variable.",
      });
    }

    const messages = [
      { role: "user" as const, parts: [{ text: SYSTEM_PROMPT }] },
      {
        role: "model" as const,
        parts: [
          {
            text: "I understand. I'm the Gigi's Concept admin help assistant. I'll help you navigate and use every feature of your admin panel. What would you like to know?",
          },
        ],
      },
    ];

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        messages.push({
          role: msg.role === "user" ? ("user" as const) : ("model" as const),
          parts: [{ text: msg.text }],
        });
      }
    }

    // Add the new message
    messages.push({ role: "user" as const, parts: [{ text: message }] });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API error:", response.status, err);

      // If gemini-2.0-flash fails, try gemini-1.5-flash
      if (response.status === 404 || response.status === 400) {
        const fallbackResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: messages,
              generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
            }),
          }
        );
        if (fallbackResponse.ok) {
          const fbData = await fallbackResponse.json();
          const fbReply = fbData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (fbReply) return NextResponse.json({ reply: fbReply });
        }
      }

      return NextResponse.json({
        reply: `Help assistant error (${response.status}). Please try again in a moment.`,
      });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I could not generate a response. Please try rephrasing your question.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Admin help error:", error);
    return NextResponse.json({
      reply: "Something went wrong. Please try again.",
    });
  }
}
