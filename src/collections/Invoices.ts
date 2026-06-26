import type { CollectionConfig } from "payload";

export const Invoices: CollectionConfig = {
  slug: "invoices",
  admin: {
    useAsTitle: "invoiceNumber",
    defaultColumns: ["invoiceNumber", "clientName", "totalCents", "status", "dueDate"],
    group: "Studio",
  },
  fields: [
    { name: "invoiceNumber", type: "text" },
    { name: "clientName", type: "text", required: true },
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
    { name: "totalCents", type: "number" },
    { name: "amountPaidCents", type: "number", defaultValue: 0 },
    { name: "balanceCents", type: "number" },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Sent", value: "sent" },
        { label: "Partial", value: "partial" },
        { label: "Paid", value: "paid" },
        { label: "Overdue", value: "overdue" },
        { label: "Void", value: "void" },
      ],
    },
    { name: "dueDate", type: "date" },
    { name: "isDeposit", type: "checkbox", defaultValue: false },
    {
      name: "payments",
      type: "array",
      fields: [
        { name: "amountCents", type: "number", required: true },
        { name: "method", type: "text" },
        { name: "paidAt", type: "date" },
      ],
    },
  ],
};
