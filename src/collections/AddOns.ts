import type { CollectionConfig } from "payload";

export const AddOns: CollectionConfig = {
  slug: "add-ons",
  admin: {
    useAsTitle: "name",
    group: "Studio",
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "appliesTo",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Content Creation", value: "content_creation" },
      ],
    },
    { name: "priceCents", type: "number" },
    { name: "priceDisplay", type: "text" },
    {
      name: "unit",
      type: "select",
      options: [
        { label: "Flat", value: "flat" },
        { label: "Per Hour", value: "per_hour" },
        { label: "Per Item", value: "per_item" },
      ],
    },
    { name: "description", type: "textarea" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};
