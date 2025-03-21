import type { FeatureBoxHero, Jumbotron, BlogListing, RichTextContent } from '@/payload-types'

export type ComponentType = 'feature-box-hero' | 'jumbotron' | 'blog-listings'

export type Component<T extends ComponentType = ComponentType> = T extends 'feature-box-hero'
  ? FeatureBoxHero
  : T extends 'jumbotron'
    ? Jumbotron
    : T extends 'blog-listings'
      ? BlogListing
      : T extends 'rich-text-content'
        ? RichTextContent
        : never

export type UiComponent = Component
