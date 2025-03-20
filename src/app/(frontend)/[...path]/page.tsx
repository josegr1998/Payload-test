import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { getPage } from '@/network/getPage'
import { isValidDraftModeToken } from '@/utils/isValidDraftModeToken'
import { isValidImage } from '@/utils/isValidImage'
import { Metadata } from 'next'

export async function generateMetadata({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ path: string[] }>
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

  const params = await paramsPromise

  const pagePath = params?.path ? `/${params?.path?.join('/')}` : '/'

  const page = await getPage({ path: pagePath, isDraftMode: searchParams?.isDraftMode === 'true' })

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
