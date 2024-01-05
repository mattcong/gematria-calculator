import { useState } from "react"

const FormattedWords = ({ words }: { words: string[] }) => {
  const [showAll, setShowAll] = useState(false)

  const formatWordList = (words: string[], noHiddenWords: boolean) => {
    if (words.length === 1) {
      return `${words}.`
    }
    if (words.length > 1 && noHiddenWords) {
      const lastWord = words.pop()
      return `${words.join(", ")} and ${lastWord}.`
    }
    return words.join(", ")
  }

  const numberOfDisplayWords = 40
  const numberOfHiddenWords = words.length - numberOfDisplayWords
  const hasHiddenWords = words.length > numberOfDisplayWords && !showAll
  const displayedWords = hasHiddenWords ? words.slice(0, numberOfDisplayWords) : words
  const formattedWords = formatWordList(displayedWords, !hasHiddenWords)

  return (
    <span>
      {formattedWords}
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
    </span>
  )
}

export default FormattedWords
