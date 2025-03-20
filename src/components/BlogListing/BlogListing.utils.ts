import { getCacheConfig } from '@/network/getCacheConfig'
import { Page } from '@/payload-types'
import { isValidImage } from '@/utils/isValidImage'
import { PaginatedDocs } from 'payload'

type Blog = {
  title: string
  path: string
  description: string
  image: string
}

//TOOD: Figure out how to handle is draft mode here
const getUrl = (isDraftMode: boolean) =>
  isDraftMode
    ? `${process.env.BASE_URL}/api/pages?where[type][equals]=blog&depth=3&draft=true`
    : `${process.env.BASE_URL}/api/pages?where[type][equals]=blog&depth=3&draft=false`

const mapBlogs = (blogs: Page[]): Blog[] => {
  return blogs.map((blog) => {
    return {
      title: blog.title,
      path: blog.path,
      description: blog.meta.description,
      image: isValidImage(blog.meta.image) ? blog.meta.image.url : '',
    }
  })
}

export const getBlogs = async ({
  isDraftMode = false,
}: {
  isDraftMode?: boolean
}): Promise<Blog[]> => {
  const cacheConfig = getCacheConfig()
  const url = getUrl(isDraftMode)

  const result = await fetch(url, {
    ...cacheConfig,
  })

  const data = (await result.json()) as PaginatedDocs<Page>

  return mapBlogs(data.docs)
}
