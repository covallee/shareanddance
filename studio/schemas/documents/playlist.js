export default {
  title: 'Playlist',
  name: 'playlist',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Code',
      name: 'code',
      type: 'string',
    },
    {
      name: "comment",
      title: "Comment",
      type: "blockContent",
    },
    {
      name: "tag",
      type: "array",
      title: "Tag",
      of: [
        {
          type: "reference",
          to: {
            type: "tag",
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
    },
    {
      name: "poster",
      title: "Poster Image",
      type: "mainImage"
    },
  ],
  preview: {
    select: {
      title: 'name',
      publishedAt: 'publishedAt',
      media: 'poster.image',
    },
  },
}