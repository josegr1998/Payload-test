import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { PageProps } from '.next/types/app/(frontend)/layout'
import { getPage } from '@/network/getPage'

export default async function Page({ params }: PageProps) {
  const searchParams = await params

  const pagePath = `/${searchParams?.path.join('/')}`

  const page = await getPage({ path: pagePath })

  return (
    <div className="home">
      <RenderUi components={page.components} />
    </div>
  )
}
