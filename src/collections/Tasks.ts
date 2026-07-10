import type { CollectionConfig } from "payload";

export const Tasks: CollectionConfig = {
  slug: "tasks",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "dueDate", "status", "priority"],
    group: "Studio",
    description: "Your to-do list for managing the studio. HOW TO USE: 1) Click 'Create New'. 2) Enter a title, description, due date, and priority (Low, Normal, High, Urgent). 3) Assign to a team member if applicable. 4) Update status as you complete tasks. TIP: High-priority tasks show in red on the Dashboard. Check your tasks daily to stay on top of deadlines.",
  },
  fields: [
    { name: "title", type: "text", required: true, admin: { description: "What needs to be done? Keep it short and clear" } },
    { name: "dueDate", type: "date", admin: { description: "When should this be finished by?" } },
    {
      name: "status",
      type: "select",
      defaultValue: "open",
      options: [
        { label: "Open", value: "open" },
        { label: "Done", value: "done" },
      ],
      admin: { description: "Is this task still open or already done?" },
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
      admin: { description: "How important is this? Urgent items show at the top" },
    },
    { name: "notes", type: "textarea", admin: { description: "Any extra details or context for this task" } },
  ],
};
