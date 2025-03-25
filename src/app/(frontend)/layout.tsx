import React from 'react'
import './globals.css'
import { Header } from '@/components/Header/Header'
import { getHeader } from '@/network/getHeader'
import { draftMode } from 'next/headers'
import { getFooter } from '@/network/getFooter'
import { Footer } from '@/components/Footer/Footer'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { isEnabled: isDraftMode } = await draftMode()

  const header = await getHeader({ isDraftMode })
  const footer = await getFooter({ isDraftMode })
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex flex-col">
          <Header {...header} />
          <div className="flex-grow">{children}</div>
          <Footer {...footer} />
        </main>
      </body>
    </html>
  )
}
