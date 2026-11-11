'use client'

import { useEffect, useState } from 'react'
import { DisplayNumberResults, DisplayWordResults } from '@/components/DisplayWords'
import { MainInput } from '@/components/MainInput'
import { HandUp } from '@/components/svg/HandUp'
import { useAlphabet } from '@/hooks/useAlphabet'
import { useWordCalculation } from '@/hooks/useWordCalculation'
import type { SearchOptions } from '@/types/SearchOptions'

export default function Home() {
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    cipher: 'Standard Gematria',
    text: 'apocrypha',
  })
  const [showSearchButton, setShowSearchButton] = useState(false)

  const { cipher, text } = searchOptions
  const {
    data: alphabets,
    loading: alphabetsLoading,
    error: alphabetsError,
  } = useAlphabet(cipher, text)
  const {
    data: calculationResult,
    loading: calculationLoading,
    error: calculationError,
    calculate,
  } = useWordCalculation(alphabets)

  const loading = alphabetsLoading || calculationLoading

  useEffect(() => {
    const onScroll = () => setShowSearchButton(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCalculate = (value: string) => {
    calculate(value, cipher, text)
  }

  return (
    <div className="search-container">
      {alphabetsError && <p className="input-error">Error: Failed to load word lists.</p>}
      {calculationError && <p className="input-error">Error: Unable to calculate word.</p>}
      <MainInput
        loading={loading}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleCalculate={handleCalculate}
      />
      {calculationResult &&
        (calculationResult.word ? (
          <DisplayWordResults calculationResult={calculationResult} />
        ) : (
          <DisplayNumberResults calculationResult={calculationResult} />
        ))}

      {showSearchButton && (
        <button
          type="button"
          className="scroll-button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <HandUp />
        </button>
      )}
    </div>
  )
}
