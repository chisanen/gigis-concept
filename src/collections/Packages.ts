import type { CollectionConfig } from "payload";

export const Packages: CollectionConfig = {
  slug: "packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "priceDisplay", "badge", "sortOrder"],
    group: "Studio",
    description: "Your service packages and pricing. Changes here update the pricing page, quote calculator, and services page automatically. HOW TO USE: 1) Click 'Create New' or edit an existing package. 2) Choose the category (Content Creation or Photo Booth). 3) Set the name, price in cents (e.g. 29000 = $290), and display price (e.g. '$290'). 4) Add features that are included. 5) Check 'Is Featured' and add a badge (e.g. 'Popular') to highlight a package. 6) Uncheck 'Is Visible' to hide without deleting. TIP: Price is in CENTS, not dollars.",
    components: {
      beforeList: ["@/components/admin/InstructionsBox#InstructionsBox"],
    },
  },
  fields: [
    {
      name: "category",
      type: "select",
      options: [
        { label: "Content Creation", value: "content_creation" },
        { label: "Photo Booth", value: "photo_booth" },
      ],
      admin: { description: "Which service does this package belong to?" },
    },
    { name: "name", type: "text", required: true, admin: { description: "Package name shown to clients (e.g. 'Storyteller', 'Elegant Booth')" } },
    { name: "subtitle", type: "text", admin: { description: "A short tagline under the package name (e.g. 'Perfect for intimate events')" } },
    { name: "priceCents", type: "number", admin: { description: "Price in cents (e.g. 29000 = $290). This is used for calculations" } },
    { name: "priceDisplay", type: "text", admin: { description: "How the price shows on your website (e.g. '$290')" } },
    { name: "priceUnit", type: "text", admin: { description: "Label after the price (e.g. '/HR', 'FLAT', '3-HR MIN')" } },
    {
      name: "features",
      type: "array",
      admin: { description: "List of what's included — each line shows as a bullet point" },
      fields: [{ name: "feature", type: "text", required: true, admin: { description: "One feature or perk included in this package" } }],
    },
    { name: "isFeatured", type: "checkbox", defaultValue: false, admin: { description: "Highlight this package with a 'Popular' or special badge" } },
    { name: "badge", type: "text", admin: { description: "Badge text shown on featured packages (e.g. 'Popular', 'Wedding Favorite')" } },
    { name: "sortOrder", type: "number", admin: { description: "Controls the display order — lower numbers appear first" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this package from your website without deleting it" } },
  ],
};
