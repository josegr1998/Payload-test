import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { getPage } from '@/network/getPage'
import { draftMode } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage({
  searchParams,
}: {
  searchParams: { isDraftMode?: string }
}) {
  const isDraftMode = searchParams.isDraftMode === 'true'

  const page = await getPage({ path: '/', isDraftMode })

  return (
    <div className="home">
      <h2>{page.title}</h2>
      <RenderUi components={page.components} />
    </div>
  )
}
