import base64url from 'base64url'
import CryptoJS from 'crypto-js'

export const isValidDraftModeToken = (token: string) => {
  try {
    const base64Token = base64url.toBase64(token)

    const bytes = CryptoJS.AES.decrypt(base64Token, process.env.DRAFT_MODE_SECRET as string)
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8)

    if (!decryptedToken) return false

    const { draftModeKey } = JSON.parse(decryptedToken)

    return draftModeKey === process.env.DRAFT_MODE_KEY
  } catch (error) {
    console.error('error --->', error)
    return false
  }
}
