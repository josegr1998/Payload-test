import type {
  FeatureBoxHero,
  Jumbotron,
  BlogListings,
  RichTextContent,
  ImageGallery,
  SuccessStories,
} from '@/payload-types'

export type ComponentType =
  | 'feature-box-hero'
  | 'jumbotron'
  | 'blog-listings'
  | 'image-gallery'
  | 'successStories'

export type Component<T extends ComponentType = ComponentType> = T extends 'feature-box-hero'
  ? FeatureBoxHero
  : T extends 'jumbotron'
    ? Jumbotron
    : T extends 'blog-listings'
      ? BlogListings
      : T extends 'rich-text-content'
        ? RichTextContent
        : T extends 'image-gallery'
          ? ImageGallery
          : T extends 'successStories'
            ? SuccessStories
            : never

export type UiComponent = Component
