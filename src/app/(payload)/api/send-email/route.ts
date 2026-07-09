import { NextRequest, NextResponse } from "next/server";
import { sendEmail, inquiryAutoReplyHtml, ownerNotificationHtml, consultationConfirmationHtml, reviewRequestHtml } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    switch (type) {
      case "inquiry_auto_reply": {
        const result = await sendEmail({
          to: data.email,
          subject: "Thank you for your inquiry — Gigi's Concept",
          html: inquiryAutoReplyHtml(data.firstName),
        });
        return NextResponse.json(result);
      }

      case "owner_notification": {
        const ownerEmail = process.env.EMAIL_REPLY_TO || "hello@gigisconcept.com";
        const result = await sendEmail({
          to: ownerEmail,
          subject: `New Inquiry from ${data.firstName} ${data.lastName}`,
          html: ownerNotificationHtml(data),
        });
        return NextResponse.json(result);
      }

      case "consultation_confirmation": {
        const result = await sendEmail({
          to: data.clientEmail,
          subject: "Your consultation is confirmed — Gigi's Concept",
          html: consultationConfirmationHtml(data.clientName, data.date, data.startTime, data.type),
        });
        return NextResponse.json(result);
      }

      case "review_request": {
        const result = await sendEmail({
          to: data.email,
          subject: "How was your experience? — Gigi's Concept",
          html: reviewRequestHtml(data.name),
        });
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json({ error: "Unknown email type" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
