import type { CollectionConfig } from "payload";

export const Popups: CollectionConfig = {
  slug: "popups",
  admin: {
    useAsTitle: "name",
    group: "Website",
    description: "Promotional popups that appear on your website. Create a popup with a heading, message, image, and call-to-action button. Set the trigger (on page load, after delay, on scroll, or when leaving). Toggle Active to turn it on or off.",
    defaultColumns: ["name", "heading", "isActive", "trigger"],
  },
  fields: [
    { name: "name", type: "text", required: true, admin: { description: "Internal name for this popup — only you see this (e.g. 'Summer Sale Banner')" } },
    { name: "heading", type: "text", admin: { description: "Bold headline visitors see first (e.g. 'Limited Time Offer!')" } },
    { name: "body", type: "textarea", admin: { description: "The main message of your popup — describe the offer or promotion" } },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional image to display in the popup — makes it more eye-catching",
        components: { afterInput: ["@/components/admin/AIImageButton#AIImageButton"] },
      },
    },
    {
      name: "offerLabel",
      type: "text",
      admin: { description: "Short offer text like '10% OFF' or 'FREE UPGRADE' — shown as a badge" },
    },
    {
      name: "discountCode",
      type: "text",
      admin: { description: "Link to a discount code (e.g. 'PHOTO10'). The code must exist in Discount Codes to work." },
    },
    { name: "ctaLabel", type: "text", admin: { description: "Button text (e.g. 'Book Now', 'Claim Offer')" } },
    { name: "ctaHref", type: "text", admin: { description: "Where the button links to (e.g. '/pricing?code=PHOTO10')" } },
    {
      name: "trigger",
      type: "select",
      defaultValue: "delay",
      options: [
        { label: "On Page Load", value: "onLoad" },
        { label: "Exit Intent (when they try to leave)", value: "exitIntent" },
        { label: "After Scrolling", value: "scroll" },
        { label: "After Delay", value: "delay" },
      ],
      admin: { description: "When should this popup appear?" },
    },
    { name: "delaySeconds", type: "number", defaultValue: 5, admin: { description: "If trigger is 'Delay', how many seconds to wait (default 5)" } },
    {
      name: "frequency",
      type: "select",
      defaultValue: "session",
      options: [
        { label: "Once per session", value: "session" },
        { label: "Once per day", value: "day" },
        { label: "Every visit", value: "always" },
      ],
      admin: { description: "How often should the same visitor see this popup?" },
    },
    { name: "isActive", type: "checkbox", defaultValue: false, admin: { description: "Turn ON to make this popup live. Turn OFF to disable it without deleting." } },
    { name: "startsAt", type: "date", admin: { description: "Optional: popup won't show before this date" } },
    { name: "endsAt", type: "date", admin: { description: "Optional: popup stops showing after this date" } },
  ],
};
