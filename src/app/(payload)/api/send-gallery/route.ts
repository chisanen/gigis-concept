import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { to, collectionName, galleryUrl, password } = await request.json();

    if (!to || !collectionName || !galleryUrl) {
      return NextResponse.json({ error: "to, collectionName, and galleryUrl are required" }, { status: 400 });
    }

    const passwordLine = password
      ? `<p style="color: #5C463B; font-size: 15px; line-height: 1.8;">Your gallery password is: <strong style="color: #3A2D28;">${password}</strong></p>`
      : "";

    const result = await sendEmail({
      to,
      subject: `Your Gallery is Ready — ${collectionName} | Gigi's Concept`,
      html: `
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
      `,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
