import type { CollectionConfig } from "payload";

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "serviceRequired", "status", "createdAt"],
  },
  access: {
    create: () => true,
  },
  fields: [
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    { name: "eventDate", type: "text", required: true },
    { name: "eventLocation", type: "text", required: true },
    { name: "eventType", type: "text", required: true },
    { name: "serviceRequired", type: "text", required: true },
    { name: "hearAbout", type: "text", required: true },
    { name: "promoCode", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Reviewed", value: "reviewed" },
        { label: "Booked", value: "booked" },
        { label: "Archived", value: "archived" },
      ],
    },
  ],
};
