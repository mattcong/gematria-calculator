import { Alphabet } from '@/types/Alphabet'

export function calculate(word: string, alphabet: Alphabet): number {
  const normalized = word.toUpperCase()
  let sum = 0
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i]
    const value = alphabet[char]
    if (value !== undefined) {
      sum += value
    }
  }
  return sum
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
