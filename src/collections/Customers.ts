import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Studio",
    description: "Your client database. HOW TO USE: 1) Customers are created automatically from bookings and inquiries. 2) Click a customer to see their full history: bookings, invoices, and notes. 3) Add private notes about preferences, special requests, or VIP status. TIP: Keep notes updated so you remember details for repeat clients.",
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      admin: { description: "Customer's first name" },
    },
    {
      name: "lastName",
      type: "text",
      admin: { description: "Customer's last name" },
    },
    {
      name: "phone",
      type: "text",
      admin: { description: "Best phone number to reach them" },
    },
    {
      name: "company",
      type: "text",
      admin: { description: "Their company or organization name, if applicable" },
    },
    {
      name: "address",
      type: "text",
      admin: { description: "Mailing or billing address" },
    },
    {
      name: "notes",
      type: "textarea",
      admin: { description: "Private notes about this customer — preferences, special requests, etc." },
    },
    {
      name: "tags",
      type: "array",
      admin: { description: "Tags to organize and filter customers (e.g. 'VIP', 'Wedding', 'Corporate')" },
      fields: [
        {
          name: "tag",
          type: "text",
          admin: { description: "A tag or label for this customer" },
        },
      ],
    },
    {
      name: "lifetimeValueCents",
      type: "number",
      defaultValue: 0,
      admin: { description: "Total amount this customer has spent with you, in cents (updates automatically)" },
    },
  ],
};
