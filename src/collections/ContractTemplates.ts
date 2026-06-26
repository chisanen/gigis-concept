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
    },
    {
      name: "body",
      type: "richText",
    },
    {
      name: "isDefault",
      type: "checkbox",
    },
  ],
};
