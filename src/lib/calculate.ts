import { Alphabet } from "./alphabets"

export function calculate(word: string, alphabet: Alphabet): number {
  let result: number[] = []
  for (const letter in alphabet) {
    const letters = [...word.toUpperCase()]
    letters.forEach((e) => {
      if (letter === e) {
        result.push(alphabet[letter])
      }
    })
  }
  return result.reduce((a, b) => a + b, 0)
}

export function preCalculateValues(words: string[], alphabet: Alphabet) {
  const wordMap = new Map()
  words.forEach((word) => {
    const wordValue = calculate(word, alphabet)
    if (!wordMap.has(wordValue)) {
      wordMap.set(wordValue, [])
    }
    wordMap.get(wordValue).push(word)
  })
  return wordMap
}
