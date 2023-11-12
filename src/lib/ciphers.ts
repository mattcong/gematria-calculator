import { SimpleAlphabet, MultipleAlphabet, ModularAlphabet, IncrementalAlphabet } from "./alphabets"
import { Alphabet } from "./alphabets"

const reverse = true
const regular = false

export const standardAlphabet: IncrementalAlphabet = new IncrementalAlphabet([1, 10, 100], regular)

export const reverseStandardAlphabet: IncrementalAlphabet = new IncrementalAlphabet(
  [1, 10, 100],
  reverse
)

export const pythagoreanAlphabet: ModularAlphabet = new ModularAlphabet(9, regular)

export const reversePythagoreanAlphabet: ModularAlphabet = new ModularAlphabet(9, reverse)

export const simpleAlphabet: SimpleAlphabet = new SimpleAlphabet(regular)

export const multiple6Alphabet: MultipleAlphabet = new MultipleAlphabet(6, regular)

export const ciphers: { [key: string]: Alphabet } = {
  "Standard Gematria": standardAlphabet.use(),
  "Reverse Standard Gematria": reverseStandardAlphabet.use(),
  "Pythagorean Gematria": pythagoreanAlphabet.use(),
  "Reverse Pythagorean Gematria": reversePythagoreanAlphabet.use(),
  "Simple Gematria": simpleAlphabet.use(),
  "Multiple 6 Gematria": multiple6Alphabet.use(),
}
