import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { getPayload } from "@/lib/payload";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { collectionName, galleryUrl } = body;
    let { to, password } = body;

    if (!to || !collectionName || !galleryUrl) {
      return NextResponse.json({ error: "to, collectionName, and galleryUrl are required" }, { status: 400 });
    }

    // Auto-lookup password if not provided
    if (!password) {
      try {
        const payload = await getPayload();
        const lookup = await payload.find({
          collection: "gallery-images",
          where: {
            collectionName: { equals: collectionName },
            category: { equals: "password" },
          },
          limit: 1,
          depth: 0,
        });
        if (lookup.docs.length > 0) {
          password = (lookup.docs[0] as Record<string, unknown>).password as string || "";
        }
      } catch {
        // If lookup fails, proceed without password
      }
    }

    const passwordLine = password
      ? `<p style="color: #5C463B; font-size: 15px; line-height: 1.8;">Your gallery password is: <strong style="color: #3A2D28;">${password}</strong></p>`
      : "";

    const emailHtml = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 24px; color: #3A2D28; font-weight: 300; letter-spacing: 0.1em;">GIGI'S CONCEPT</h1>
          <p style="color: #A48374; font-size: 12px; letter-spacing: 0.2em;">CONTENT CREATION · LUXURY PHOTO BOOTH</p>
        </div>
        <p style="color: #3A2D28; font-size: 16px; line-height: 1.8;">Your gallery is ready!</p>
        <p style="color: #5C463B; font-size: 15px; line-height: 1.8;">
          Your photos and videos from <strong>${collectionName}</strong> are now available for viewing and download.
        </p>
        ${passwordLine}
        <div style="text-align: center; margin: 30px 0;">
          <a href="${galleryUrl}" style="display: inline-block; padding: 14px 40px; background: #3A2D28; color: #F1EDE6; text-decoration: none; font-size: 12px; letter-spacing: 0.15em; border-radius: 999px;">
            VIEW YOUR GALLERY
          </a>
        </div>
        <p style="color: #A48374; font-size: 13px; text-align: center;">
          Photos and videos are available for 90 days. Download your favorites!
        </p>
        <hr style="border: none; border-top: 1px solid #D1C7BD; margin: 30px 0;" />
        <p style="color: #A48374; font-size: 12px; text-align: center;">
          Gigi's Concept · Dallas, TX · <a href="https://gigis-concept.vercel.app" style="color: #A48374;">gigisconcept.com</a>
        </p>
      </div>
    `;

    const subject = `Your Gallery is Ready -- ${collectionName} | Gigi's Concept`;

    // Support sending to a single email or an array of emails
    const recipients: string[] = Array.isArray(to) ? to : [to];
    const results: { email: string; success: boolean; error?: string }[] = [];

    for (const recipient of recipients) {
      const result = await sendEmail({
        to: recipient,
        subject,
        html: emailHtml,
      });
      results.push({ email: recipient, success: result.success, error: result.error ? String(result.error) : undefined });
    }

    const allSucceeded = results.every((r) => r.success);
    return NextResponse.json({
      success: allSucceeded,
      results,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
