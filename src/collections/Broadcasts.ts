import type { CollectionConfig } from "payload";

export const Broadcasts: CollectionConfig = {
  slug: "broadcasts",
  admin: {
    useAsTitle: "subject",
    group: "Operations",
  },
  fields: [
    {
      name: "subject",
      type: "text",
      required: true,
    },
    {
      name: "body",
      type: "richText",
    },
    {
      name: "audience",
      type: "select",
      options: [
        { label: "All Clients", value: "all_clients" },
        { label: "Past Clients", value: "past_clients" },
        { label: "Leads", value: "leads" },
        { label: "Tagged", value: "tagged" },
      ],
    },
    {
      name: "scheduledAt",
      type: "date",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Scheduled", value: "scheduled" },
        { label: "Sent", value: "sent" },
      ],
      defaultValue: "draft",
    },
    {
      name: "sentCount",
      type: "number",
      defaultValue: 0,
    },
  ],
};
