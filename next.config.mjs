import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'payload-test-pearl.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  cacheHandler: {
    revalidate: 0,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
