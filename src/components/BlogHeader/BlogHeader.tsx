import React from 'react'
import Image from 'next/image'
import { isValidImage } from '@/utils/isValidImage'
import { BlogHeader as BlogHeaderType } from '@/payload-types'

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export const BlogHeader: React.FC<BlogHeaderType> = ({
  title,
  subtitle,
  image,
  author,
  publishedDate,
}) => {
  return (
    <header className="relative w-full">
      {isValidImage(image) && (
        <div className="relative h-[400px] w-full">
          <Image src={image.url} alt={image.alt} fill className="object-cover" priority />
        </div>
      )}

      <div className="w-full bg-gray-100 px-8 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl text-gray-600 mb-6">{subtitle}</p>}

        <div className="flex justify-end items-center gap-4">
          {isValidImage(author.avatar) && (
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image src={author.avatar.url} alt={author.name} fill className="object-cover" />
            </div>
          )}

          <div>
            {author && <p className="font-medium">{author.name}</p>}
            <p className="text-gray-600">{formatDate(publishedDate)}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
