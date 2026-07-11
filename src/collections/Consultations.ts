import type { CollectionConfig } from "payload";

export const Consultations: CollectionConfig = {
  slug: "consultations",
  admin: {
    useAsTitle: "clientName",
    group: "Studio",
    defaultColumns: ["clientName", "date", "type", "status"],
    description: "Discovery calls and meetings with potential clients. HOW TO USE: 1) Click 'Create New'. 2) Enter the client's name, email, date/time, and meeting type (phone, video, in-person). 3) Add notes during or after the call. 4) Update status: Scheduled, Completed, Cancelled, or No-Show. TIP: Schedule a consultation within 48 hours of an inquiry for best results.",
    components: {
      beforeList: ["@/components/admin/InstructionsBox#InstructionsBox"],
    },
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: "clientName",
      type: "text",
      admin: { description: "Client's name for this consultation" },
    },
    {
      name: "clientEmail",
      type: "email",
      admin: { description: "Client's email — for sending meeting links or follow-ups" },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: { description: "When is the consultation scheduled?" },
    },
    {
      name: "startTime",
      type: "text",
      admin: { description: "What time does it start? (e.g. '10:00 AM')" },
    },
    {
      name: "duration",
      type: "number",
      defaultValue: 15,
      admin: { description: "How long is the consultation in minutes? Default is 15" },
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Call", value: "call" },
        { label: "DM", value: "dm" },
        { label: "Video", value: "video" },
      ],
      admin: { description: "How will you connect? Phone call, DM, or video chat" },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Scheduled", value: "scheduled" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "No Show", value: "no_show" },
      ],
      defaultValue: "scheduled",
      admin: { description: "Did the consultation happen, get cancelled, or was it a no-show?" },
    },
    {
      name: "notes",
      type: "textarea",
      admin: { description: "Notes from the consultation — what did you discuss?" },
    },
    {
      name: "meetingLink",
      type: "text",
      admin: { description: "Link for video calls (e.g. Zoom or Google Meet URL)" },
    },
  ],
};
