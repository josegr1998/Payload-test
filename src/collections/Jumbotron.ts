import type { CollectionConfig } from 'payload'

export const Jumbotron: CollectionConfig = {
  slug: 'jumbotron',
  admin: {
    useAsTitle: 'name',
  },
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
  access: {
    read: () => true,
  },
  auth: false,
}
