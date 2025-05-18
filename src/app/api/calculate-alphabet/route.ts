import { NextRequest } from 'next/server'
import { withErrorHandling } from '@/lib/errors/withErrorHandling'
import { getRequiredParam } from '@/lib/getRequiredParam'
import { getCipher } from '@/lib/getCipher'
import { preCalculateValues } from '@/lib/calculate'
import fs from 'fs'
import path from 'path'

const BASE =
  process.env.NODE_ENV === 'development' ? path.join(process.cwd(), 'files') : '/var/task/files'

const FILE_MAP: Record<string, string> = {
  kjv: 'bible-kjv.txt',
  apocrypha: 'apocrypha.txt',
  mormon: 'mormon.txt',
  default: 'british-english.txt',
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const url = new URL(req.url)
  const cipher = getRequiredParam(url, 'cipher')
  const text = getRequiredParam(url, 'text')

  const alphabet = getCipher(cipher)
  const fname = FILE_MAP[text] ?? FILE_MAP.default
  const raw = fs.readFileSync(path.join(BASE, fname), 'utf-8')
  const words = raw.split('\n')
  const wordListMap = preCalculateValues(words, alphabet)

  return { [cipher]: wordListMap }
})
