import type { CollectionConfig } from "payload";
import { fireAutomation } from "../lib/automations";

export const Bookings: CollectionConfig = {
  slug: "bookings",
  admin: {
    useAsTitle: "clientName",
    defaultColumns: ["clientName", "eventDate", "service", "status"],
    group: "Studio",
    description: "Confirmed events and sessions. HOW TO USE: 1) Click 'Create New' when a client signs their contract. 2) Fill in client name, email, service, package, event date, start time, venue, and guest count. 3) Update status as you go: Inquiry > Confirmed > In Production > Delivered > Completed. 4) Assign team members to each booking. 5) Add internal notes for day-of logistics. TIP: Check the Calendar on the Dashboard to see all upcoming bookings.",
    components: {
      beforeList: ["@/components/admin/InstructionsBox#InstructionsBox"],
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        if (operation === "update" && previousDoc?.status !== doc.status) {
          if (doc.status === "confirmed") {
            fireAutomation("booking_confirmed", doc).catch(console.error);
          }
          if (doc.status === "completed") {
            fireAutomation("event_completed", doc).catch(console.error);
          }
        }
      },
    ],
  },
  fields: [
    { name: "clientName", type: "text", required: true, admin: { description: "Full name of the client who booked" } },
    { name: "clientEmail", type: "email", admin: { description: "Client's email — used for sending confirmations and updates" } },
    {
      name: "service",
      type: "select",
      options: [
        { label: "Content Creation", value: "content" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Both", value: "both" },
      ],
      admin: { description: "Which service did they book?" },
    },
    { name: "packageName", type: "text", admin: { description: "Which package they chose (e.g. 'Storyteller', 'Elegant Booth')" } },
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
      admin: { description: "Current status of this booking — update as you move through your workflow" },
    },
    { name: "eventDate", type: "date", required: true, admin: { description: "The date of the event" } },
    { name: "startTime", type: "text", admin: { description: "What time does the event start? (e.g. '2:00 PM')" } },
    { name: "endTime", type: "text", admin: { description: "What time does the event end? (e.g. '6:00 PM')" } },
    { name: "durationHours", type: "number", admin: { description: "Total hours booked — used for pricing calculations" } },
    { name: "venueName", type: "text", admin: { description: "Name of the venue" } },
    { name: "venueAddress", type: "text", admin: { description: "Full address of the venue — helpful for day-of logistics" } },
    { name: "guestCount", type: "number", admin: { description: "Estimated number of guests — helps you plan equipment and staffing" } },
    { name: "backdropChoice", type: "text", admin: { description: "Which backdrop the client picked for their photo booth" } },
    { name: "subtotalCents", type: "number", admin: { description: "Subtotal before extras, in cents (e.g. 50000 = $500)" } },
    { name: "totalCents", type: "number", admin: { description: "Final total in cents, including add-ons and fees" } },
    { name: "depositCents", type: "number", admin: { description: "Deposit amount collected in cents" } },
    { name: "balanceCents", type: "number", admin: { description: "Remaining balance due in cents" } },
    { name: "internalNotes", type: "textarea", admin: { description: "Private notes about this booking — only visible to your team" } },
  ],
};
