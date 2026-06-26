import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Studio",
  },
  fields: [
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "company",
      type: "text",
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "lifetimeValueCents",
      type: "number",
      defaultValue: 0,
    },
  ],
};
