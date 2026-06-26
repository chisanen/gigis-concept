import type { CollectionConfig } from "payload";

export const Quotes: CollectionConfig = {
  slug: "quotes",
  admin: {
    useAsTitle: "quoteNumber",
    defaultColumns: ["quoteNumber", "clientName", "totalCents", "status"],
    group: "Studio",
  },
  fields: [
    { name: "quoteNumber", type: "text" },
    { name: "clientName", type: "text" },
    { name: "clientEmail", type: "email" },
    {
      name: "lineItems",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "qty", type: "number" },
        { name: "unitCents", type: "number" },
        { name: "totalCents", type: "number" },
      ],
    },
    { name: "subtotalCents", type: "number" },
    { name: "discountCents", type: "number" },
    { name: "totalCents", type: "number" },
    { name: "depositCents", type: "number" },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Sent", value: "sent" },
        { label: "Viewed", value: "viewed" },
        { label: "Accepted", value: "accepted" },
        { label: "Declined", value: "declined" },
        { label: "Expired", value: "expired" },
      ],
    },
    { name: "validUntil", type: "date" },
    { name: "notes", type: "textarea" },
    { name: "sentAt", type: "date" },
  ],
};
