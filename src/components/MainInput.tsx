import { useState } from "react"
import LoadingSpinner from "./LoadingSpinner"
import { SearchOptions } from "../types/SearchOptions"
import { ciphers } from "@/lib/ciphers"

type wordCalculate = (value: string, cipher: string, text: string) => Promise<void>
type numberCalculate = (value: string, cipher: string, text: string) => void

type MainInputProps = {
  loading: boolean
  searchOptions: SearchOptions
  setSearchOptions: (options: SearchOptions) => void
  handleCalculate: wordCalculate | numberCalculate
}

const MainInput = ({
  loading,
  searchOptions,
  setSearchOptions,
  handleCalculate,
}: MainInputProps) => {
  const { cipher, text } = searchOptions

  const [word, setWord] = useState("")
  const [showTexts, setShowTexts] = useState(text && true)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }
  const handleCipherSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCipher = event.currentTarget.value
    setSearchOptions({ ...searchOptions, cipher: selectedCipher })
  }
  const handleTextSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOptions({ ...searchOptions, text: event.currentTarget.value })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleCalculate(word, cipher, text || "")
  }

  const showTextDropdown = () => setShowTexts(true)

  return (
    <form onSubmit={handleSubmit}>
      <div className={`form-wrap`}>
        <label htmlFor="calculation-input">Find the value of:</label>
        <div className="input-wrap">
          <div className="input-border">
            <input
              className="input"
              type="text"
              value={word}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>
          <button className="button" type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : "Go"}
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
          {Object.keys(ciphers).map((cipherName, i) => {
            return (
              <option key={i} value={cipherName}>
                {cipherName}
              </option>
            )
          })}
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

export default MainInput
