import React from 'react'

import { RenderUi } from '@/components/RenderUi/RenderUi'
import { getPage } from '@/network/getPage'

export default async function HomePage() {
  const page = await getPage({ path: '/' })

  return (
    <div className="home">
      <RenderUi components={page.components} />
    </div>
  )
}
