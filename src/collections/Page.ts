import type { CollectionConfig } from 'payload'

type PageType = 'blog' | 'standard'

const validateBlogPath = (value: string) => {
  if (!value.startsWith('/blogs')) {
    return "Slug must start with '/blogs' for blog pages."
  }
  return true
}

const VALIDATORS = {
  PATH: {
    blog: (value: string) => validateBlogPath(value),
    standard: null,
  },
} as const satisfies {
  PATH: Record<PageType, ((value: string) => boolean | string) | null>
}

export const Page: CollectionConfig = {
  slug: 'pages',
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
      name: 'path',
      type: 'text',
      unique: true,
      required: true,
      //@ts-expect-error -- value can be a string
      validate: (value: string, { data }: { data: { type: PageType } }) => {
        const validator = data.type ? VALIDATORS.PATH[data.type] : null
        if (!validator) return true
        return validator(value)
      },
    },
    {
      name: 'components',
      type: 'relationship',
      relationTo: ['feature-box-hero', 'jumbotron'],
      hasMany: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { value: 'blog', label: 'Blog' },
        { value: 'standard', label: 'Standard' },
      ],
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
  auth: false,
}
