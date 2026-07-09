import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM || "Gigi's Concept <onboarding@resend.dev>";
const REPLY_TO = process.env.EMAIL_REPLY_TO || "hello@gigisconcept.com";

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[EMAIL SKIPPED - no API key] To: ${to}, Subject: ${subject}`);
    return { success: false, error: "No Resend API key" };
  }

  try {
    const result = await resend.emails.send({
      from: FROM,
      to,
      replyTo: REPLY_TO,
      subject,
      html,
      text: text || subject,
    });
    console.log(`[EMAIL SENT] To: ${to}, Subject: ${subject}`);
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error(`[EMAIL ERROR] To: ${to}`, error);
    return { success: false, error: String(error) };
  }
}

export function inquiryAutoReplyHtml(firstName: string) {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; color: #3A2D28; font-weight: 300; letter-spacing: 0.1em;">GIGI'S CONCEPT</h1>
        <p style="color: #A48374; font-size: 12px; letter-spacing: 0.2em;">CONTENT CREATION · LUXURY PHOTO BOOTH</p>
      </div>
      <p style="color: #3A2D28; font-size: 16px; line-height: 1.8;">Hi ${firstName},</p>
      <p style="color: #5C463B; font-size: 15px; line-height: 1.8;">
        Thank you so much for reaching out! We received your inquiry and are excited to learn more about your event.
      </p>
      <p style="color: #5C463B; font-size: 15px; line-height: 1.8;">
        We'll review your details and get back to you within 24 hours with a custom quote. In the meantime, feel free to browse our
        <a href="https://gigis-concept.vercel.app/gallery" style="color: #A48374;">gallery</a> or check out our
        <a href="https://gigis-concept.vercel.app/pricing" style="color: #A48374;">packages</a>.
      </p>
      <p style="color: #5C463B; font-size: 15px; line-height: 1.8;">
        Looking forward to creating something beautiful together!
      </p>
      <p style="color: #3A2D28; font-size: 15px; line-height: 1.8; font-style: italic;">— Gigi</p>
      <hr style="border: none; border-top: 1px solid #D1C7BD; margin: 30px 0;" />
      <p style="color: #A48374; font-size: 12px; text-align: center;">
        Gigi's Concept · Dallas, TX · <a href="https://gigis-concept.vercel.app" style="color: #A48374;">gigisconcept.com</a>
      </p>
    </div>
  `;
}

export function ownerNotificationHtml(data: Record<string, string>) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #3A2D28;">New Inquiry Received</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${Object.entries(data).map(([k, v]) => `
          <tr style="border-bottom: 1px solid #EBE3DB;">
            <td style="padding: 8px; color: #A48374; font-size: 13px; width: 140px;">${k}</td>
            <td style="padding: 8px; color: #3A2D28; font-size: 14px;">${v}</td>
          </tr>
        `).join("")}
      </table>
      <p style="margin-top: 20px;">
        <a href="https://gigis-concept.vercel.app/admin/collections/inquiries" style="color: #A48374;">View in Admin →</a>
      </p>
    </div>
  `;
}

export function consultationConfirmationHtml(name: string, date: string, time: string, type: string) {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; color: #3A2D28; font-weight: 300; letter-spacing: 0.1em;">GIGI'S CONCEPT</h1>
      </div>
      <p style="color: #3A2D28; font-size: 16px; line-height: 1.8;">Hi ${name},</p>
      <p style="color: #5C463B; font-size: 15px; line-height: 1.8;">
        Your 15-minute consultation is confirmed!
      </p>
      <div style="background: #F1EDE6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 4px 0; color: #3A2D28;"><strong>Date:</strong> ${date}</p>
        <p style="margin: 4px 0; color: #3A2D28;"><strong>Time:</strong> ${time}</p>
        <p style="margin: 4px 0; color: #3A2D28;"><strong>Type:</strong> ${type}</p>
      </div>
      <p style="color: #5C463B; font-size: 15px; line-height: 1.8;">Looking forward to chatting!</p>
      <p style="color: #3A2D28; font-size: 15px; font-style: italic;">— Gigi</p>
    </div>
  `;
}

export function reviewRequestHtml(name: string) {
  return `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; color: #3A2D28; font-weight: 300; letter-spacing: 0.1em;">GIGI'S CONCEPT</h1>
      </div>
      <p style="color: #3A2D28; font-size: 16px; line-height: 1.8;">Hi ${name},</p>
      <p style="color: #5C463B; font-size: 15px; line-height: 1.8;">
        Thank you for choosing Gigi's Concept for your event! We'd love to hear about your experience.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://gigis-concept.vercel.app/review" style="display: inline-block; padding: 14px 40px; background: #3A2D28; color: #F1EDE6; text-decoration: none; font-size: 12px; letter-spacing: 0.15em; border-radius: 999px;">
          LEAVE A REVIEW
        </a>
      </div>
      <p style="color: #A48374; font-size: 13px; text-align: center;">Your feedback means the world to us.</p>
    </div>
  `;
}
