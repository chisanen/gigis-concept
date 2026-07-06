import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 300, height: 300, position: "centre" },
      { name: "card", width: 600, height: 450, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
  },
  admin: {
    useAsTitle: "alt",
    group: "Website",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image in a few words — this helps with accessibility and SEO (e.g. 'Bride and groom first dance')" },
    },
  ],
};
