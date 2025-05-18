'use client'

import { useFetch } from './useFetch'
import { WordListMap } from '@/types/WordListMap'

export const useAlphabet = (cipher: string, text: string) =>
  useFetch<WordListMap>(`/api/calculate-alphabet?cipher=${cipher}&text=${text}`)
