import type { CollectionConfig } from "payload";

export const DiscountCodes: CollectionConfig = {
  slug: "discount-codes",
  admin: {
    useAsTitle: "code",
    group: "Website",
  },
  fields: [
    { name: "code", type: "text", required: true, unique: true },
    { name: "description", type: "text" },
    {
      name: "kind",
      type: "select",
      options: [
        { label: "Percent", value: "percent" },
        { label: "Fixed", value: "fixed" },
      ],
    },
    { name: "amount", type: "number", required: true },
    {
      name: "appliesTo",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Content Creation", value: "content_creation" },
      ],
    },
    { name: "maxRedemptions", type: "number" },
    { name: "redemptions", type: "number", defaultValue: 0 },
    { name: "startsAt", type: "date" },
    { name: "endsAt", type: "date" },
    { name: "isActive", type: "checkbox", defaultValue: true },
  ],
};
