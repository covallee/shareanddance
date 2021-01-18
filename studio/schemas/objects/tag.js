import { MdBookmark } from "react-icons/md";

export default {
  name: "tag",
  type: "document",
  title: "Tag",
  icon: MdBookmark,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
  ],
};