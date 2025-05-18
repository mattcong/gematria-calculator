import { NextRequest } from 'next/server'
import { withErrorHandling } from '@/lib/errors/withErrorHandling'
import { ApiError } from '@/lib/errors/ApiError'
import { getRequiredParam } from '@/lib/getRequiredParam'
import { calculate } from '@/lib/calculate'
import { ciphers } from '@/lib/ciphers'

export const GET = withErrorHandling(async (req: NextRequest) => {
  const url = new URL(req.url)
  const word = getRequiredParam(url, 'word')
  const cipher = getRequiredParam(url, 'cipher')
  const alphabet = ciphers[cipher]
  if (!alphabet) throw new ApiError(`Unknown cipher "${cipher}"`, 404)

  const value = calculate(word, alphabet)
  return { word, cipher, value }
})
