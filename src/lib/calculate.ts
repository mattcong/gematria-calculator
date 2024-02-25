import { Alphabet } from "../types/Alphabet"

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

export function preCalculateValues(wordList: string[], alphabet: Alphabet) {
  const words: { [key: string]: string[] } = {}
  wordList.forEach((word) => {
    const wordValue = calculate(word, alphabet).toString()
    if (!words[wordValue]) {
      words[wordValue] = []
    }
    words[wordValue].push(word)
  })
  return words
}
