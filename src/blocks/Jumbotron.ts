import type { Block } from 'payload'

export const Jumbotron: Block = {
  slug: 'jumbotron',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Jumbotron - ',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
}
