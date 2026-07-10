import type { CollectionConfig } from "payload";

export const Automations: CollectionConfig = {
  slug: "automations",
  admin: {
    useAsTitle: "name",
    group: "Operations",
    description: "Automatic actions that fire when things happen, like auto-sending a thank you email on new inquiries.",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "A friendly name for this automation (e.g. 'Welcome Email for New Leads')" },
    },
    {
      name: "trigger",
      type: "select",
      options: [
        { label: "Lead Created", value: "lead_created" },
        { label: "Quote Accepted", value: "quote_accepted" },
        { label: "Booking Confirmed", value: "booking_confirmed" },
        { label: "Deposit Paid", value: "deposit_paid" },
        { label: "Days Before Event", value: "days_before_event" },
        { label: "Event Completed", value: "event_completed" },
        { label: "Gallery Delivered", value: "gallery_delivered" },
        { label: "Payment Received", value: "payment_received" },
        { label: "Hold Expired", value: "hold_expired" },
      ],
      admin: { description: "What event should kick off this automation?" },
    },
    {
      name: "offsetDays",
      type: "number",
      admin: {
        description: "How many days before/after the event to trigger (e.g. 3 = three days before)",
        condition: (_data, siblingData) => {
          return (
            typeof siblingData?.trigger === "string" &&
            siblingData.trigger.includes("days")
          );
        },
      },
    },
    {
      name: "actions",
      type: "array",
      admin: { description: "What should happen when this automation fires? Add one or more actions" },
      fields: [
        {
          name: "type",
          type: "select",
          options: [
            { label: "Send Email", value: "send_email" },
            { label: "Create Task", value: "create_task" },
            { label: "Notify Owner", value: "notify_owner" },
            { label: "Move Stage", value: "move_stage" },
          ],
          admin: { description: "What kind of action is this?" },
        },
        {
          name: "template",
          type: "text",
          admin: { description: "Which email template to use (for 'Send Email' actions)" },
        },
        {
          name: "taskTitle",
          type: "text",
          admin: { description: "Title for the task to create (for 'Create Task' actions)" },
        },
        {
          name: "newStage",
          type: "text",
          admin: { description: "Which stage to move the lead or booking to (for 'Move Stage' actions)" },
        },
      ],
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Turn this off to pause the automation without deleting it" },
    },
  ],
};
