import type { CollectionConfig } from "payload";

export const EmailTemplates: CollectionConfig = {
  slug: "email-templates",
  admin: {
    useAsTitle: "name",
    group: "Operations",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "subject", type: "text", required: true },
    { name: "body", type: "richText" },
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
    },
  ],
};
