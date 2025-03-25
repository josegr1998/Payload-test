import { Block } from 'payload'

export const BlogHeader: Block = {
  slug: 'blogHeader',
  labels: {
    singular: 'Blog Header',
    plural: 'Blog Headers',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Header Image',
    },
    {
      name: 'author',
      type: 'group',
      label: 'Author Information',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Author Name',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Avatar',
        },
      ],
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
      required: true,
    },
  ],
}
