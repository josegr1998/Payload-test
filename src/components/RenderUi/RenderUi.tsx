import { Page } from '@/payload-types'
import React from 'react'
import { FeatureBoxHero } from '../FeatureBoxHero/FeatureBoxHero'
import { Jumbotron } from '../Jumbotron/Jumbotron'
import { UiComponent } from '@/types/common/Component'
import { BlogListing } from '../BlogListing/BlogListing'
import { RichTextContent } from '../RichTextContent/RichTextContent'
import { SuccessStories } from '../SuccessStories/SuccessStories'
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { BlogHeader } from '../BlogHeader/BlogHeader'
type Props = {
  components: Page['blocks']
}

type ComponentType =
  | 'feature-box-hero'
  | 'jumbotron'
  | 'blog-listings'
  | 'rich-text-content'
  | 'image-gallery'
  | 'successStories'
  | 'blogHeader'

//TODO: Fix these types
const COMPONENT_MAP = {
  'feature-box-hero': FeatureBoxHero as unknown as UiComponent,
  jumbotron: Jumbotron as unknown as UiComponent,
  'blog-listings': BlogListing as unknown as UiComponent,
  'rich-text-content': RichTextContent as unknown as UiComponent,
  'image-gallery': ImageGallery as unknown as UiComponent,
  successStories: SuccessStories as unknown as UiComponent,
  blogHeader: BlogHeader as unknown as UiComponent,
} as const satisfies Record<ComponentType, UiComponent>

const isValidComponent = (component: UiComponent | number): component is UiComponent =>
  !!(component as UiComponent).id

export const RenderUi = ({ components }: Props) => {
  return (
    <div>
      {components?.map((component, index) => {
        const Component = COMPONENT_MAP[component.blockType]

        //@ts-expect-error TODO: Fix this type
        if (!Component || !isValidComponent(component)) {
          return null
        }
        //@ts-expect-error TODO: Fix this type
        return <Component key={`${component.id}_${index}`} {...component} />
      })}
    </div>
  )
}
