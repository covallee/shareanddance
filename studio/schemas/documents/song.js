// import {format} from 'date-fns'

export default {
  name: 'song',
  type: 'document',
  title: 'Song Pick',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'artist',
      type: 'string',
      title: 'Artist'
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link'
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
      name: "poster",
      title: "Poster Image",
      type: "mainImage"
    },
    {
      title: 'Publish date',
      name: 'publishDate',
      type: 'date'
    }
  ]
}