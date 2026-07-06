import type { CollectionConfig } from "payload";

export const Popups: CollectionConfig = {
  slug: "popups",
  admin: {
    useAsTitle: "name",
    group: "Website",
  },
  fields: [
    { name: "name", type: "text", required: true, admin: { description: "Internal name for this popup — only you see this (e.g. 'Summer Sale Banner')" } },
    { name: "heading", type: "text", admin: { description: "Bold headline visitors see first" } },
    { name: "body", type: "textarea", admin: { description: "The main message of your popup" } },
    { name: "ctaLabel", type: "text", admin: { description: "Button text (e.g. 'Book Now', 'Get 20% Off')" } },
    { name: "ctaHref", type: "text", admin: { description: "Where should the button link to? (e.g. '/contact', '/services')" } },
    {
      name: "trigger",
      type: "select",
      options: [
        { label: "On Load", value: "onLoad" },
        { label: "Exit Intent", value: "exitIntent" },
        { label: "Scroll", value: "scroll" },
        { label: "Delay", value: "delay" },
      ],
      admin: { description: "When should this popup appear? On page load, when they try to leave, after scrolling, or after a delay" },
    },
    { name: "delaySeconds", type: "number", admin: { description: "If trigger is 'Delay', how many seconds to wait before showing" } },
    { name: "isActive", type: "checkbox", defaultValue: false, admin: { description: "Turn this on to make the popup live on your website" } },
    { name: "startsAt", type: "date", admin: { description: "Optional start date — popup won't show before this date" } },
    { name: "endsAt", type: "date", admin: { description: "Optional end date — popup stops showing after this date" } },
  ],
};
