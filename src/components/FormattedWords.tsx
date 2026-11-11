import { useState } from 'react'

const NUMBER_OF_DISPLAY_WORDS = 40

const formatWordList = (list: string[], hiddenWords: boolean) => {
  if (list.length === 1) {
    return `${list[0]}.`
  }
  if (list.length > 1 && !hiddenWords) {
    return `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}.`
  }
  return list.join(', ')
}

const FormattedWords = ({ words }: { words: string[] }) => {
  const [showAll, setShowAll] = useState(false)
  const [renderedWords, setRenderedWords] = useState(words)


  if (words !== renderedWords) {
    setRenderedWords(words)
    setShowAll(false)
  }

  const numberOfHiddenWords = words.length - NUMBER_OF_DISPLAY_WORDS
  const hasHiddenWords = words.length > NUMBER_OF_DISPLAY_WORDS && !showAll
  const displayedWords = hasHiddenWords ? words.slice(0, NUMBER_OF_DISPLAY_WORDS) : words

  const formattedDisplayedWords = formatWordList(displayedWords, hasHiddenWords)

  return (
    <>
      {formattedDisplayedWords}
      {hasHiddenWords && (
        <>
          {' '}
          <button
            type="button"
            onClick={() => setShowAll(true)}
            style={{ all: 'unset', textDecoration: 'underline', cursor: 'pointer' }}
          >
            and {numberOfHiddenWords} more.
          </button>
        </>
      )}
    </>
  )
}

export default FormattedWords
