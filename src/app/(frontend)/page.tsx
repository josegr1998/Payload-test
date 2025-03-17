import { BasePayload, getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { RenderUi } from '@/components/RenderUi/RenderUi'
import { Header } from '@/components/Header/Header'

const getPage = async ({ payload }: { payload: BasePayload }) => {
  const result = await payload.find({
    collection: 'pages',
    where: {
      path: {
        equals: '/',
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

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await getPage({ payload })

  const header = await getHeader({ payload })

  return (
    <div className="home">
      <Header {...header} />
      <RenderUi components={page.components} />
    </div>
  )
}
