import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { getPage } from '@/network/getPage'
import { draftMode } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode()

  const page = await getPage({ path: '/', isDraftMode })

  return (
    <div className="home">
      <RenderUi components={page.components} />
    </div>
  )
}
