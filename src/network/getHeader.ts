import { Header } from '@/payload-types'
import { getCacheConfig } from './getCacheConfig'
import { PaginatedDocs } from 'payload'

type GetHeaderProps = {
  isDraftMode: boolean
}

const getUrl = ({ isDraftMode }: GetHeaderProps) =>
  isDraftMode
    ? `${process.env.BASE_URL}/api/header?depth=3&draft=true&locale=undefined`
    : `${process.env.BASE_URL}/api/header?depth=3&draft=false&locale=undefined`

export const getHeader = async ({ isDraftMode }: GetHeaderProps): Promise<Header> => {
  const cacheConfig = getCacheConfig()
  const url = getUrl({ isDraftMode })

  const result = await fetch(url, {
    ...cacheConfig,
  })

  const data = (await result.json()) as PaginatedDocs<Header>

  return data.docs[0]
}
