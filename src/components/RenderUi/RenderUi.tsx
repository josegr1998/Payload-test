import { Page } from '@/payload-types'
import React from 'react'
import { FeatureBoxHero } from '../FeatureBoxHero/FeatureBoxHero'
import { Jumbotron } from '../Jumbotron/Jumbotron'
import { UiComponent } from '@/types/common/Component'
import { BlogListing } from '../BlogListing/BlogListing'
import { RichTextContent } from '../RichTextContent/RichTextContent'
type Props = {
  components: Page['components']
}

type ComponentType = 'feature-box-hero' | 'jumbotron' | 'blog-listings' | 'rich-text-content'

//TODO: Fix these types
const COMPONENT_MAP = {
  'feature-box-hero': FeatureBoxHero as unknown as UiComponent,
  jumbotron: Jumbotron as unknown as UiComponent,
  'blog-listings': BlogListing as unknown as UiComponent,
  'rich-text-content': RichTextContent as unknown as UiComponent,
} as const satisfies Record<ComponentType, UiComponent>

const isValidComponent = (component: UiComponent | number): component is UiComponent =>
  !!(component as UiComponent).id

export const RenderUi = ({ components }: Props) => {
  return (
    <div>
      {components?.map((component, index) => {
        const Component = COMPONENT_MAP[component.relationTo]

        if (!Component || !isValidComponent(component.value as UiComponent)) {
          return null
        }

        return (
          //@ts-expect-error -- TODO: Fix this
          <Component key={`${component.value.id}_${index}`} {...(component.value as UiComponent)} />
        )
      })}
    </div>
  )
}
