import { Jumbotron as JumbotronType } from '@/payload-types'
import { isValidImage } from '@/utils/isValidImage'
import Image from 'next/image'

import React from 'react'

type Props = JumbotronType

export const Jumbotron = ({ title, description, image }: Props) => {
  return (
    <section className="relative flex items-center justify-center w-full h-[400px] bg-gray-900 text-white">
      {/* Background Image */}
      {isValidImage(image) && (
        <Image
          src={`https://payload-test-pearl.vercel.app/${image.url}`}
          alt={image.alt}
          fill
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-4xl font-extrabold md:text-5xl">{title}</h1>
        <p className="mt-4 text-lg md:text-xl">{description}</p>
      </div>
    </section>
  )
}
