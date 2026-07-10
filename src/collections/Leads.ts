import type { CollectionConfig } from "payload";
import { fireAutomation } from "../lib/automations";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "stage", "eventDate", "serviceRequired"],
    group: "Studio",
    description: "Your sales pipeline. Every inquiry becomes a lead. Move leads through stages: New, Contacted, Consultation, Quote Sent, Booked, or Lost.",
  },
  access: {
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === "create") {
          fireAutomation("lead_created", doc).catch(console.error);
        }
      },
    ],
  },
  fields: [
    { name: "firstName", type: "text", required: true, admin: { description: "Client's first name" } },
    { name: "lastName", type: "text", required: true, admin: { description: "Client's last name" } },
    { name: "email", type: "email", required: true, admin: { description: "Client's email address — used for all communication" } },
    { name: "phone", type: "text", admin: { description: "Best phone number to reach them" } },
    { name: "eventDate", type: "date", admin: { description: "When is their event? This helps you plan your calendar" } },
    { name: "eventLocation", type: "text", admin: { description: "Where is the event happening?" } },
    { name: "eventType", type: "text", admin: { description: "What kind of event (wedding, birthday, corporate, etc.)" } },
    {
      name: "serviceRequired",
      type: "select",
      options: [
        { label: "Content Creation", value: "content" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Both", value: "both" },
      ],
      admin: { description: "Which of your services are they interested in?" },
    },
    { name: "heardAbout", type: "text", admin: { description: "How did they hear about you? Great for tracking what marketing works" } },
    { name: "promoCode", type: "text", admin: { description: "If they mentioned a promo or discount code, enter it here" } },
    { name: "message", type: "textarea", admin: { description: "Their original message or inquiry details" } },
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
      admin: { description: "Where is this lead in your sales pipeline? Drag cards on the CRM board to update" },
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
      admin: { description: "How did they find you?" },
    },
    { name: "valueCents", type: "number", admin: { description: "Estimated deal value in cents (e.g. 50000 = $500). Helps you prioritize leads" } },
    {
      name: "notes",
      type: "array",
      admin: { description: "Private notes — only you and your team can see these" },
      fields: [
        { name: "note", type: "textarea", required: true, admin: { description: "Write your note here" } },
        { name: "createdAt", type: "date", admin: { description: "When this note was added" } },
      ],
    },
    { name: "nextFollowUpAt", type: "date", admin: { description: "Set a reminder date to follow up with this lead" } },
  ],
};
