import React from 'react'
import { BlogListing as BlogListingType } from '@/payload-types'
import { getBlogs } from './BlogListing.utils'
import Image from 'next/image'
type Props = BlogListingType

export const BlogListing = async ({ title }: Props) => {
  const blogs = await getBlogs({})

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex flex-wrap gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.title}
            className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02] max-w-[400px]"
          >
            <div className="relative h-48 w-full">
              {blog.image && (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-900">{blog.title}</h3>
              <p className="mb-4 text-gray-600">{blog.description}</p>
              <a
                href={blog.path}
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
