import type { CollectionConfig } from "payload";

export const ActivityLog: CollectionConfig = {
  slug: "activity-log",
  admin: {
    useAsTitle: "action",
    defaultColumns: ["action", "details", "performedAt"],
    group: "Settings",
  },
  access: {
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "action",
      type: "text",
      required: true,
    },
    {
      name: "details",
      type: "text",
    },
    {
      name: "relatedCollection",
      type: "text",
    },
    {
      name: "relatedId",
      type: "text",
    },
    {
      name: "performedBy",
      type: "text",
    },
    {
      name: "performedAt",
      type: "date",
    },
  ],
};
