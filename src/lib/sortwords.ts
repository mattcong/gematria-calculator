function durstenfeldShuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function removeDuplicates(words: string[], calculatedWord: string) {
  let unique: string[] = []
  const seen = new Set()
  words.forEach((word) => {
    const lowerCase = word.toLowerCase()
    if (!seen.has(lowerCase) && calculatedWord.toLowerCase() !== lowerCase) {
      unique.push(word)
      seen.add(lowerCase)
    }
  })
  return unique
}

export const displayWords = (words: string[], word: string) =>
  removeDuplicates(durstenfeldShuffle(words), word)
