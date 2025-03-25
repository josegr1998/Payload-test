// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Page } from './collections/Page'
import { FeatureBoxHero } from './blocks/FeatureBoxHero'
import { Jumbotron } from './blocks/Jumbotron'
import Link from './collections/Link'
import { Header } from './collections/Header'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { BlogListing } from './blocks/BlogListing'
import { RichText } from './blocks/RichText'
import { ImageGallery } from './blocks/ImageGallery'
import { Footer } from './collections/Footer'
import SuccessStory from './collections/SuccessStory'
import { SuccessStories } from './blocks/SuccessStories'
import { BlogHeader } from './blocks/BlogHeader'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
      collections: ['pages', 'header', 'link', 'media'],
    },
  },
  blocks: [
    ImageGallery,
    FeatureBoxHero,
    Jumbotron,
    BlogListing,
    RichText,
    SuccessStories,
    BlogHeader,
  ],
  collections: [Users, Media, Page, Link, Header, Footer, SuccessStory],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [ImageGallery, FeatureBoxHero, Jumbotron, BlogListing, BlogHeader],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  cors: {
    origins: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  },
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
