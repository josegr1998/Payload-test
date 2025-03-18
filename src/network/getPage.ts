import { Page } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { getCacheConfig } from './getCacheConfig'

const getUrl = (path: string, isDraftMode: boolean) =>
  isDraftMode
    ? `${process.env.BASE_URL}/api/pages?where[path][equals]=${path}&depth=3&draft=true`
    : `${process.env.BASE_URL}/api/pages?where[path][equals]=${path}&depth=3&draft=false`

export const getPage = async ({
  path,
  isDraftMode = false,
}: {
  path: string
  isDraftMode?: boolean
}): Promise<Page> => {
  const cacheConfig = getCacheConfig()
  const url = getUrl(path, isDraftMode)

  const result = await fetch(url, {
    ...cacheConfig,
  })

  const data = (await result.json()) as PaginatedDocs<Page>

  return data.docs[0]
}
