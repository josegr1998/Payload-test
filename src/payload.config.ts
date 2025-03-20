// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Page } from './collections/Page'
import { FeatureBoxHero } from './collections/FeatureBoxHero'
import { Jumbotron } from './collections/Jumbotron'
import Link from './collections/Link'
import { Header } from './collections/Header'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { BlogListing } from './collections/BlogListing'
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
      collections: ['pages', 'feature-box-hero', 'jumbotron', 'header', 'link', 'media'],
    },
  },
  collections: [Users, Media, Page, FeatureBoxHero, Jumbotron, Link, Header, BlogListing],
  editor: lexicalEditor(),
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
