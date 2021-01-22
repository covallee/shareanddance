export default {
  title: 'Track',
  name: 'track',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Artist',
      name: 'artist',
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
      title: 'Album',
      name: 'album',
      type: 'album',
    },
    {
      title: 'Explicit',
      name: 'explicit',
      type: 'boolean',
    },
    {
      title: 'Duration',
      name: 'duration',
      type: 'number',
    },
    {
      title: 'Data by platform',
      name: 'dataByPlatform',
      type: 'dataByPlatform',
    },
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc',
        },
        {
          field: 'name',
          direction: 'asc',
        },
      ],
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc',
        },
        {
          field: 'name',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'artist',
      publishedAt: 'publishedAt',
      media: 'album.image',
    },
  },
  initialValue: () => ({
    publishedAt: (new Date()).toISOString()
  })
}
