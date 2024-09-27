"use client"

import { useState, useEffect } from "react"
import MainInput from "../components/MainInput"
import DisplayWords from "../components/DisplayWords"
import { WordListMap } from "../types/WordListMap"
import { CalculationResult } from "../types/CalculationResult"
import { removeCalculatedWordAndShuffle } from "@/lib/sortWords"
import { SearchOptions } from "../types/SearchOptions"
import { HandUp } from "@/components/svg/HandUp"

export default function Home() {
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)
  const [calculatedWordLists, setCalculatedWordLists] = useState<WordListMap>({})
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    cipher: "Standard Gematria",
    text: "apocrypha",
  })
  const [showSearchButton, setShowSearchButton] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCalculateAlphabet = async (cipher: string, text: string) => {
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  const handleCalculateWord = async (word: string, cipher: string, text: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/calculate-word?word=${word}&cipher=${encodeURIComponent(cipher)}`
      )
      const data = await response.json()
      if (response.ok) {
        const { value } = data
        const shared = calculatedWordLists[`${cipher}`]
        const words: string[] = shared[value]
        const filteredWords = removeCalculatedWordAndShuffle(words, word)

        if (calculatedWordLists[`${cipher}`]) {
          const result = {
            word: word,
            cipher: cipher,
            value: value,
            sharedWords: filteredWords,
            text: text,
          }
          setCalculationResult(result)
        }
      } else {
        throw new Error(`Failed to fetch data from the API: ${data.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error in handleCalculateWord:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleShowSearch = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const { cipher, text } = searchOptions

  useEffect(() => {
    handleCalculateAlphabet(cipher, text || "")
  }, [cipher, text])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowSearchButton(true)
      } else {
        setShowSearchButton(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="search-container">
      <MainInput
        loading={loading}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleCalculate={handleCalculateWord}
      />
      {calculationResult && <DisplayWords calculationResult={calculationResult} />}
      {showSearchButton && (
        <button
          style={{
            all: "unset",
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={handleShowSearch}
        >
          <HandUp />
        </button>
      )}
    </div>
  )
}
