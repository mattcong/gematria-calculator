import { SimpleAlphabet, MultipleAlphabet, ModularAlphabet, IncrementalAlphabet } from './alphabets'
import { Alphabet } from '../types/Alphabet'

const reverse = true
const regular = false

const standardAlphabetExceptions = [
  { exceptionLetter: 'J', exceptionValue: 600 },
  { exceptionLetter: 'V', exceptionValue: 700 },
  { exceptionLetter: 'W', exceptionValue: 900 },
]
export const standardAlphabet: IncrementalAlphabet = new IncrementalAlphabet(
  [1, 10, 100],
  regular,
  standardAlphabetExceptions,
)

export const pythagoreanAlphabet: ModularAlphabet = new ModularAlphabet(9, regular)

export const reversePythagoreanAlphabet: ModularAlphabet = new ModularAlphabet(9, reverse)

export const simpleAlphabet: SimpleAlphabet = new SimpleAlphabet(regular)

export const multiple6Alphabet: MultipleAlphabet = new MultipleAlphabet(6, regular)

export const customAlphabet: SimpleAlphabet = new SimpleAlphabet(regular, {
  mapping: Array.from({ length: 26 }, (_, i) => i + 10),
})

export const ciphers: { [key: string]: Alphabet } = {
  'Standard Gematria': standardAlphabet.use(),
  'Pythagorean Gematria': pythagoreanAlphabet.use(),
  'Reverse Pythagorean Gematria': reversePythagoreanAlphabet.use(),
  'Simple Gematria': simpleAlphabet.use(),
  'Multiple 6 Gematria': multiple6Alphabet.use(),
  'Alphanumeric Qabbala': customAlphabet.use(),
}
