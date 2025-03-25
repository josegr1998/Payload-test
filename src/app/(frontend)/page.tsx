import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { getPage } from '@/network/getPage'
import { isValidDraftModeToken } from '@/utils/isValidDraftModeToken'
import { isValidImage } from '@/utils/isValidImage'
import { Metadata } from 'next'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ isDraftMode?: string; draftModeToken: string }>
}): Promise<Metadata> {
  const searchParams = await searchParamsPromise

  if (searchParams?.isDraftMode && !searchParams?.draftModeToken) {
    return {
      title: 'Needs  Token',
    }
  }

  if (searchParams?.isDraftMode && !isValidDraftModeToken(searchParams?.draftModeToken)) {
    return {
      title: 'Invalid Token',
    }
  }

  const page = await getPage({ path: '/', isDraftMode: searchParams?.isDraftMode === 'true' })

  const image = isValidImage(page?.meta?.image) ? page?.meta?.image?.url : '/image/default.png'

  return {
    title: page?.meta?.title,
    openGraph: {
      images: [image],
    },
    description: page?.meta?.description,
    keywords: page?.meta?.keywords,
  }
}

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
      <RenderUi components={page.blocks} />
    </div>
  )
}
