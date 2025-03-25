import { Block } from 'payload'

export const SuccessStories: Block = {
  slug: 'successStories',
  labels: {
    singular: 'Success Stories Block',
    plural: 'Success Stories Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'stories',
      type: 'relationship',
      label: 'Success Stories',
      relationTo: 'success-stories',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 6,
    },
  ],
}
