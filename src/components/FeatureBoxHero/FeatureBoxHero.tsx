import { FeatureBoxHero as FeatureBoxHeroType } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import { isValidImage } from '@/utils/isValidImage'

type Props = FeatureBoxHeroType

export const FeatureBoxHero = ({ title, image, description }: Props) => (
  <section className="flex flex-col items-center gap-8 p-6 bg-gray-100 rounded-lg shadow-lg md:flex-row md:p-10">
    {isValidImage(image) && (
      <div className="relative w-full h-[300px] md:w-1/2 md:h-[500px]">
        <Image
          alt={image.alt}
          src={`${process.env.BASE_URL}/${image.url}`}
          fill
          className="object-cover rounded-lg shadow-md"
          unoptimized
        />
      </div>
    )}

    <div className="w-full md:w-1/2 px-6">
      <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">{title}</h2>
      <p className="mt-3 text-gray-600">{description}</p>
    </div>
  </section>
)
