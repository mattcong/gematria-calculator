import { CalculationResult } from "../types/CalculationResult"
import FormattedWords from "./FormattedWords"

const getTextName = (text: string) => {
  switch (text) {
    case "kjv":
      return <span>The King James Bible</span>
    case "apocrypha":
      return <span>The Biblical Apocrypha</span>
    case "mormon":
      return <span>The Mormon Scriptures</span>
    default:
      return text
  }
}

export const DisplayNumberResults = ({
  calculationResult,
}: {
  calculationResult: CalculationResult
}) => {
  const { value, sharedWords, text } = calculationResult

  return (
    <div className="result-wrap">
      {sharedWords.length ? (
        <p>
          {text && text !== "default" ? (
            <span>
              Among words from {getTextName(text)}, the value {value} is shared by:
              <br />
            </span>
          ) : (
            <span>The value {value} is shared by:</span>
          )}{" "}
          <FormattedWords words={sharedWords} />
        </p>
      ) : (
        <p>No single word shares this value.</p>
      )}
    </div>
  )
}

export const DisplayWordResults = ({
  calculationResult,
}: {
  calculationResult: CalculationResult
}) => {
  const { word, cipher, value, sharedWords, text } = calculationResult

  return (
    <div className="result-wrap">
      <p>
        The {cipher} value of {word} is {value}.
      </p>
      {sharedWords.length && sharedWords[0] ? (
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
