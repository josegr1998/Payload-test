import type { CollectionConfig } from 'payload'

export const BlogListing: CollectionConfig = {
  slug: 'blog-listings',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
}
