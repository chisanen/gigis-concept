import type { CollectionConfig } from "payload";

export const Equipment: CollectionConfig = {
  slug: "equipment",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "status"],
    group: "Operations",
    description: "Your gear inventory. Track cameras, lights, backdrops, and other equipment.",
  },
  fields: [
    { name: "name", type: "text", required: true, admin: { description: "What is this piece of equipment called? (e.g. 'Ring Light #2', 'Mirror Booth')" } },
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
      admin: { description: "What category does this equipment fall under?" },
    },
    { name: "identifier", type: "text", admin: { description: "Serial number or your own label to identify this item (e.g. 'BOOTH-001')" } },
    {
      name: "status",
      type: "select",
      defaultValue: "available",
      options: [
        { label: "Available", value: "available" },
        { label: "In Repair", value: "in_repair" },
        { label: "Retired", value: "retired" },
      ],
      admin: { description: "Is this equipment ready to use, being repaired, or retired?" },
    },
    { name: "notes", type: "textarea", admin: { description: "Any notes about condition, repair history, or special instructions" } },
  ],
};
