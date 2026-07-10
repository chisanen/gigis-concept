import type { CollectionConfig } from "payload";

export const GalleryImages: CollectionConfig = {
  slug: "gallery-images",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "collectionName", "eventDate"],
    group: "Website",
    description: "Client gallery photos and videos. Group images by event using the Collection Name field. Set Public for your portfolio, Password Protected for client galleries, or Private for internal use. Share galleries with clients by copying the link.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "A title for this image or video (e.g. 'Smith Wedding - First Dance')" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        components: { afterInput: ["@/components/admin/AIImageButton#AIImageButton"] },
        description: "Upload a photo or video here. Drag and drop works! Supports JPG, PNG, MP4, MOV, and more.",
      },
    },
    {
      name: "collectionName",
      type: "text",
      admin: { description: "Group images into a collection (e.g. 'Smith Wedding 2026', 'Johnson Birthday'). Images with the same collection name are grouped together." },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Public", value: "public" },
        { label: "Password Protected", value: "password" },
        { label: "Private (Client Only)", value: "private" },
      ],
      defaultValue: "public",
      admin: { description: "Public = anyone can see. Password = visitors need a code you share. Private = only that client through their portal." },
    },
    {
      name: "password",
      type: "text",
      admin: {
        condition: (data) => data?.category === "password",
        description: "The password visitors enter to view this collection. Share this with your client.",
      },
    },
    {
      name: "clientName",
      type: "text",
      admin: {
        condition: (data) => data?.category === "private" || data?.category === "password",
        description: "Client's name — helps you find their gallery in the list",
      },
    },
    {
      name: "clientEmail",
      type: "email",
      admin: {
        condition: (data) => data?.category === "private" || data?.category === "password",
        description: "Client's email — used to send them the gallery link",
      },
    },
    {
      name: "eventDate",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayOnly" },
        description: "When was this photo/video taken?",
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
