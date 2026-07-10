import type { CollectionConfig } from "payload";

export const Team: CollectionConfig = {
  slug: "team",
  admin: {
    useAsTitle: "name",
    group: "Operations",
    description: "Your team members. Add second shooters, booth attendants, editors. Assign them to bookings.",
  },
  fields: [
    { name: "name", type: "text", required: true, admin: { description: "Team member's full name" } },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Lead", value: "lead" },
        { label: "Second Shooter", value: "second_shooter" },
        { label: "Booth Attendant", value: "booth_attendant" },
        { label: "Editor", value: "editor" },
      ],
      admin: { description: "What role does this person fill on your team?" },
    },
    { name: "email", type: "email", admin: { description: "Their email — used for notifications and assignments" } },
    { name: "phone", type: "text", admin: { description: "Best phone number to reach them on event day" } },
    {
      name: "color",
      type: "text",
      admin: { description: "Calendar color hex (e.g. '#FF5733') — helps you tell team members apart on the calendar" },
    },
    { name: "isActive", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this person from scheduling without removing them" } },
  ],
};
