import type { CollectionConfig } from "payload";

export const EmailTemplates: CollectionConfig = {
  slug: "email-templates",
  admin: {
    useAsTitle: "name",
    group: "Operations",
    description: "Reusable email templates for client communication. HOW TO USE: 1) Click 'Create New'. 2) Give it a name (e.g. 'Booking Confirmation'), write the subject line, and compose the email body using the rich text editor. 3) Templates are used by Automations to send emails automatically. TIP: Write emails in a warm, personal tone that matches your brand voice.",
  },
  fields: [
    { name: "name", type: "text", required: true, admin: { description: "Internal name for this template (e.g. 'Booking Confirmation', 'Quote Follow-Up')" } },
    { name: "subject", type: "text", required: true, admin: { description: "Email subject line your clients will see in their inbox" } },
    { name: "body", type: "richText", admin: { description: "The email content — write it like you're talking to your client" } },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Inquiry", value: "inquiry" },
        { label: "Confirmation", value: "confirmation" },
        { label: "Quote", value: "quote" },
        { label: "Booking", value: "booking" },
        { label: "Payment", value: "payment" },
        { label: "Reminder", value: "reminder" },
        { label: "Review", value: "review" },
        { label: "Promo", value: "promo" },
      ],
      admin: { description: "What type of email is this? Helps you find templates quickly" },
    },
  ],
};
