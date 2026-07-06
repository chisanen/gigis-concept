import type { CollectionConfig } from "payload";

export const Contracts: CollectionConfig = {
  slug: "contracts",
  admin: {
    useAsTitle: "clientName",
    defaultColumns: ["clientName", "status", "sentAt"],
    group: "Studio",
  },
  fields: [
    { name: "bookingRef", type: "text", admin: { description: "Link to the related booking (enter the booking ID or name)" } },
    { name: "clientName", type: "text", required: true, admin: { description: "Client's full name as it appears on the contract" } },
    { name: "bodyRendered", type: "richText", admin: { description: "The full contract text — you can edit this for each client" } },
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
      admin: { description: "Current signing status of this contract" },
    },
    { name: "clientSignatureName", type: "text", admin: { description: "The name the client typed as their signature" } },
    { name: "clientSignedAt", type: "date", admin: { description: "When did the client sign?" } },
    { name: "sentAt", type: "date", admin: { description: "When was this contract sent to the client?" } },
  ],
};
