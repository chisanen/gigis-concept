import type { CollectionConfig } from "payload";

export const Packages: CollectionConfig = {
  slug: "packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "priceDisplay", "isFeatured"],
    group: "Studio",
  },
  fields: [
    {
      name: "category",
      type: "select",
      options: [
        { label: "Content Creation", value: "content_creation" },
        { label: "Photo Booth", value: "photo_booth" },
      ],
    },
    { name: "name", type: "text", required: true },
    { name: "subtitle", type: "text" },
    { name: "priceCents", type: "number" },
    { name: "priceDisplay", type: "text" },
    { name: "priceUnit", type: "text" },
    {
      name: "features",
      type: "array",
      fields: [{ name: "feature", type: "text", required: true }],
    },
    { name: "isFeatured", type: "checkbox", defaultValue: false },
    { name: "sortOrder", type: "number" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};
