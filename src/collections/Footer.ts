import { CollectionConfig } from 'payload'

export const Footer: CollectionConfig = {
  slug: 'footer',
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
      name: 'footerLinks',
      type: 'array',
      fields: [
        {
          name: 'footerLink',
          type: 'relationship',
          relationTo: 'links',
          required: true,
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  access: {
    read: () => true,
  },
  auth: false,
  versions: {
    drafts: true,
  },
}
