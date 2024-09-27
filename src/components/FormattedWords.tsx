import { useEffect, useState } from "react"

const FormattedWords = ({ words }: { words: string[] }) => {
  const [showAll, setShowAll] = useState(false)
  const [formattedDisplayedWords, setFormattedDisplayedWords] = useState("false")

  const formatWordList = (words: string[], hiddenWords: boolean) => {
    if (words.length === 1) {
      return `${words}.`
    }
    if (words.length > 1 && !hiddenWords) {
      const lastWord = words.pop()
      return `${words.join(", ")} and ${lastWord}.`
    }
    return words.join(", ")
  }

  const numberOfDisplayWords = 40
  const numberOfHiddenWords = words.length - numberOfDisplayWords
  const hasHiddenWords = words.length > numberOfDisplayWords && !showAll
  const someWords = hasHiddenWords ? words.slice(0, numberOfDisplayWords) : words
  const displayedWords = showAll ? words : someWords

  useEffect(() => {
    setShowAll(false)
  }, [words])
  
  useEffect(() => {
    setFormattedDisplayedWords(formatWordList(displayedWords, hasHiddenWords))
  }, [showAll, words])

  return (
    <>
      {formattedDisplayedWords}
      {hasHiddenWords && (
        <>
          {" "}
          <a
            role="button"
            onClick={() => setShowAll(true)}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            and {numberOfHiddenWords} more.
          </a>
        </>
      )}
    </>
  )
}

export default FormattedWords
