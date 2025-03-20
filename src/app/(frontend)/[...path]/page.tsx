import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { getPage } from '@/network/getPage'
import { isValidDraftModeToken } from '@/utils/isValidDraftModeToken'

export default async function Page({
  params: paramsPromise,
  searchParams,
}: {
  params: Promise<{ path: string[] }>
  searchParams: Promise<{ isDraftMode?: string; draftModeToken: string }>
}) {
  const params = await paramsPromise
  const { isDraftMode, draftModeToken } = await searchParams

  const pagePath = `/${params?.path.join('/')}`

  if (isDraftMode && !draftModeToken) {
    return <div>Draft Mode Token is required</div>
  }

  if (isDraftMode && !isValidDraftModeToken(draftModeToken)) {
    return <div>Invalid Draft Mode Token</div>
  }

  const page = await getPage({
    path: pagePath,
    isDraftMode: isDraftMode === 'true',
  })

  return (
    <div className="home">
      <h2>{page.title}</h2>
      <RenderUi components={page.components} />
    </div>
  )
}
