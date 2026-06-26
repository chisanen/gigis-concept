import type { CollectionConfig } from "payload";

export const Questionnaires: CollectionConfig = {
  slug: "questionnaires",
  admin: {
    useAsTitle: "name",
    group: "Studio",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "serviceType",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Content Creation", value: "content_creation" },
        { label: "Photo Booth", value: "photo_booth" },
      ],
    },
    {
      name: "fields",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
        },
        {
          name: "type",
          type: "select",
          options: [
            { label: "Text", value: "text" },
            { label: "Textarea", value: "textarea" },
            { label: "Select", value: "select" },
            { label: "Date", value: "date" },
            { label: "Checkbox", value: "checkbox" },
          ],
        },
        {
          name: "options",
          type: "text",
          admin: {
            description: "Comma-separated for select type",
          },
        },
        {
          name: "required",
          type: "checkbox",
        },
      ],
    },
    {
      name: "isDefault",
      type: "checkbox",
    },
  ],
};
