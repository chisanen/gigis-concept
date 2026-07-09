import { sendEmail, inquiryAutoReplyHtml, ownerNotificationHtml, reviewRequestHtml } from "./email";

/**
 * Fire automations based on triggers.
 * Called from Payload afterChange hooks.
 */
export async function fireAutomation(trigger: string, data: Record<string, unknown>) {
  console.log(`[AUTOMATION] Trigger: ${trigger}`, JSON.stringify(data).slice(0, 200));

  switch (trigger) {
    case "lead_created": {
      const email = data.email as string;
      const firstName = data.firstName as string;
      if (email && firstName) {
        await sendEmail({
          to: email,
          subject: "Thank you for your inquiry — Gigi's Concept",
          html: inquiryAutoReplyHtml(firstName),
        });
        const ownerEmail = process.env.EMAIL_REPLY_TO || "hello@gigisconcept.com";
        await sendEmail({
          to: ownerEmail,
          subject: `New Lead: ${firstName} ${data.lastName || ""}`,
          html: ownerNotificationHtml({
            Name: `${firstName} ${data.lastName || ""}`,
            Email: email,
            Phone: (data.phone as string) || "—",
            Service: (data.serviceRequired as string) || "—",
            "Event Date": (data.eventDate as string) || "—",
            Source: (data.source as string) || "website",
          }),
        });
      }
      break;
    }

    case "booking_confirmed": {
      const email = data.clientEmail as string;
      const name = data.clientName as string;
      if (email && name) {
        await sendEmail({
          to: email,
          subject: "Your booking is confirmed! — Gigi's Concept",
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; color: #3A2D28; font-weight: 300; letter-spacing: 0.1em; text-align: center;">GIGI'S CONCEPT</h1>
              <p style="color: #3A2D28;">Hi ${name},</p>
              <p style="color: #5C463B; line-height: 1.8;">Your booking has been confirmed! We're so excited to be part of your special day.</p>
              <p style="color: #5C463B; line-height: 1.8;">Next steps:</p>
              <ul style="color: #5C463B; line-height: 2;">
                <li>Your contract will be sent shortly for e-signature</li>
                <li>A 50% deposit invoice will follow</li>
                <li>About 1 month before your event, we'll send a details questionnaire</li>
              </ul>
              <p style="color: #3A2D28; font-style: italic;">— Gigi</p>
            </div>
          `,
        });
      }
      break;
    }

    case "event_completed": {
      const email = data.clientEmail as string;
      const name = data.clientName as string;
      if (email && name) {
        await sendEmail({
          to: email,
          subject: "How was your experience? — Gigi's Concept",
          html: reviewRequestHtml(name),
        });
      }
      break;
    }

    case "payment_received": {
      const email = data.clientEmail as string;
      const name = data.clientName as string;
      const amount = data.amountCents as number;
      if (email && name) {
        await sendEmail({
          to: email,
          subject: "Payment received — Gigi's Concept",
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; color: #3A2D28; font-weight: 300; letter-spacing: 0.1em; text-align: center;">GIGI'S CONCEPT</h1>
              <p style="color: #3A2D28;">Hi ${name},</p>
              <p style="color: #5C463B; line-height: 1.8;">We've received your payment of $${((amount || 0) / 100).toFixed(2)}. Thank you!</p>
              <p style="color: #5C463B; line-height: 1.8;">View your booking details in your <a href="https://gigis-concept.vercel.app/portal" style="color: #A48374;">Client Portal</a>.</p>
              <p style="color: #3A2D28; font-style: italic;">— Gigi</p>
            </div>
          `,
        });
      }
      break;
    }
  }
}
