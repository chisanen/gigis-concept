import type { CollectionConfig } from "payload";

export const Team: CollectionConfig = {
  slug: "team",
  admin: {
    useAsTitle: "name",
    group: "Operations",
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Lead", value: "lead" },
        { label: "Second Shooter", value: "second_shooter" },
        { label: "Booth Attendant", value: "booth_attendant" },
        { label: "Editor", value: "editor" },
      ],
    },
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    {
      name: "color",
      type: "text",
      admin: { description: "Calendar color hex" },
    },
    { name: "isActive", type: "checkbox", defaultValue: true },
  ],
};
