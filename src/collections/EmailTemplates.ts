import type { CollectionConfig } from "payload";

export const EmailTemplates: CollectionConfig = {
  slug: "email-templates",
  admin: {
    useAsTitle: "name",
    group: "Operations",
    description: "Reusable email templates for booking confirmations, follow-ups, and thank yous.",
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
