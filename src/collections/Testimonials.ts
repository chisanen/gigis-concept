import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "authorName",
    group: "Website",
    defaultColumns: ["authorName", "rating", "status", "eventDescription", "featured"],
    description: "Client reviews shown on your website. HOW TO USE: 1) Reviews submitted on your website appear here as 'Pending'. 2) Click a review to read it, then change Status to 'Approved' to make it visible. 3) Check 'Featured' to show it on the homepage carousel. 4) To add a review manually, click 'Create New' and fill in the client's name, event, and quote. TIP: Feature your 3-5 best reviews for the homepage.",
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
      admin: { description: "What the client said — their testimonial in their own words" },
    },
    {
      name: "authorName",
      type: "text",
      required: true,
      admin: { description: "Client's name as it will appear on your website" },
    },
    {
      name: "eventDescription",
      type: "text",
      admin: { description: "Brief description of their event (e.g. 'Spring Wedding 2025', 'Corporate Gala')" },
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: { description: "Star rating from 1 to 5" },
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
      admin: { description: "Only approved testimonials show on your website" },
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
      admin: { description: "How was this testimonial collected? Website form, email request, or manually entered" },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show this testimonial on the homepage — only feature your best ones!",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: { description: "Controls display order — lower numbers appear first" },
    },
  ],
};
