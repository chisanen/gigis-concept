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
      admin: { description: "Which questionnaire was this response for?" },
    },
    {
      name: "bookingRef",
      type: "text",
      admin: { description: "The booking this response is linked to" },
    },
    {
      name: "answers",
      type: "json",
      admin: { description: "The client's answers in JSON format (filled in automatically from the form)" },
    },
    {
      name: "submittedAt",
      type: "date",
      admin: { description: "When the client submitted their answers" },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Reviewed", value: "reviewed" },
      ],
      defaultValue: "pending",
      admin: { description: "Have you reviewed this response yet?" },
    },
  ],
};
