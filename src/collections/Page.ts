import type { CollectionConfig } from 'payload'
import CryptoJS from 'crypto-js'
import base64url from 'base64url'

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
    preview: ({ path }) => {
      const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify({ draftModeKey: process.env.DRAFT_MODE_KEY }),
        process.env.DRAFT_MODE_SECRET as string,
      ).toString()

      const safeToken = base64url.fromBase64(encryptedToken)

      return `/preview?draftModeToken=${safeToken}&path=${path}`
    },
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
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          required: true,
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Meta Keywords',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Meta Image',
          required: true,
        },
      ],
    },
    {
      name: 'components',
      type: 'relationship',
      relationTo: ['feature-box-hero', 'jumbotron', 'blog-listings', 'rich-text-content'],
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
  versions: {
    drafts: true,
  },
}
