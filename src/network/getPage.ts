import { Page } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { getCacheConfig } from './getCacheConfig'

const getUrl = (path: string) =>
  process.env.IS_PREVIEW === 'true'
    ? `${process.env.BASE_URL}/api/pages?where[path][equals]=${path}&depth=3&draft=true`
    : `${process.env.BASE_URL}/api/pages?where[path][equals]=${path}&depth=3&draft=false`

export const getPage = async ({ path }: { path: string }): Promise<Page> => {
  const cacheConfig = getCacheConfig()
  const url = getUrl(path)

  const result = await fetch(url, {
    ...cacheConfig,
  })

  const data = (await result.json()) as PaginatedDocs<Page>

  console.log('what --->', data)

  return data.docs[0]
}
