import React from 'react'
import './globals.css'
import { Header } from '@/components/Header/Header'
import { getHeader } from '@/network/getHeader'
import { draftMode } from 'next/headers'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { isEnabled: isDraftMode } = await draftMode()

  const header = await getHeader({ isDraftMode })

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
