import type { GlobalConfig } from "payload";

export const AvailabilityRules: GlobalConfig = {
  slug: "availability-rules",
  label: "Availability Rules",
  admin: {
    group: "Operations",
  },
  fields: [
    {
      name: "workingDays",
      type: "array",
      fields: [
        {
          name: "day",
          type: "select",
          options: [
            { label: "Mon", value: "Mon" },
            { label: "Tue", value: "Tue" },
            { label: "Wed", value: "Wed" },
            { label: "Thu", value: "Thu" },
            { label: "Fri", value: "Fri" },
            { label: "Sat", value: "Sat" },
            { label: "Sun", value: "Sun" },
          ],
        },
        {
          name: "startTime",
          type: "text",
          defaultValue: "09:00",
        },
        {
          name: "endTime",
          type: "text",
          defaultValue: "18:00",
        },
      ],
    },
    {
      name: "slotLengthMinutes",
      type: "number",
      defaultValue: 15,
    },
    {
      name: "bufferMinutes",
      type: "number",
      defaultValue: 15,
    },
    {
      name: "blackoutDates",
      type: "array",
      fields: [
        {
          name: "date",
          type: "date",
        },
        {
          name: "reason",
          type: "text",
        },
      ],
    },
  ],
};
