import type { Block } from 'payload'

export const RichText: Block = {
  slug: 'rich-text-content',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Rich Text Content - ',
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
