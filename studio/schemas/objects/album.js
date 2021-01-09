export default {
  title: 'Album',
  name: 'album',
  type: 'object',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Apple Music image URL',
      name: 'appleMusicImageUrl',
      type: 'string',
      description:
        'The base Apple Music image URL, excluding "/source" and the filename.',
    },
  ]
}