import type { CollectionConfig } from "payload";

export const GalleryImages: CollectionConfig = {
  slug: "gallery-images",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "clientName", "eventDate"],
    group: "Website",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "A title for this image (e.g. 'Smith Wedding - First Dance')" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "Upload the photo here" },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Public", value: "public" },
        { label: "Private (Client)", value: "private" },
      ],
      defaultValue: "public",
      admin: { description: "Public images show on your gallery page. Private images are only for the client" },
    },
    {
      name: "clientName",
      type: "text",
      admin: {
        condition: (data) => data?.category === "private",
        description: "Client's name — so they can find their private gallery",
      },
    },
    {
      name: "password",
      type: "text",
      admin: {
        condition: (data) => data?.category === "private",
        description: "Password the client uses to access their private photos",
      },
    },
    {
      name: "eventDate",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayOnly" },
        description: "When was this photo taken?",
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
