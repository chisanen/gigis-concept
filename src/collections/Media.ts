import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      { name: "thumbnail", width: 300, height: 300, position: "centre" },
      { name: "card", width: 600, height: 450, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
    group: "Website",
    description: "Your image and video library. All uploads go here. HOW TO USE: 1) Click 'Create New' or drag files directly into this page to upload. 2) Add a description (alt text) to every image for better Google rankings and accessibility. 3) Choose the type: Photo, Video, or Logo. 4) Once uploaded, images can be selected from any image field on other pages. TIP: Use high-quality images (at least 1600px wide) for best results on the website.",
    components: {
      beforeList: ["@/components/admin/InstructionsBox#InstructionsBox"],
    },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image or video in a few words — helps with accessibility and SEO (e.g. 'Bride and groom first dance')" },
    },
    {
      name: "caption",
      type: "text",
      admin: { description: "Optional caption shown below the image/video" },
    },
    {
      name: "kind",
      type: "select",
      options: [
        { label: "Photo", value: "image" },
        { label: "Video", value: "video" },
        { label: "Logo", value: "logo" },
      ],
      defaultValue: "image",
      admin: { description: "What type of file is this?" },
    },
  ],
};
