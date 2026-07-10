import type { CollectionConfig } from "payload";

export const AddOns: CollectionConfig = {
  slug: "add-ons",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "appliesTo", "priceDisplay", "unit", "sortOrder"],
    group: "Studio",
  },
  fields: [
    { name: "name", type: "text", required: true, admin: { description: "Name of the add-on shown to clients (e.g. 'Extra Hour', 'Custom Backdrop')" } },
    {
      name: "appliesTo",
      type: "select",
      required: true,
      options: [
        { label: "All Services", value: "all" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Content Creation", value: "content_creation" },
      ],
      admin: { description: "Which service does this add-on apply to?" },
    },
    { name: "priceCents", type: "number", required: true, admin: { description: "Price in cents (e.g. 5000 = $50). Used for all calculations across the site" } },
    { name: "priceDisplay", type: "text", required: true, admin: { description: "How the price shows on your website (e.g. '$50')" } },
    {
      name: "unit",
      type: "select",
      required: true,
      options: [
        { label: "Flat", value: "flat" },
        { label: "Per Hour", value: "per_hour" },
        { label: "Per Item", value: "per_item" },
      ],
      admin: { description: "How is this add-on priced? Flat fee, per hour, or per item?" },
    },
    { name: "note", type: "text", admin: { description: "Optional note shown next to the price (e.g. 'up to $100')" } },
    { name: "description", type: "textarea", admin: { description: "A short description of what this add-on includes" } },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { description: "Controls display order, lower numbers appear first" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this add-on from your website without deleting it" } },
  ],
};
