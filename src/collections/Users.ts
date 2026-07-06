import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    group: "Settings",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Your display name in the admin" },
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Owner", value: "owner" },
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Staff", value: "staff" },
      ],
      defaultValue: "staff",
      required: true,
      admin: { description: "Controls what this person can access. Owner = everything. Admin = everything except secrets. Editor = website content only. Staff = just their assigned events." },
    },
  ],
};
