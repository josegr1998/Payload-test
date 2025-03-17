import { Media } from '@/payload-types'

type Image = Media & { url: string }

export const isValidImage = (image?: number | Media | Image | null): image is Image =>
  typeof image !== 'number' && !!image?.url
