import type { Block } from 'payload'

export const ImageGallery: Block = {
  slug: 'image-gallery',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Image Gallery - ',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
}
