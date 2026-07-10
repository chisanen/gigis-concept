import type { CollectionConfig } from "payload";

export const DiscountCodes: CollectionConfig = {
  slug: "discount-codes",
  admin: {
    useAsTitle: "code",
    group: "Website",
    description: "Promo codes for discounts. Create codes clients enter when booking. Set discount as percentage or dollar amount.",
  },
  fields: [
    { name: "code", type: "text", required: true, unique: true, admin: { description: "The code clients type in (e.g. 'WEDDING20', 'SUMMER50'). Make it memorable!" } },
    { name: "description", type: "text", admin: { description: "Internal note about this code — only you see this (e.g. 'Summer 2025 promo')" } },
    {
      name: "kind",
      type: "select",
      options: [
        { label: "Percent", value: "percent" },
        { label: "Fixed", value: "fixed" },
      ],
      admin: { description: "Is this a percentage off or a fixed dollar amount off?" },
    },
    { name: "amount", type: "number", required: true, admin: { description: "The discount amount — either a percentage (e.g. 20 = 20% off) or cents (e.g. 5000 = $50 off)" } },
    {
      name: "appliesTo",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Content Creation", value: "content_creation" },
      ],
      admin: { description: "Which services can this code be used for?" },
    },
    { name: "maxRedemptions", type: "number", admin: { description: "Maximum number of times this code can be used. Leave empty for unlimited" } },
    { name: "redemptions", type: "number", defaultValue: 0, admin: { description: "How many times this code has been used so far (updates automatically)" } },
    { name: "startsAt", type: "date", admin: { description: "When does this code become active? Leave empty to start immediately" } },
    { name: "endsAt", type: "date", admin: { description: "When does this code expire? Leave empty for no expiration" } },
    { name: "isActive", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to disable this code without deleting it" } },
  ],
};
