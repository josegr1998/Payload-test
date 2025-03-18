type CacheConfig = {
  cache: RequestCache
  next?: {
    revalidate: number
  }
}

export const getCacheConfig = (): CacheConfig =>
  process.env.IS_PREVIEW === 'true'
    ? { cache: 'no-store' }
    : {
        cache: 'force-cache',
        next: {
          revalidate: 3600,
        },
      }
