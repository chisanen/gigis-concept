import type { CollectionConfig } from "payload";

export const Tasks: CollectionConfig = {
  slug: "tasks",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "dueDate", "status", "priority"],
    group: "Studio",
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "dueDate", type: "date" },
    {
      name: "status",
      type: "select",
      defaultValue: "open",
      options: [
        { label: "Open", value: "open" },
        { label: "Done", value: "done" },
      ],
    },
    {
      name: "priority",
      type: "select",
      defaultValue: "normal",
      options: [
        { label: "Low", value: "low" },
        { label: "Normal", value: "normal" },
        { label: "High", value: "high" },
        { label: "Urgent", value: "urgent" },
      ],
    },
    { name: "notes", type: "textarea" },
  ],
};
