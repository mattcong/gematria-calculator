'use client'

import { useState, useEffect } from 'react'
import { ApiError } from '@/lib/errors/ApiError'
import { fetcher } from '@/lib/fetcher'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    const ctl = new AbortController()
    setLoading(true)
    setError(null)

    fetcher<T>(url, { signal: ctl.signal })
      .then(setData)
      .catch((err) => {
        if (err.name !== 'AbortError')
          setError(err instanceof ApiError ? err : new ApiError(err.message, 500))
      })
      .finally(() => setLoading(false))

    return () => ctl.abort()
  }, [url])

  return { data, loading, error }
}
