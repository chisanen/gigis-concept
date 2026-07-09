import type { CollectionConfig } from "payload";

export const Questionnaires: CollectionConfig = {
  slug: "questionnaires",
  admin: {
    useAsTitle: "name",
    group: "Operations",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Name of this questionnaire (e.g. 'Wedding Details', 'Photo Booth Preferences')" },
    },
    {
      name: "serviceType",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Content Creation", value: "content_creation" },
        { label: "Photo Booth", value: "photo_booth" },
      ],
      admin: { description: "Which service is this questionnaire for? Choose 'All' if it applies to everything" },
    },
    {
      name: "fields",
      type: "array",
      admin: { description: "The questions you want to ask — add as many as you need" },
      fields: [
        {
          name: "label",
          type: "text",
          admin: { description: "The question text your client will see" },
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
          admin: { description: "What kind of answer do you expect? Short text, long text, dropdown, date, or yes/no" },
        },
        {
          name: "options",
          type: "text",
          admin: {
            description: "Comma-separated choices for dropdown questions (e.g. 'Indoor, Outdoor, Both')",
          },
        },
        {
          name: "required",
          type: "checkbox",
          admin: { description: "Must the client answer this question before submitting?" },
        },
      ],
    },
    {
      name: "isDefault",
      type: "checkbox",
      admin: { description: "Use this questionnaire automatically for new bookings of this service type" },
    },
  ],
};
