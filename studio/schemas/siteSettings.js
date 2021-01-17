export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  __experimental_actions: ["update", "create", "delete", "publish"],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      title: "Open graph",
      name: "openGraph",
      description: "These will be the default meta tags on all pages",
      type: "openGraph",
    },
  ],
};
