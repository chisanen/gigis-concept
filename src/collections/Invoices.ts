import type { CollectionConfig } from "payload";

export const Invoices: CollectionConfig = {
  slug: "invoices",
  admin: {
    useAsTitle: "invoiceNumber",
    defaultColumns: ["invoiceNumber", "clientName", "totalCents", "status", "dueDate"],
    group: "Studio",
    description: "Payment tracking. Create invoices with line items and send to clients. Track paid vs outstanding.",
  },
  fields: [
    { name: "invoiceNumber", type: "text", admin: { description: "Unique invoice number (e.g. INV-001). Auto-generated or enter your own" } },
    { name: "clientName", type: "text", required: true, admin: { description: "Who is this invoice for?" } },
    { name: "clientEmail", type: "email", admin: { description: "Client's email — where the invoice will be sent" } },
    {
      name: "lineItems",
      type: "array",
      admin: { description: "Each service or item you're charging for — add as many as you need" },
      fields: [
        { name: "label", type: "text", required: true, admin: { description: "What are you charging for? (e.g. '3-Hour Photo Booth')" } },
        { name: "qty", type: "number", admin: { description: "How many of this item?" } },
        { name: "unitCents", type: "number", admin: { description: "Price per unit in cents (e.g. 15000 = $150)" } },
        { name: "totalCents", type: "number", admin: { description: "Line total in cents (qty x unit price)" } },
      ],
    },
    { name: "subtotalCents", type: "number", admin: { description: "Subtotal before any adjustments, in cents" } },
    { name: "totalCents", type: "number", admin: { description: "Final total the client owes, in cents" } },
    { name: "amountPaidCents", type: "number", defaultValue: 0, admin: { description: "How much has been paid so far, in cents" } },
    { name: "balanceCents", type: "number", admin: { description: "Remaining amount due, in cents" } },
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
      admin: { description: "Current payment status of this invoice" },
    },
    { name: "dueDate", type: "date", admin: { description: "When is payment due? Used for overdue reminders" } },
    { name: "isDeposit", type: "checkbox", defaultValue: false, admin: { description: "Check if this invoice is just for the deposit, not the full amount" } },
    {
      name: "payments",
      type: "array",
      admin: { description: "Record each payment as it comes in" },
      fields: [
        { name: "amountCents", type: "number", required: true, admin: { description: "Amount of this payment in cents" } },
        { name: "method", type: "text", admin: { description: "How they paid (e.g. 'Zelle', 'Cash App', 'Credit Card')" } },
        { name: "paidAt", type: "date", admin: { description: "Date the payment was received" } },
      ],
    },
  ],
};
