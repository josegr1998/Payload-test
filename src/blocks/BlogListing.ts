import type { Block } from 'payload'

export const BlogListing: Block = {
  slug: 'blog-listings',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
