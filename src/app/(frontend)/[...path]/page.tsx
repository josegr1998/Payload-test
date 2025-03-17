import { BasePayload, getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { RenderUi } from '@/components/RenderUi/RenderUi'
import { Header } from '@/components/Header/Header'
import { PageProps } from '.next/types/app/(frontend)/layout'

const getPage = async ({ payload, pagePath }: { payload: BasePayload; pagePath: string }) => {
  const result = await payload.find({
    collection: 'pages',
    where: {
      path: {
        equals: pagePath,
      },
    },
  })

  return result.docs[0]
}

const getHeader = async ({ payload }: { payload: BasePayload }) => {
  const result = await payload.findByID({
    collection: 'header',
    id: '1',
  })

  return result
}

export default async function Page({ params }: PageProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const searchParams = await params

  const pagePath = `/${searchParams?.path.join('/')}`

  const page = await getPage({ payload, pagePath })

  const header = await getHeader({ payload })

  return (
    <div className="home">
      <Header {...header} />
      <RenderUi components={page.components} />
    </div>
  )
}
