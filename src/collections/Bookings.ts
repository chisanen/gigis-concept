import type { CollectionConfig } from "payload";

export const Bookings: CollectionConfig = {
  slug: "bookings",
  admin: {
    useAsTitle: "clientName",
    defaultColumns: ["clientName", "eventDate", "service", "status"],
    group: "Studio",
  },
  fields: [
    { name: "clientName", type: "text", required: true },
    { name: "clientEmail", type: "email" },
    {
      name: "service",
      type: "select",
      options: [
        { label: "Content Creation", value: "content" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Both", value: "both" },
      ],
    },
    { name: "packageName", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "inquiry",
      options: [
        { label: "Inquiry", value: "inquiry" },
        { label: "Hold", value: "hold" },
        { label: "Confirmed", value: "confirmed" },
        { label: "In Production", value: "in_production" },
        { label: "Delivered", value: "delivered" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    { name: "eventDate", type: "date", required: true },
    { name: "startTime", type: "text" },
    { name: "endTime", type: "text" },
    { name: "durationHours", type: "number" },
    { name: "venueName", type: "text" },
    { name: "venueAddress", type: "text" },
    { name: "guestCount", type: "number" },
    { name: "backdropChoice", type: "text" },
    { name: "subtotalCents", type: "number" },
    { name: "totalCents", type: "number" },
    { name: "depositCents", type: "number" },
    { name: "balanceCents", type: "number" },
    { name: "internalNotes", type: "textarea" },
  ],
};
