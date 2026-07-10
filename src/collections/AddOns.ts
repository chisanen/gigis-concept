import type { CollectionConfig } from "payload";

export const AddOns: CollectionConfig = {
  slug: "add-ons",
  admin: {
    useAsTitle: "name",
    group: "Studio",
    description: "Extra services clients can add to their booking. These appear in the quote calculator. HOW TO USE: 1) Click 'Create New'. 2) Enter the name, price in cents, display price, and choose the pricing type (Flat fee, Per Hour, or Per Item). 3) Select which service it applies to: Photo Booth, Content Creation, or All. 4) Add a note if needed (e.g. 'up to $100'). TIP: Common add-ons include extra hours, backdrop upgrades, rush delivery, and on-site assistants.",
  },
  fields: [
    { name: "name", type: "text", required: true, admin: { description: "Name of the add-on shown to clients (e.g. 'Extra Hour', 'Custom Backdrop')" } },
    {
      name: "appliesTo",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Photo Booth", value: "photo_booth" },
        { label: "Content Creation", value: "content_creation" },
      ],
      admin: { description: "Which service does this add-on apply to?" },
    },
    { name: "priceCents", type: "number", admin: { description: "Price in cents (e.g. 5000 = $50). Used for calculations" } },
    { name: "priceDisplay", type: "text", admin: { description: "How the price shows on your website (e.g. '$50')" } },
    {
      name: "unit",
      type: "select",
      options: [
        { label: "Flat", value: "flat" },
        { label: "Per Hour", value: "per_hour" },
        { label: "Per Item", value: "per_item" },
      ],
      admin: { description: "How is this add-on priced? Flat fee, per hour, or per item?" },
    },
    { name: "description", type: "textarea", admin: { description: "A short description of what this add-on includes" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this add-on from your website without deleting it" } },
  ],
};
