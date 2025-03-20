import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { getPage } from '@/network/getPage'
import { isValidDraftModeToken } from '@/utils/isValidDraftModeToken'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ isDraftMode?: string; draftModeToken: string }>
}) {
  const { isDraftMode, draftModeToken } = await searchParams

  if (isDraftMode && !draftModeToken) {
    return <div>Draft Mode Token is required</div>
  }

  if (isDraftMode && !isValidDraftModeToken(draftModeToken)) {
    return <div>Invalid Draft Mode Token</div>
  }

  const page = await getPage({ path: '/', isDraftMode: isDraftMode === 'true' })

  return (
    <div className="home">
      <h2>{page.title}</h2>
      <RenderUi components={page.components} />
    </div>
  )
}
