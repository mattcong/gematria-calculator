import { CalculationResult } from "../types/CalculationResult"
import FormattedWords from "./FormattedWords"
import Link from "next/link"
import AppBar from "./AppBar"

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
  text: string | undefined
  calculationResult: CalculationResult
  setCalculationResult: (data: null) => void
}

const DisplayWords = ({ text, calculationResult, setCalculationResult }: DisplayWordsProps) => {
  const { word, cipher, value, sharedWords } = calculationResult

  return (
    <div className="container">
      <AppBar>
        <Link href="/" className="button" onClick={() => setCalculationResult(null)}>
          Back
        </Link>
      </AppBar>
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
    </div>
  )
}

export default DisplayWords
