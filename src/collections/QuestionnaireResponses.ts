import type { CollectionConfig } from "payload";

export const QuestionnaireResponses: CollectionConfig = {
  slug: "questionnaire-responses",
  admin: {
    useAsTitle: "questionnaireName",
    group: "Studio",
  },
  fields: [
    {
      name: "questionnaireName",
      type: "text",
    },
    {
      name: "bookingRef",
      type: "text",
    },
    {
      name: "answers",
      type: "json",
    },
    {
      name: "submittedAt",
      type: "date",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Reviewed", value: "reviewed" },
      ],
      defaultValue: "pending",
    },
  ],
};
