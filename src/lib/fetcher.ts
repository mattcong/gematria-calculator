import { ApiError } from './errors/ApiError'

const isObject = (x: unknown): x is Record<string, unknown> => {
  return typeof x === 'object' && x !== null
}

export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)

  let payload: unknown
  try {
    payload = await res.json()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    throw new ApiError(`Invalid JSON response: ${msg}`, 502)
  }

  if (!res.ok) {
    let message: string
    if (isObject(payload) && 'error' in payload && typeof payload.error === 'string') {
      message = payload.error
    } else {
      message = res.statusText
    }
    throw new ApiError(message, res.status)
  }

  return payload as T
}
