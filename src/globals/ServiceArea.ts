import type { GlobalConfig } from "payload";

export const ServiceArea: GlobalConfig = {
  slug: "service-area",
  label: "Service Area & Travel",
  admin: {
    group: "Operations",
    description: "Your travel zone and fee settings. HOW TO USE: 1) Set your base ZIP code (where you are located). 2) Set the free radius in miles (events within this distance have no travel fee). 3) Set the per-mile fee in cents for events beyond the free radius (e.g. 50 = $0.50/mile). TIP: The travel fee shows automatically in the FAQ and quote calculator on your website.",
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
