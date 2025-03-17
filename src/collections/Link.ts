import { CollectionConfig } from 'payload'

export const Link: CollectionConfig = {
  slug: 'links',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Link - ',
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: ['internal', 'external'],
      defaultValue: 'internal',
    },
  ],
}

export default Link
