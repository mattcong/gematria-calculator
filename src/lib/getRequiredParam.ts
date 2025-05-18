import { ApiError } from './errors/ApiError'

export function getRequiredParam(url: URL, key: string): string {
  const param = url.searchParams.get(key)
  if (!param) {
    throw new ApiError(`"${key}" query param is required`, 400)
  }
  return param
}
