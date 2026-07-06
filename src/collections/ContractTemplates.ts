import type { CollectionConfig } from "payload";

export const ContractTemplates: CollectionConfig = {
  slug: "contract-templates",
  admin: {
    useAsTitle: "name",
    group: "Studio",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Template name (e.g. 'Standard Booking Contract', 'Photo Booth Agreement')" },
    },
    {
      name: "body",
      type: "richText",
      admin: { description: "The contract text — this is used as the starting point when creating a new contract for a client" },
    },
    {
      name: "isDefault",
      type: "checkbox",
      admin: { description: "Use this template automatically for new contracts" },
    },
  ],
};
