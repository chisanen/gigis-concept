import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "authorName",
    group: "Website",
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "authorName",
      type: "text",
      required: true,
    },
    {
      name: "eventDescription",
      type: "text",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show on homepage",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
