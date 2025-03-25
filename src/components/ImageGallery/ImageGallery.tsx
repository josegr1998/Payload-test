import React from 'react'
import { ImageGallery as ImageGalleryType } from '../../payload-types'
import { isValidImage } from '@/utils/isValidImage'
import Image from 'next/image'

type Props = ImageGalleryType

export const ImageGallery: React.FC<Props> = ({ title, description, images }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images?.map(({ image }, index) => (
            <div key={index} className="relative aspect-square">
              {isValidImage(image) && (
                <Image
                  src={image.url}
                  alt={image.alt || ''}
                  fill
                  className="object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
