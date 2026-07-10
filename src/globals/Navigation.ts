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
    description: "Control your website's navigation menu. HOW TO USE: 1) Add links to 'Header Links' (top navigation bar) and 'Footer Links' (bottom of every page). 2) Each link needs a label (text shown) and href (URL path like '/about'). 3) Set Sort Order to control the order (lower numbers appear first). 4) Uncheck 'Visible' to hide a link without deleting it. TIP: Keep the header to 5-7 links max for a clean look.",
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
