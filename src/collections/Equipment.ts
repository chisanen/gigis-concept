import type { CollectionConfig } from "payload";

export const Equipment: CollectionConfig = {
  slug: "equipment",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "status"],
    group: "Operations",
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Booth", value: "booth" },
        { label: "Camera", value: "camera" },
        { label: "Backdrop", value: "backdrop" },
        { label: "Prop", value: "prop" },
        { label: "Lighting", value: "lighting" },
      ],
    },
    { name: "identifier", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "available",
      options: [
        { label: "Available", value: "available" },
        { label: "In Repair", value: "in_repair" },
        { label: "Retired", value: "retired" },
      ],
    },
    { name: "notes", type: "textarea" },
  ],
};
