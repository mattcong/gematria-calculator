import {
  standardAlphabet,
  pythagoreanAlphabet,
  reversePythagoreanAlphabet,
  simpleAlphabet,
  multiple6Alphabet,
  customAlphabet,
} from './ciphers'
import { ApiError } from './errors/ApiError'

export const getCipher = (name: string) => {
  switch (name) {
    case 'Standard Gematria':
      return standardAlphabet.use()
    case 'Pythagorean Gematria':
      return pythagoreanAlphabet.use()
    case 'Reverse Pythagorean Gematria':
      return reversePythagoreanAlphabet.use()
    case 'Simple Gematria':
      return simpleAlphabet.use()
    case 'Multiple 6 Gematria':
      return multiple6Alphabet.use()
    case 'Alphanumeric Qabbala':
      return customAlphabet.use()
    default:
      throw new ApiError(`Unknown cipher "${name}"`, 404)
  }
}
