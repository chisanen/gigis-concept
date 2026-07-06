import type { GlobalConfig } from "payload";

const linkFields = [
  {
    name: "label",
    type: "text" as const,
    admin: { description: "The text visitors see (e.g. 'About', 'Services', 'Contact')" },
  },
  {
    name: "href",
    type: "text" as const,
    admin: { description: "Where this link goes (e.g. '/about', '/services', '/contact')" },
  },
  {
    name: "sortOrder",
    type: "number" as const,
    admin: { description: "Controls the order — lower numbers appear first" },
  },
  {
    name: "visible",
    type: "checkbox" as const,
    defaultValue: true,
    admin: { description: "Uncheck to hide this link without removing it" },
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
      admin: { description: "Links that appear in the top navigation bar" },
      fields: linkFields,
    },
    {
      name: "footerLinks",
      type: "array",
      admin: { description: "Links that appear in the footer at the bottom of every page" },
      fields: linkFields,
    },
  ],
};
