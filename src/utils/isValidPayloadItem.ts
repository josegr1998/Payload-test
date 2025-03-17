export const isValidPayloadItem = <T>(item?: number | T): item is T =>
  !!item && typeof item !== 'number'
