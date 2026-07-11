import type { CollectionConfig } from "payload";

export const Broadcasts: CollectionConfig = {
  slug: "broadcasts",
  admin: {
    useAsTitle: "subject",
    group: "Operations",
    description: "Send bulk emails to your client list. HOW TO USE: 1) Click 'Create New'. 2) Write your email subject and body. 3) Choose your recipients (all clients, or a filtered list). 4) Preview, then send. TIP: Send seasonal promotions (holiday mini-sessions, summer specials) 4-6 weeks before the season. Keep emails short with one clear call-to-action.",
    components: {
      beforeList: ["@/components/admin/InstructionsBox#InstructionsBox"],
    },
  },
  fields: [
    {
      name: "subject",
      type: "text",
      required: true,
      admin: { description: "Email subject line — make it catchy so people open it!" },
    },
    {
      name: "body",
      type: "richText",
      admin: { description: "The email content you want to send to your audience" },
    },
    {
      name: "audience",
      type: "select",
      options: [
        { label: "All Clients", value: "all_clients" },
        { label: "Past Clients", value: "past_clients" },
        { label: "Leads", value: "leads" },
        { label: "Tagged", value: "tagged" },
      ],
      admin: { description: "Who should receive this broadcast?" },
    },
    {
      name: "scheduledAt",
      type: "date",
      admin: { description: "When should this email go out? Leave empty to send manually" },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Scheduled", value: "scheduled" },
        { label: "Sent", value: "sent" },
      ],
      defaultValue: "draft",
      admin: { description: "Current status of this broadcast" },
    },
    {
      name: "sentCount",
      type: "number",
      defaultValue: 0,
      admin: { description: "How many emails were sent (updates automatically)" },
    },
  ],
};
