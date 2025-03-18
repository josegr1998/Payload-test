import { CollectionConfig } from 'payload'

export const Header: CollectionConfig = {
  slug: 'header',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        {
          name: 'navLink',
          type: 'relationship',
          relationTo: 'links',
          required: true,
        },
      ],
    },
  ],
  access: {
    read: () => true,
  },
  auth: false,
}
