import { CalculationResult } from "../types/CalculationResult"
import FormattedWords from "./FormattedWords"

const getTextName = (text: string) => {
  switch (text) {
    case "kjv":
      return <span>The King James Bible</span>
    case "apocrypha":
      return <span>The Biblical Apocrypha</span>
    default:
      return text
  }
}

type DisplayWordsProps = {
  calculationResult: CalculationResult
}

const DisplayWords = ({ calculationResult }: DisplayWordsProps) => {
  const { word, cipher, value, sharedWords, text } = calculationResult

  return (
    <div className="result-wrap">
      <p>
        The {cipher} value of {word} is {value}.
      </p>
      {sharedWords.length ? (
        <p>
          {text && text !== "default" ? (
            <span>
              Among words from {getTextName(text)}, this is shared by:
              <br />
            </span>
          ) : (
            <span>This is shared by:</span>
          )}{" "}
          <FormattedWords words={sharedWords} />
        </p>
      ) : (
        <p>No single word shares this value.</p>
      )}
    </div>
  )
}

export default DisplayWords
