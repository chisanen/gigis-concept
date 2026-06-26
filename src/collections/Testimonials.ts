import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "authorName",
    group: "Website",
    defaultColumns: ["authorName", "rating", "status", "eventDescription", "featured"],
  },
  access: {
    create: () => true,
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
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "pending",
    },
    {
      name: "source",
      type: "select",
      options: [
        { label: "Website", value: "website" },
        { label: "Requested", value: "requested" },
        { label: "Manual", value: "manual" },
      ],
      defaultValue: "website",
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
