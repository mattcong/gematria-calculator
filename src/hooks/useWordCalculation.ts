'use client'

import { useState, useCallback } from 'react'
import { ApiError } from '@/lib/errors/ApiError'
import { fetcher } from '@/lib/fetcher'
import { removeCalculatedWordAndShuffle } from '@/lib/removeCalculatedWordAndShuffle'
import { CalculationResult } from '@/types/CalculationResult'
import { WordListMap } from '@/types/WordListMap'

interface WordCalculationReturn {
  data: CalculationResult | null
  loading: boolean
  error: ApiError | null
  calculate: (input: string, cipher: string, text: string) => Promise<void>
}

export const useWordCalculation = (alphabetMap: WordListMap | null): WordCalculationReturn => {
  const [data, setData] = useState<CalculationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const calculate = useCallback(
    async (input: string, cipher: string, text: string) => {
      setError(null)
      setLoading(true)
      try {
        if (!alphabetMap) {
          throw new ApiError('Alphabet map not loaded', 503)
        }

        const normalized = input.trim()
        const isNumeric = /^\d+$/.test(normalized)
        let calculatedValue: number

        if (isNumeric) {
          calculatedValue = Number(normalized)
        } else {
          const { value } = await fetcher<{ value: number }>(
            `/api/calculate-word?word=${encodeURIComponent(
              normalized,
            )}&cipher=${encodeURIComponent(cipher)}`,
          )
          calculatedValue = value
        }

        const shared = alphabetMap[cipher] ?? {}
        const words = shared[calculatedValue] ?? []

        setData({
          ...(isNumeric ? {} : { word: normalized }),
          cipher,
          value: `${calculatedValue}`,
          sharedWords: removeCalculatedWordAndShuffle(words, isNumeric ? '' : normalized),
          text,
        })
      } catch (err) {
        setError(err instanceof ApiError ? err : new ApiError((err as Error).message, 500))
      } finally {
        setLoading(false)
      }
    },
    [alphabetMap],
  )

  return { data, loading, error, calculate }
}
