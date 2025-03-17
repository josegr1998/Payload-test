import { FeatureBoxHero as FeatureBoxHeroType } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import { isValidImage } from '@/utils/isValidImage'

type Props = FeatureBoxHeroType

export const FeatureBoxHero = ({ title, image, description }: Props) => (
  <section className="flex flex-col items-center gap-6 p-6 text-center bg-gray-100 rounded-lg shadow-lg md:flex-row md:text-left md:p-10">
    {isValidImage(image) && (
      <div className="relative w-40 h-40 md:w-56 md:h-56">
        <Image
          alt={image.alt}
          src={image.url}
          fill
          className="object-cover rounded-full shadow-md"
        />
      </div>
    )}

    <div className="max-w-lg">
      <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">{title}</h2>
      <p className="mt-3 text-gray-600">{description}</p>
    </div>
  </section>
)
