import { useState } from "react"
import LoadingSpinner from "./LoadingSpinner"

type setString = React.Dispatch<React.SetStateAction<string>>
type setStringArr = React.Dispatch<React.SetStateAction<string[]>>

type MainInputProps = {
  cipher: string
  setCipher: setString
  word: string
  setWord: setString
  setValue: setString
  setWords: setStringArr
}

const MainInput = ({ cipher, setCipher, word, setWord, setValue, setWords }: MainInputProps) => {
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWord(event.target.value)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCipher(event.target.value)
  }

  const calculate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(
        `/api/calculate?word=${word}&cipher=${encodeURIComponent(cipher)}`
      )
      if (response.ok) {
        const data = await response.json()
        setValue(data.value)
        setWords(data.words)
      } else {
        const data = await response.json()
        console.log(data)
        throw new Error("Failed to fetch data from the API")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-wrap">
      <form onSubmit={calculate}>
        <label htmlFor="calculation-input">Find the value of:</label>
        <div className="input-wrap">
          <input className="input" type="text" value={word} onChange={handleInputChange} required />
          <button className="mid-button" type="submit">
            {loading ? <LoadingSpinner /> : "Go"}
          </button>
        </div>
        <label htmlFor="cipher">in</label>
        <select className="select-menu" value={cipher} onChange={handleSelectChange}>
          <option value="Standard Gematria">Standard Gematria</option>
          <option value="Reverse Standard Gematria">Reverse Standard</option>
          <option value="Pythagorean Gematria">Pythagorean Gematria</option>
          <option value="Reverse Pythagorean Gematria">Reverse Pythagorean</option>
          <option value="Simple Gematria">Simple Gematria</option>
          <option value="Multiple 6 Gematria">Multiple 6 Gematria</option>
        </select>
      </form>
    </div>
  )
}

export default MainInput
