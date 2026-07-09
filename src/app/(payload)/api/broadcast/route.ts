import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "@/lib/payload";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { broadcastId } = await request.json();
    if (!broadcastId) return NextResponse.json({ error: "broadcastId required" }, { status: 400 });

    const payload = await getPayload();

    const broadcast = await payload.findByID({ collection: "broadcasts", id: broadcastId });
    if (!broadcast) return NextResponse.json({ error: "Broadcast not found" }, { status: 404 });

    const subject = broadcast.subject as string;
    const audience = broadcast.audience as string;

    // Get recipients based on audience
    let emails: string[] = [];

    if (audience === "all_clients" || audience === "past_clients") {
      const customers = await payload.find({ collection: "customers", limit: 500, select: { email: true } });
      emails = customers.docs.map((c: Record<string, unknown>) => c.email as string).filter(Boolean);
    }

    if (audience === "leads" || audience === "all_clients") {
      const leads = await payload.find({ collection: "leads", limit: 500, select: { email: true } });
      const leadEmails = leads.docs.map((l: Record<string, unknown>) => l.email as string).filter(Boolean);
      emails = [...new Set([...emails, ...leadEmails])];
    }

    if (emails.length === 0) {
      return NextResponse.json({ error: "No recipients found for this audience", sentCount: 0 });
    }

    // Send to each recipient
    let sentCount = 0;
    for (const email of emails) {
      const result = await sendEmail({
        to: email,
        subject,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 24px; color: #3A2D28; font-weight: 300; letter-spacing: 0.1em; text-align: center;">GIGI'S CONCEPT</h1>
            <div style="color: #5C463B; font-size: 15px; line-height: 1.8; margin-top: 20px;">
              ${subject}
            </div>
            <hr style="border: none; border-top: 1px solid #D1C7BD; margin: 30px 0;" />
            <p style="color: #A48374; font-size: 12px; text-align: center;">
              Gigi's Concept · Dallas, TX · <a href="https://gigis-concept.vercel.app" style="color: #A48374;">gigisconcept.com</a>
            </p>
          </div>
        `,
      });
      if (result.success) sentCount++;
    }

    // Update broadcast status
    await payload.update({
      collection: "broadcasts",
      id: broadcastId,
      data: { status: "sent", sentCount },
    });

    return NextResponse.json({ success: true, sentCount, totalRecipients: emails.length });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
