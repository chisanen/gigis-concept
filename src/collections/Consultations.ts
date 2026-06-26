import type { CollectionConfig } from "payload";

export const Consultations: CollectionConfig = {
  slug: "consultations",
  admin: {
    useAsTitle: "clientName",
    group: "Studio",
    defaultColumns: ["clientName", "date", "type", "status"],
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: "clientName",
      type: "text",
    },
    {
      name: "clientEmail",
      type: "email",
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "startTime",
      type: "text",
    },
    {
      name: "duration",
      type: "number",
      defaultValue: 15,
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Call", value: "call" },
        { label: "DM", value: "dm" },
        { label: "Video", value: "video" },
      ],
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
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "meetingLink",
      type: "text",
    },
  ],
};
