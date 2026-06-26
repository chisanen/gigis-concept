import type { CollectionConfig } from "payload";

export const Contracts: CollectionConfig = {
  slug: "contracts",
  admin: {
    useAsTitle: "clientName",
    defaultColumns: ["clientName", "status", "sentAt"],
    group: "Studio",
  },
  fields: [
    { name: "bookingRef", type: "text" },
    { name: "clientName", type: "text", required: true },
    { name: "bodyRendered", type: "richText" },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Sent", value: "sent" },
        { label: "Signed", value: "signed" },
        { label: "Countersigned", value: "countersigned" },
      ],
    },
    { name: "clientSignatureName", type: "text" },
    { name: "clientSignedAt", type: "date" },
    { name: "sentAt", type: "date" },
  ],
};
