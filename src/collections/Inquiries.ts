import type { CollectionConfig } from "payload";

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "serviceRequired", "status", "createdAt"],
    group: "Studio",
    description: "Messages from your website contact form. Review inquiries and convert promising ones into leads.",
  },
  access: {
    create: () => true,
  },
  fields: [
    { name: "firstName", type: "text", required: true, admin: { description: "Client's first name from the inquiry form" } },
    { name: "lastName", type: "text", required: true, admin: { description: "Client's last name from the inquiry form" } },
    { name: "email", type: "email", required: true, admin: { description: "Their email address — reply here to follow up" } },
    { name: "phone", type: "text", required: true, admin: { description: "Phone number they provided" } },
    { name: "eventDate", type: "text", required: true, admin: { description: "When is their event?" } },
    { name: "eventLocation", type: "text", required: true, admin: { description: "Where is the event happening?" } },
    { name: "eventType", type: "text", required: true, admin: { description: "What kind of event (wedding, birthday, corporate, etc.)" } },
    { name: "serviceRequired", type: "text", required: true, admin: { description: "Which service are they interested in?" } },
    { name: "hearAbout", type: "text", required: true, admin: { description: "How did they hear about you?" } },
    { name: "promoCode", type: "text", admin: { description: "Promo or discount code they entered, if any" } },
    { name: "message", type: "textarea", admin: { description: "Their message or additional details" } },
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
      admin: { description: "Track where this inquiry is in your review process" },
    },
  ],
};
