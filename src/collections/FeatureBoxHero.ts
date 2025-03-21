import type { CollectionConfig } from 'payload'

export const FeatureBoxHero: CollectionConfig = {
  slug: 'feature-box-hero',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Feature Box Hero - ',
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
  versions: {
    drafts: true,
  },
}
