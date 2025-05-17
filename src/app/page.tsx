'use client'

import { useState, useEffect } from 'react'
import MainInput from '../components/MainInput'
import { DisplayWordResults, DisplayNumberResults } from '../components/DisplayWords'
import { WordListMap } from '../types/WordListMap'
import { CalculationResult } from '../types/CalculationResult'
import { removeCalculatedWordAndShuffle } from '@/lib/removeCalculatedWordAndShuffle'
import { SearchOptions } from '../types/SearchOptions'
import { HandUp } from '@/components/svg/HandUp'

export default function Home() {
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)
  const [calculatedWordLists, setCalculatedWordLists] = useState<WordListMap>({})
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    cipher: 'Standard Gematria',
    text: 'apocrypha',
  })
  const [showSearchButton, setShowSearchButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isNumber, setIsNumber] = useState(false)

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
        throw new Error(`Failed to fetch data from the API: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error in handleCalculateAlphabet:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleCalculateWord = async (word: string, cipher: string, text: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/calculate-word?word=${word}&cipher=${encodeURIComponent(cipher)}`,
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
        throw new Error(`Failed to fetch data from the API: ${data.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error in handleCalculateWord:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleCalculateNumber = (number: string, cipher: string, text: string) => {
    const shared = calculatedWordLists[`${cipher}`]
    const words: string[] = shared[Number(number)]
    const filteredWords = removeCalculatedWordAndShuffle(words, '')

    if (calculatedWordLists[`${cipher}`]) {
      const result = {
        cipher: cipher,
        value: number,
        sharedWords: filteredWords,
        text: text,
      }
      setCalculationResult(result)
    }
  }

  const handleCalculate = (value: string, cipher: string, text: string) => {
    const isNumber = (value: string) => /^\d+$/.test(value)
    const formattedNumberInput = value.replaceAll(' ', '')

    if (isNumber(formattedNumberInput)) {
      setIsNumber(true)
      handleCalculateNumber(formattedNumberInput, cipher, text)
    } else {
      setIsNumber(false)
      handleCalculateWord(value, cipher, text)
    }
  }

  const handleShowSearch = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const { cipher, text } = searchOptions

  useEffect(() => {
    if (calculatedWordLists[`${cipher}`]) {
      return
    }
    handleCalculateAlphabet(cipher, text)
  }, [cipher, text, calculatedWordLists])

  useEffect(() => {
    if (Object.keys(calculatedWordLists).length > 0) {
      setCalculatedWordLists({})
    }
    handleCalculateAlphabet(cipher, text)
  }, [text, cipher])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowSearchButton(true)
      } else {
        setShowSearchButton(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="search-container">
      <MainInput
        loading={loading}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleCalculate={handleCalculate}
      />
      {calculationResult &&
        (isNumber ? (
          <DisplayNumberResults calculationResult={calculationResult} />
        ) : (
          <DisplayWordResults calculationResult={calculationResult} />
        ))}
      {showSearchButton && (
        <button
          style={{
            all: 'unset',
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1,
            cursor: 'pointer',
          }}
          onClick={handleShowSearch}
        >
          <HandUp />
        </button>
      )}
    </div>
  )
}
