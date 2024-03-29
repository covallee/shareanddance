export default {
  name: "mainImage",
  type: "image",
  title: "Image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "caption",
      type: "string",
      title: "Caption",
      // options: {
      //   isHighlighted: true,
      // },
    },
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for accessibility",
      // validation: (Rule) =>
      //   Rule.error("You have to fill out the alt text").required(),
      // options: {
      //   isHighlighted: true,
      // },
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
}
