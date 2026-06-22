import type { CollectionConfig } from "payload";

export const GalleryImages: CollectionConfig = {
  slug: "gallery-images",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "clientName", "eventDate"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
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
    },
    {
      name: "clientName",
      type: "text",
      admin: {
        condition: (data) => data?.category === "private",
        description: "Client name for private gallery",
      },
    },
    {
      name: "password",
      type: "text",
      admin: {
        condition: (data) => data?.category === "private",
        description: "Password for client to access their photos",
      },
    },
    {
      name: "eventDate",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
