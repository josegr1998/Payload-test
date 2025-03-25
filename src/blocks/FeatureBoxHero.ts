import type { Block } from 'payload'

export const FeatureBoxHero: Block = {
  slug: 'feature-box-hero',

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
}
