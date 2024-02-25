import { CalculationResult } from "../types/CalculationResult"
import FormattedWords from "./FormattedWords"
import Link from "next/link"

type DisplayWordsProps = {
  calculationResult: CalculationResult
  setCalculationResult: (data: null) => void
}

const DisplayWords = ({ calculationResult, setCalculationResult }: DisplayWordsProps) => {
  const { word, cipher, value, sharedWords } = calculationResult

  return (
    <>
      <Link href="/" className="button" onClick={() => setCalculationResult(null)}>
        Back
      </Link>
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
    </>
  )
}

export default DisplayWords
