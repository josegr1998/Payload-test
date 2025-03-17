import { Header as HeaderType } from '@/payload-types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { isValidImage } from '@/utils/isValidImage'
import { isValidPayloadItem } from '@/utils/isValidPayloadItem'

type Props = HeaderType

export const Header = ({ logo, navLinks }: Props) => (
  <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
    {isValidImage(logo) && (
      <Image src={logo.url} alt={logo.alt || 'Logo'} width={120} height={40} />
    )}

    <nav>
      <ul className="flex space-x-6">
        {navLinks?.map(({ navLink }, index) =>
          isValidPayloadItem(navLink) ? (
            <li key={index}>
              <Link href={navLink.url} className="text-gray-700 hover:text-black transition">
                {navLink.label}
              </Link>
            </li>
          ) : null,
        )}
      </ul>
    </nav>
  </header>
)
