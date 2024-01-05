import FormattedWords from "./FormattedWords"

type DisplayWordsProps = {
  cipher: string
  word: string
  value: string
  words: string[]
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const DisplayWords = ({ cipher, word, value, words, setValue }: DisplayWordsProps) => {
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
            This is shared by: <FormattedWords words={words} />
          </p>
        ) : (
          <p>No single word shares this value.</p>
        )}
      </div>
    </>
  )
}

export default DisplayWords
