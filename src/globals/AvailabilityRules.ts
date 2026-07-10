import type { GlobalConfig } from "payload";

export const AvailabilityRules: GlobalConfig = {
  slug: "availability-rules",
  label: "Availability Rules",
  admin: {
    group: "Operations",
    description: "Your business hours and blocked dates. HOW TO USE: 1) Set which days of the week you are available. 2) Set your start and end times for each day. 3) Set buffer time between appointments (in minutes). 4) Add blocked dates for holidays, vacations, and personal days. TIP: Block out dates at least 2 weeks in advance so clients cannot book during your time off.",
  },
  fields: [
    {
      name: "workingDays",
      type: "array",
      admin: { description: "Your available days and hours — clients can only book during these windows" },
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
          admin: { description: "Which day of the week" },
        },
        {
          name: "startTime",
          type: "text",
          defaultValue: "09:00",
          admin: { description: "Earliest time you're available (24-hour format, e.g. '09:00')" },
        },
        {
          name: "endTime",
          type: "text",
          defaultValue: "18:00",
          admin: { description: "Latest time you're available (24-hour format, e.g. '18:00')" },
        },
      ],
    },
    {
      name: "slotLengthMinutes",
      type: "number",
      defaultValue: 15,
      admin: { description: "Length of each booking slot in minutes (e.g. 15, 30, 60)" },
    },
    {
      name: "bufferMinutes",
      type: "number",
      defaultValue: 15,
      admin: { description: "Buffer time between appointments in minutes — gives you breathing room" },
    },
    {
      name: "blackoutDates",
      type: "array",
      admin: { description: "Dates you're unavailable — holidays, vacations, personal days, etc." },
      fields: [
        {
          name: "date",
          type: "date",
          admin: { description: "The date you're unavailable" },
        },
        {
          name: "reason",
          type: "text",
          admin: { description: "Why you're unavailable (e.g. 'Christmas', 'Vacation')" },
        },
      ],
    },
  ],
};
