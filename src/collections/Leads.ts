import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "stage", "eventDate", "serviceRequired"],
    group: "Studio",
  },
  fields: [
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "eventDate", type: "date" },
    { name: "eventLocation", type: "text" },
    { name: "eventType", type: "text" },
    {
      name: "serviceRequired",
      type: "select",
      options: [
        { label: "Content Creation", value: "content" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Both", value: "both" },
      ],
    },
    { name: "heardAbout", type: "text" },
    { name: "promoCode", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "stage",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Consultation", value: "consultation" },
        { label: "Quote Sent", value: "quote_sent" },
        { label: "Booked", value: "booked" },
        { label: "Lost", value: "lost" },
      ],
    },
    {
      name: "source",
      type: "select",
      options: [
        { label: "Website", value: "website" },
        { label: "Referral", value: "referral" },
        { label: "Instagram", value: "ig" },
        { label: "TikTok", value: "tiktok" },
        { label: "Google", value: "google" },
      ],
    },
    { name: "valueCents", type: "number" },
    {
      name: "notes",
      type: "array",
      fields: [
        { name: "note", type: "textarea", required: true },
        { name: "createdAt", type: "date" },
      ],
    },
    { name: "nextFollowUpAt", type: "date" },
  ],
};
