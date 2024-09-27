export const removeCalculatedWordAndShuffle = (
  wordsArray: string[],
  wordToRemove: string
): string[] => {
  if (!wordsArray) {
    return []
  }

  const normalize = (word: string) => word.replace(/\r/g, "").toLowerCase()
  const normalizedStringToRemove = normalize(wordToRemove)
  const filteredWords = wordsArray.filter((item) => normalize(item) !== normalizedStringToRemove)

  for (let i = filteredWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[filteredWords[i], filteredWords[j]] = [filteredWords[j], filteredWords[i]]
  }

  return filteredWords
}
