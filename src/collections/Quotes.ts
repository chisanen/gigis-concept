import type { CollectionConfig } from "payload";

export const Quotes: CollectionConfig = {
  slug: "quotes",
  admin: {
    useAsTitle: "quoteNumber",
    defaultColumns: ["quoteNumber", "clientName", "totalCents", "status"],
    group: "Studio",
    description: "Price quotes for clients. HOW TO USE: 1) Use the Quote Builder on the Dashboard to create quotes quickly. 2) Or click 'Create New' here to build one manually with line items. 3) Each quote gets a unique number and shareable link. 4) Send the link to clients so they can review and accept. 5) Track status: Draft, Sent, Accepted, or Declined. TIP: Quotes are valid for 30 days by default.",
    components: {
      beforeList: ["@/components/admin/InstructionsBox#InstructionsBox"],
    },
  },
  fields: [
    { name: "quoteNumber", type: "text", admin: { description: "Unique quote number (e.g. QT-001)" } },
    { name: "clientName", type: "text", admin: { description: "Who is this quote for?" } },
    { name: "clientEmail", type: "email", admin: { description: "Client's email — where the quote will be sent" } },
    {
      name: "lineItems",
      type: "array",
      admin: { description: "Each service or item included in this quote" },
      fields: [
        { name: "label", type: "text", required: true, admin: { description: "Description of the service or item" } },
        { name: "qty", type: "number", admin: { description: "How many of this item?" } },
        { name: "unitCents", type: "number", admin: { description: "Price per unit in cents" } },
        { name: "totalCents", type: "number", admin: { description: "Line total in cents" } },
      ],
    },
    { name: "subtotalCents", type: "number", admin: { description: "Subtotal before discounts, in cents" } },
    { name: "discountCents", type: "number", admin: { description: "Discount amount in cents (e.g. 5000 = $50 off)" } },
    { name: "totalCents", type: "number", admin: { description: "Final quoted total in cents" } },
    { name: "depositCents", type: "number", admin: { description: "Deposit required to secure the booking, in cents" } },
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
      admin: { description: "Where is this quote in the process?" },
    },
    { name: "validUntil", type: "date", admin: { description: "When does this quote expire? After this date it can be marked expired" } },
    { name: "notes", type: "textarea", admin: { description: "Any extra notes or terms to include with the quote" } },
    { name: "sentAt", type: "date", admin: { description: "When was this quote sent to the client?" } },
  ],
};
