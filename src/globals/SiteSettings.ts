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
            { name: "siteName", type: "text", defaultValue: "Gigi's Concept", admin: { description: "Your business name — shown in the browser tab and across the site" } },
            { name: "tagline", type: "text", defaultValue: "Content Creation & Luxury Photo Booth", admin: { description: "A short tagline that appears under your business name" } },
            { name: "contactEmail", type: "email", defaultValue: "hello@gigisconcept.com", admin: { description: "Your main business email — shown on the website and used for notifications" } },
            { name: "phone", type: "text", admin: { description: "Your business phone number, if you want it displayed on the site" } },
          ],
        },
        {
          label: "Social",
          fields: [
            { name: "instagramUrl", type: "text", admin: { description: "Full URL to your Instagram profile (e.g. https://instagram.com/gigisconcept)" } },
            { name: "instagramHandle", type: "text", admin: { description: "Your Instagram handle without @ (e.g. gigisconcept). Used for the embedded Instagram feed on your gallery page." } },
            { name: "instagramWidgetId", type: "text", admin: { description: "Optional: paste your Elfsight widget ID here for an auto-updating Instagram feed. Get one free at elfsight.com — no credit card needed. It looks like 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'" } },
            { name: "facebookUrl", type: "text", admin: { description: "Full URL to your Facebook page" } },
            { name: "tiktokUrl", type: "text", admin: { description: "Full URL to your TikTok profile" } },
            { name: "showInstagramFeed", type: "checkbox", defaultValue: true, admin: { description: "Show the Instagram feed on your Gallery page" } },
          ],
        },
        {
          label: "Pricing",
          fields: [
            { name: "depositPercent", type: "number", defaultValue: 50, admin: { description: "Deposit percentage required to book (e.g. 50 = 50%). This updates everywhere on the site including the quote calculator" } },
            {
              name: "pricingNote",
              type: "ui",
              admin: {
                components: {
                  Field: "@/components/admin/PricingNote#default",
                },
              },
            },
          ],
        },
        {
          label: "Theme",
          fields: [
            { name: "primaryColor", type: "text", defaultValue: "#3A2D28", admin: { description: "Main brand color used for text and buttons (hex code like '#3A2D28')" } },
            { name: "accentColor", type: "text", defaultValue: "#76220B", admin: { description: "Accent color for highlights and hover effects (hex code)" } },
            { name: "backgroundColor", type: "text", defaultValue: "#F8F5F1", admin: { description: "Background color for the site (hex code)" } },
          ],
        },
        {
          label: "SEO",
          fields: [
            { name: "defaultMetaTitle", type: "text", defaultValue: "Gigi's Concept | Content Creation & Luxury Photo Booth — Dallas TX", admin: { description: "Default page title for search engines — shows in Google results" } },
            { name: "defaultMetaDescription", type: "textarea", defaultValue: "Editorial content and a timeless photo-booth experience in Dallas, Texas. Quietly crafted, beautifully delivered.", admin: { description: "Default description for search engines — shows under the title in Google results" } },
            { name: "googleVerification", type: "text", admin: { description: "Google Search Console verification code — paste the content value from Google here" } },
          ],
        },
        {
          label: "Forms",
          fields: [
            {
              name: "eventTypes",
              type: "array",
              admin: { description: "Event type options shown in the inquiry form dropdown. If empty, defaults will be used" },
              fields: [
                { name: "label", type: "text", required: true },
              ],
            },
            {
              name: "hearAboutOptions",
              type: "array",
              admin: { description: "How did you hear about us options in the inquiry form. If empty, defaults will be used" },
              fields: [
                { name: "label", type: "text", required: true },
              ],
            },
            {
              name: "domain",
              type: "text",
              defaultValue: "https://gigis-concept.vercel.app",
              admin: { description: "Your website domain URL. Used in email links and structured data" },
            },
          ],
        },
      ],
    },
  ],
};
