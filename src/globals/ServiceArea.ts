import type { GlobalConfig } from "payload";

export const ServiceArea: GlobalConfig = {
  slug: "service-area",
  label: "Service Area & Travel",
  admin: {
    group: "Operations",
    description: "Travel zone settings. Set your base ZIP, free radius, and per-mile fee for events outside your area.",
  },
  fields: [
    {
      name: "baseZip",
      type: "text",
      defaultValue: "75219",
      admin: { description: "Your home base ZIP code — travel fees are calculated from here" },
    },
    {
      name: "includedRadiusMiles",
      type: "number",
      defaultValue: 25,
      admin: { description: "How many miles you'll travel for free before charging a travel fee" },
    },
    {
      name: "perMileCents",
      type: "number",
      defaultValue: 50,
      admin: { description: "Travel fee per mile beyond the free radius, in cents (e.g. 50 = $0.50/mile)" },
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "USD",
      admin: { description: "Currency code for pricing (e.g. 'USD')" },
    },
  ],
};
