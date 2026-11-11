'use client'

import { useEffect, useState } from 'react'
import { getCipherKey } from '@/lib/getCipherKey'
import type { WordListMap } from '@/types/WordListMap'
import { useFetch } from './useFetch'

export const useAlphabet = (cipher: string, text: string) => {
  const [calculatedAlphabets, setCalculatedAlphabets] = useState<WordListMap | null>(null)

  // Fetch precomputed JSON file
  const cipherKey = getCipherKey(cipher)
  const staticFileUrl = `/precalculated/${cipherKey}-${text}.json`

  const res = useFetch<WordListMap>(staticFileUrl)

  useEffect(() => {
    if (res.data) {
      setCalculatedAlphabets((prev) => ({
        ...prev,
        ...res.data,
      }))
    }
  }, [res.data])

  return { ...res, data: calculatedAlphabets }
}
