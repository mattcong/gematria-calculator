import { useEffect, useState } from "react"
import LoadingSpinner from "./LoadingSpinner"
import { CalculationResult } from "../types/CalculationResult"
import { WordListMap } from "../types/WordListMap"
import { SearchOptions } from "../types/SearchOptions"

const MainInput = ({
  searchOptions,
  setSearchOptions,
  handleCalculate,
  handleCalculateAlphabet,
  setCalculationResult,
  calculatedWordLists,
}: MainInputProps) => {
  const { cipher, text } = searchOptions

  const [loading, setLoading] = useState(false)
  const [alphabetLoading, setAlphabetLoading] = useState(false)
  const [word, setWord] = useState("")
  const [showTexts, setShowTexts] = useState(text && true)

  const getAlphabet = async () => {
    setAlphabetLoading(true)
    await handleCalculateAlphabet(cipher, text || "")
    setAlphabetLoading(false)
  }

  const calculate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const data = await handleCalculate(word, cipher, text || "")
    setCalculationResult(data)
    setLoading(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }
  const handleCipherSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOptions({ ...searchOptions, cipher: event.currentTarget.value })
    if (Object.keys(calculatedWordLists).includes(cipher)) {
      return
    }
    getAlphabet()
  }
  const handleTextSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOptions({ ...searchOptions, text: event.currentTarget.value })
  }

  const showTextDropdown = () => setShowTexts(true)

  const isLoading = loading || alphabetLoading

  useEffect(() => {
    if (Object.keys(calculatedWordLists).includes(cipher)) {
      return
    }
    getAlphabet()
  }, [cipher, text])

  return (
    <form onSubmit={calculate}>
      <div className="form-wrap">
        <label htmlFor="calculation-input">Find the value of:</label>
        <div className="input-wrap">
          <div className="input-border">
            <input
              className="input"
              type="text"
              value={word}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : "Go"}
          </button>
        </div>
        <div className="controls-container">
          <div className="select-wrap input-option">
            <CipherSelect value={cipher} onChange={handleCipherSelect} />
          </div>
          <div className="select-wrap input-option">
            {showTexts ? (
              <TextSelect value={text} onChange={handleTextSelect} />
            ) : (
              <button className="button input-option" type="button" onClick={showTextDropdown}>
                Choose Text
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

const CipherSelect = ({
  value,
  onChange,
}: {
  value: string | undefined
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
  return (
    <>
      <label htmlFor="cipher">in</label>
      <div className="select-menu-border">
        <select className="select-menu" value={value} onChange={onChange}>
          <option value="Standard Gematria">Standard Gematria</option>
          <option value="Reverse Standard Gematria">Reverse Standard</option>
          <option value="Pythagorean Gematria">Pythagorean Gematria</option>
          <option value="Reverse Pythagorean Gematria">Reverse Pythagorean</option>
          <option value="Simple Gematria">Simple Gematria</option>
          <option value="Multiple 6 Gematria">Multiple 6 Gematria</option>
        </select>
      </div>
    </>
  )
}

const TextSelect = ({
  value,
  onChange,
}: {
  value: string | undefined
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
  return (
    <>
      <label htmlFor="cipher">using</label>
      <div className="select-menu-border">
        <select className="select-menu input-option" value={value} onChange={onChange}>
          <option value="default">No Text</option>
          <option value="kjv">Holy Bible (KJV)</option>
          <option value="apocrypha">Apocrypha</option>
        </select>
      </div>
    </>
  )
}

type MainInputProps = {
  searchOptions: SearchOptions
  setSearchOptions: (options: SearchOptions) => void
  handleCalculateAlphabet: (cipher: string, text: string) => Promise<CalculationResult>
  handleCalculate: (word: string, cipher: string, text: string) => Promise<CalculationResult>
  setCalculationResult: (data: CalculationResult) => void
  calculatedWordLists: WordListMap
}

export default MainInput
