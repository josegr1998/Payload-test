import { Page } from '@/payload-types'
import React, { JSX } from 'react'
import { FeatureBoxHero } from '../FeatureBoxHero/FeatureBoxHero'
import { Jumbotron } from '../Jumbotron/Jumbotron'
import { UiComponent } from '@/types/common/Component'

type Props = {
  components: Page['components']
}

type ComponentType = 'feature-box-hero' | 'jumbotron'

const COMPONENT_MAP = {
  'feature-box-hero': FeatureBoxHero,
  jumbotron: Jumbotron,
} as const satisfies Record<ComponentType, React.ComponentType<UiComponent>>

const isValidComponent = (component: UiComponent | number): component is UiComponent =>
  !!(component as UiComponent).id

export const RenderUi = ({ components }: Props) => {
  return (
    <div>
      {components?.map((component, index) => {
        const Component = COMPONENT_MAP[component.relationTo]

        if (!Component || !isValidComponent(component.value)) {
          return null
        }

        return <Component key={`${component.value.id}_${index}`} {...component.value} />
      })}
    </div>
  )
}
