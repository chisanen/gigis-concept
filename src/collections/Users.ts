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
    },
  ],
};
