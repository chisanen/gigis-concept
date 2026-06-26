import type { GlobalConfig } from "payload";

export const ServiceArea: GlobalConfig = {
  slug: "service-area",
  label: "Service Area & Travel",
  admin: {
    group: "Operations",
  },
  fields: [
    {
      name: "baseZip",
      type: "text",
      defaultValue: "75219",
    },
    {
      name: "includedRadiusMiles",
      type: "number",
      defaultValue: 25,
    },
    {
      name: "perMileCents",
      type: "number",
      defaultValue: 50,
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "USD",
    },
  ],
};
