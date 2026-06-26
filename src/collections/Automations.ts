import type { CollectionConfig } from "payload";

export const Automations: CollectionConfig = {
  slug: "automations",
  admin: {
    useAsTitle: "name",
    group: "Operations",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
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
    },
    {
      name: "offsetDays",
      type: "number",
      admin: {
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
        },
        {
          name: "template",
          type: "text",
        },
        {
          name: "taskTitle",
          type: "text",
        },
        {
          name: "newStage",
          type: "text",
        },
      ],
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
