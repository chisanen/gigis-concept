import type { CollectionConfig } from "payload";

export const Contracts: CollectionConfig = {
  slug: "contracts",
  admin: {
    useAsTitle: "clientName",
    defaultColumns: ["clientName", "status", "sentAt"],
    group: "Studio",
    description: "Client service agreements with e-signature. HOW TO USE: 1) Click 'Create New'. 2) Enter client name, email, and the contract terms. 3) Save to generate a shareable link. 4) Send the link to the client. 5) They can read the terms and sign electronically. 6) The signed status, name, and timestamp are recorded automatically. TIP: Always send the contract before the invoice.",
    components: {
      beforeList: ["@/components/admin/InstructionsBox#InstructionsBox"],
    },
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
