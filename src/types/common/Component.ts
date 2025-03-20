import type { FeatureBoxHero, Jumbotron, BlogListing } from '@/payload-types'
import type { ComponentType as ReactComponentType } from 'react'

export type ComponentType = 'feature-box-hero' | 'jumbotron' | 'blog-listings'

export type Component<T extends ComponentType = ComponentType> = T extends 'feature-box-hero'
  ? FeatureBoxHero
  : T extends 'jumbotron'
    ? Jumbotron
    : T extends 'blog-listings'
      ? BlogListing
      : never

export type UiComponent = Component
