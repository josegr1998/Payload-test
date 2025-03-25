import React from 'react'
import { SuccessStories as SuccessStoriesType } from '../../payload-types'
import { isValidPayloadItem } from '@/utils/isValidPayloadItem'
import { isValidImage } from '@/utils/isValidImage'
import Image from 'next/image'

type Props = SuccessStoriesType

export const SuccessStories: React.FC<Props> = ({ title, description, stories }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {description && <p className="text-gray-600">{description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(
            (story) =>
              isValidPayloadItem(story) && (
                <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {story.image && (
                    <div className="w-full h-48 relative">
                      <Image
                        src={isValidImage(story.image) ? story.image.url : ''}
                        alt={story.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <blockquote className="mb-4 text-gray-700">{story.testimonial}</blockquote>
                    <div className="text-center">
                      <cite className="font-semibold block">{story.name}</cite>
                      {(story.role || story.company) && (
                        <span className="text-gray-500">
                          {story.role}
                          {story.role && story.company && ' at '}
                          {story.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </section>
  )
}
