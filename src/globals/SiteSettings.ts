import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            { name: "siteName", type: "text", defaultValue: "Gigi's Concept" },
            { name: "tagline", type: "text", defaultValue: "Content Creation & Luxury Photo Booth" },
            { name: "contactEmail", type: "email", defaultValue: "hello@gigisconcept.com" },
            { name: "phone", type: "text" },
          ],
        },
        {
          label: "Social",
          fields: [
            { name: "instagramUrl", type: "text", admin: { description: "Full URL to your Instagram profile (e.g. https://instagram.com/gigisconcept)" } },
            { name: "instagramHandle", type: "text", admin: { description: "Your Instagram handle without @ (e.g. gigisconcept). Used for the embedded Instagram feed on your gallery page." } },
            { name: "facebookUrl", type: "text" },
            { name: "tiktokUrl", type: "text" },
            { name: "showInstagramFeed", type: "checkbox", defaultValue: true, admin: { description: "Show the Instagram feed on your Gallery page" } },
          ],
        },
        {
          label: "Pricing",
          fields: [
            { name: "boothRatePerHour", type: "number", defaultValue: 150 },
            { name: "basicRatePerHour", type: "number", defaultValue: 50 },
            { name: "storytellerPrice", type: "number", defaultValue: 450 },
            { name: "shortEditPrice", type: "number", defaultValue: 30 },
            { name: "longEditPrice", type: "number", defaultValue: 40 },
          ],
        },
        {
          label: "Theme",
          fields: [
            { name: "primaryColor", type: "text", defaultValue: "#3A2D28" },
            { name: "accentColor", type: "text", defaultValue: "#76220B" },
            { name: "backgroundColor", type: "text", defaultValue: "#F8F5F1" },
          ],
        },
        {
          label: "SEO",
          fields: [
            { name: "defaultMetaTitle", type: "text", defaultValue: "Gigi's Concept | Content Creation & Luxury Photo Booth — Dallas TX" },
            { name: "defaultMetaDescription", type: "textarea", defaultValue: "Editorial content and a timeless photo-booth experience in Dallas, Texas. Quietly crafted, beautifully delivered." },
            { name: "googleVerification", type: "text" },
          ],
        },
      ],
    },
  ],
};
