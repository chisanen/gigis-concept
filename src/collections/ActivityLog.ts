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
      admin: { description: "What happened (e.g. 'Lead Created', 'Invoice Sent')" },
    },
    {
      name: "details",
      type: "text",
      admin: { description: "Extra details about the action" },
    },
    {
      name: "relatedCollection",
      type: "text",
      admin: { description: "Which collection this action relates to (e.g. 'leads', 'bookings')" },
    },
    {
      name: "relatedId",
      type: "text",
      admin: { description: "The ID of the related record" },
    },
    {
      name: "performedBy",
      type: "text",
      admin: { description: "Who performed this action" },
    },
    {
      name: "performedAt",
      type: "date",
      admin: { description: "When this action happened" },
    },
  ],
};
