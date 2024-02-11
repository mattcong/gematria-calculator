"use client"

import { useState, useEffect } from "react"
import MainInput from "../components/MainInput"
import DisplayWords from "../components/DisplayWords"
import Footer from "../components/BottomNav"
import { WordListMap } from "../../types/WordListMap"
import { CalculationResult } from "../../types/CalculationResult"
import { displayWords } from "@/lib/sortwords"
import { SearchOptions } from "../../types/SearchOptions"

export default function Home() {
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)
  const [calculatedWordLists, setCalculatedWordLists] = useState<WordListMap>({})
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    cipher: "Standard Gematria",
    text: undefined,
  })

  const { cipher, text } = searchOptions

  useEffect(() => {
    setCalculatedWordLists({})
    handleCalculateAlphabet(cipher, text || "")
  }, [text])

  const handleCalculateAlphabet = async (cipher: string, text: string) => {
    try {
      const response = await fetch(`/api/calculate-alphabet?cipher=${cipher}&text=${text}`)
      const data = await response.json()
      if (response.ok) {
        setCalculatedWordLists((prevMaps: WordListMap) => ({
          ...prevMaps,
          ...data,
        }))
        return data
      } else {
        console.log(data)
        throw new Error(`Failed to fetch data from the API: ${data.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error in handleCalculateAlphabet:", error)
      throw error
    }
  }

  const handleCalculateWord = async (word: string, cipher: string) => {
    try {
      const response = await fetch(
        `/api/calculate-word?word=${word}&cipher=${encodeURIComponent(cipher)}`
      )
      const data = await response.json()
      if (response.ok) {
        const { value, word, cipher } = data

        let words: string[] | [] = []
        if (calculatedWordLists[`${cipher}`]) {
          const wordArray = calculatedWordLists[`${cipher}`][value]
          const shared = displayWords([...wordArray], word)
          words = shared
        }
        return { ...data, sharedWords: words }
      } else {
        throw new Error(`Failed to fetch data from the API: ${data.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error in handleCalculateWord:", error)
      throw error
    }
  }

  return (
    <>
      <div className="container">
        {!calculationResult ? (
          <MainInput
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
            handleCalculate={handleCalculateWord}
            calculatedWordLists={calculatedWordLists}
            handleCalculateAlphabet={handleCalculateAlphabet}
            setCalculationResult={setCalculationResult}
          />
        ) : (
          <DisplayWords
            calculationResult={calculationResult}
            setCalculationResult={setCalculationResult}
          />
        )}
      </div>
      <Footer />
    </>
  )
}
