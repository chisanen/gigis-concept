import type { CollectionConfig } from "payload";

export const Packages: CollectionConfig = {
  slug: "packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "priceDisplay", "isHourly", "badge", "sortOrder"],
    group: "Studio",
    description: "Your service packages and pricing. Changes here automatically update the pricing page, quote calculator, and services page. Set prices in cents (e.g. 29000 = $290). Check 'Is Hourly' for per-hour rates.",
  },
  fields: [
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Content Creation", value: "content_creation" },
        { label: "Photo Booth", value: "photo_booth" },
      ],
      admin: { description: "Which service does this package belong to?" },
    },
    { name: "name", type: "text", required: true, admin: { description: "Package name shown to clients (e.g. 'Storyteller', 'Elegant Booth')" } },
    { name: "subtitle", type: "text", admin: { description: "A short tagline under the package name (e.g. 'Perfect for intimate events')" } },
    { name: "shortDescription", type: "textarea", admin: { description: "A brief one-line summary used in the quote calculator (e.g. '4-hr shoot, 3 long + 2 short videos, 48-hr delivery')" } },
    { name: "priceCents", type: "number", required: true, admin: { description: "Price in cents (e.g. 29000 = $290). Used for all price calculations across the site" } },
    { name: "priceDisplay", type: "text", required: true, admin: { description: "How the price shows on your website (e.g. '$290')" } },
    { name: "priceUnit", type: "text", admin: { description: "Label after the price (e.g. '/HR', 'FLAT', '3-HR MIN')" } },
    { name: "isHourly", type: "checkbox", defaultValue: false, admin: { description: "Check if this is an hourly rate (price will be multiplied by hours in the quote calculator)" } },
    { name: "minimumHours", type: "number", admin: { description: "Minimum hours required for hourly packages (e.g. 2). Leave blank for flat-rate packages", condition: (data) => data?.isHourly === true } },
    {
      name: "features",
      type: "array",
      admin: { description: "List of what's included, each line shows as a bullet point" },
      fields: [{ name: "feature", type: "text", required: true, admin: { description: "One feature or perk included in this package" } }],
    },
    { name: "isFeatured", type: "checkbox", defaultValue: false, admin: { description: "Highlight this package with a 'Popular' or special badge" } },
    { name: "badge", type: "text", admin: { description: "Badge text shown on featured packages (e.g. 'Popular', 'Wedding Favorite')" } },
    { name: "sortOrder", type: "number", admin: { description: "Controls the display order, lower numbers appear first" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this package from your website without deleting it" } },
  ],
};
