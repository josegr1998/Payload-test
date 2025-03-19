import { Header } from '@/payload-types'
import { getCacheConfig } from './getCacheConfig'
import { PaginatedDocs } from 'payload'

const getUrl = () =>
  process.env.IS_PREVIEW === 'true'
    ? `${process.env.BASE_URL}/api/header?depth=3&draft=true&locale=undefined`
    : `${process.env.BASE_URL}/api/header?depth=3&draft=false&locale=undefined`

export const getHeader = async (): Promise<Header> => {
  const cacheConfig = getCacheConfig()
  const url = getUrl()

  const result = await fetch(url, {
    ...cacheConfig,
  })

  const data = (await result.json()) as PaginatedDocs<Header>

  return data.docs[0]
}
