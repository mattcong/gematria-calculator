import { CalculationResult } from "../../types/CalculationResult"
import FormattedWords from "./FormattedWords"

type DisplayWordsProps = {
  calculationResult: CalculationResult
  setCalculationResult: (data: null) => void
}

const DisplayWords = ({ calculationResult, setCalculationResult }: DisplayWordsProps) => {
  const { word, cipher, value, sharedWords } = calculationResult

  return (
    <>
      <button className="button" onClick={() => setCalculationResult(null)}>
        Back
      </button>
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
