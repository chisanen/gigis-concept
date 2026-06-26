import type { CollectionConfig } from "payload";

export const Popups: CollectionConfig = {
  slug: "popups",
  admin: {
    useAsTitle: "name",
    group: "Website",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    {
      name: "trigger",
      type: "select",
      options: [
        { label: "On Load", value: "onLoad" },
        { label: "Exit Intent", value: "exitIntent" },
        { label: "Scroll", value: "scroll" },
        { label: "Delay", value: "delay" },
      ],
    },
    { name: "delaySeconds", type: "number" },
    { name: "isActive", type: "checkbox", defaultValue: false },
    { name: "startsAt", type: "date" },
    { name: "endsAt", type: "date" },
  ],
};
