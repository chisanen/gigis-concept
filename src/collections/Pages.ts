import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    group: "Website",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "sections",
      type: "array",
      fields: [
        {
          name: "sectionType",
          type: "select",
          options: [
            { label: "Text Block", value: "text" },
            { label: "Image + Text", value: "imageText" },
            { label: "Gallery", value: "gallery" },
            { label: "CTA", value: "cta" },
          ],
        },
        { name: "heading", type: "text" },
        { name: "subheading", type: "text" },
        { name: "body", type: "richText" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "ctaText", type: "text" },
        { name: "ctaLink", type: "text" },
      ],
    },
  ],
};
