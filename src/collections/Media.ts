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
    description: "Your image and video library. Drag and drop files here to upload them. All images uploaded here can be used on any page, in popups, blog posts, and the gallery. Always add a description (alt text) for better Google rankings.",
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
    {
      name: "isAiGenerated",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Automatically set when an image is created by AI generation" },
    },
    {
      name: "aiPrompt",
      type: "textarea",
      admin: {
        description: "The prompt used to generate this image",
        condition: (data: Record<string, unknown>) => data?.isAiGenerated === true,
      },
    },
  ],
};
