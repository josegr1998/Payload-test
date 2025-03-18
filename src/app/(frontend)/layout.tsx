import React from 'react'
import './globals.css'
import { Header } from '@/components/Header/Header'
import { getHeader } from '@/network/getHeader'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const header = await getHeader()

  return (
    <html lang="en">
      <body>
        <main>
          <Header {...header} />
          {children}
        </main>
      </body>
    </html>
  )
}
