import type { GlobalConfig } from "payload";

const linkFields = [
  {
    name: "label",
    type: "text" as const,
  },
  {
    name: "href",
    type: "text" as const,
  },
  {
    name: "sortOrder",
    type: "number" as const,
  },
  {
    name: "visible",
    type: "checkbox" as const,
    defaultValue: true,
  },
];

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: {
    group: "Website",
  },
  fields: [
    {
      name: "headerLinks",
      type: "array",
      fields: linkFields,
    },
    {
      name: "footerLinks",
      type: "array",
      fields: linkFields,
    },
  ],
};
