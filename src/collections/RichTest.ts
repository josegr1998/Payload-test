import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const RichText: CollectionConfig = {
  slug: 'rich-text-content',
  admin: {
    useAsTitle: 'name',
  },
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
      editor: lexicalEditor(),
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
