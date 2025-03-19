import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { getPage } from '@/network/getPage'

export default async function Page({
  params: paramsPromise,
  searchParams,
}: {
  params: Promise<{ path: string[] }>
  searchParams: { isDraftMode?: string }
}) {
  const params = await paramsPromise

  const pagePath = `/${params?.path.join('/')}`

  const isDraftMode = searchParams.isDraftMode === 'true'

  const page = await getPage({ path: pagePath, isDraftMode })

  return (
    <div className="home">
      <h2>{page.title}</h2>
      <RenderUi components={page.components} />
    </div>
  )
}
