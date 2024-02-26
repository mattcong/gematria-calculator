import { CalculationResult } from "../types/CalculationResult"
import FormattedWords from "./FormattedWords"
import Link from "next/link"
import AppBar from "./AppBar"

type DisplayWordsProps = {
  calculationResult: CalculationResult
  setCalculationResult: (data: null) => void
}

const DisplayWords = ({ calculationResult, setCalculationResult }: DisplayWordsProps) => {
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
            This is shared by: <FormattedWords words={sharedWords} />
          </p>
        ) : (
          <p>No single word shares this value.</p>
        )}
      </div>
    </div>
  )
}

export default DisplayWords
