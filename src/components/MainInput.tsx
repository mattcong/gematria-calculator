import { useEffect, useState } from "react"
import LoadingSpinner from "./LoadingSpinner"
import { CalculationResult } from "../../types/CalculationResult"
import { WordListMap } from "../../types/WordListMap"

const MainInput = ({
  handleCalculate,
  handleCalculateAlphabet,
  setCalculationResult,
  calculatedWordLists,
  setCalculatedAlphabets,
}: MainInputProps) => {
  const [loading, setLoading] = useState(false)
  const [alphabetLoading, setAlphabetLoading] = useState(true)
  const [showTexts, setShowTexts] = useState(false)
  const [cipher, setCipher] = useState("Standard Gematria")
  const [text, setText] = useState("")
  const [word, setWord] = useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }
  const handleCipherSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCipher(event.target.value)
  }
  const handleTextSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setText(event.target.value)
  }

  const showTextDropdown = () => setShowTexts(true)

  const getAlphabet = async () => {
    setAlphabetLoading(true)
    await handleCalculateAlphabet(cipher, text)
    setAlphabetLoading(false)
  }

  const calculate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const data = await handleCalculate(word, cipher, text)
    setCalculationResult(data)
    setLoading(false)
  }

  useEffect(() => {
    setText("")
  }, [])

  useEffect(() => {
    setCalculatedAlphabets({})
    getAlphabet()
  }, [text])

  useEffect(() => {
    if (Object.keys(calculatedWordLists).includes(cipher)) {
      return
    }
    getAlphabet()
  }, [cipher])

  return (
    <form onSubmit={calculate}>
      <div className="form-wrap">
        <label htmlFor="calculation-input">Find the value of:</label>
        <div className="input-wrap">
          <input className="input" type="text" value={word} onChange={handleInputChange} required />
          <button className="mid-button" type="submit">
            {loading || alphabetLoading ? <LoadingSpinner /> : "Go"}
          </button>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <label htmlFor="cipher">in</label>
            <select className="select-menu" value={cipher} onChange={handleCipherSelect}>
              <option value="Standard Gematria">Standard Gematria</option>
              <option value="Reverse Standard Gematria">Reverse Standard</option>
              <option value="Pythagorean Gematria">Pythagorean Gematria</option>
              <option value="Reverse Pythagorean Gematria">Reverse Pythagorean</option>
              <option value="Simple Gematria">Simple Gematria</option>
              <option value="Multiple 6 Gematria">Multiple 6 Gematria</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {showTexts ? (
              <>
                <label htmlFor="cipher">using</label>
                <select
                  className="select-menu"
                  value={text}
                  onChange={handleTextSelect}
                >
                  <option value="none">No Text</option>
                  <option value="kjv">Holy Bible (KJV)</option>
                </select>
              </>
            ) : (
              <button className="small-button" type="button" onClick={showTextDropdown}>
                Choose Text
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

type MainInputProps = {
  handleCalculateAlphabet: (cipher: string, text: string) => Promise<CalculationResult>
  handleCalculate: (word: string, cipher: string, text: string) => Promise<CalculationResult>
  setCalculationResult: (data: CalculationResult) => void
  calculatedWordLists: WordListMap
  setCalculatedAlphabets: any
}

export default MainInput
