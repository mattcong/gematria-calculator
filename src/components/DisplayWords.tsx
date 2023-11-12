type DisplayWordsProps = {
  cipher: string
  word: string
  value: string
  words: string[]
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const DisplayWords = ({ cipher, word, value, words, setValue }: DisplayWordsProps) => {
  const displayWords = 40
  const display = words.length > displayWords ? words.slice(0, displayWords) : words

  const lastWord = (i: number) => i + 1 === display.length
  const penultimateWord = (i: number) => i + 1 === display.length - 1

  return (
    <>
      <button className="small-button" onClick={() => setValue("")}>
        Back
      </button>
      <div className="result-wrap">
        <p>
          The {cipher} value of {word} is {value}.
        </p>
        {words.length ? (
          <p>
            This is shared by:{" "}
            {display.map((word, i) => {
              return (
                <span key={i}>
                  {`${
                    lastWord(i)
                      ? words.length > displayWords
                        ? `and ${words.length - display.length} more.`
                        : words.length > 1
                        ? `and ${word}.`
                        : `${word}.`
                      : penultimateWord(i)
                      ? `${word} `
                      : `${word}, `
                  } `}
                </span>
              )
            })}
          </p>
        ) : (
          <p>No single word shares this value.</p>
        )}
      </div>
    </>
  )
}

export default DisplayWords
