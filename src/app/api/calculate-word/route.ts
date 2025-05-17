import { Alphabet } from '../../../types/Alphabet'

import { ciphers } from '../../../lib/ciphers'
import { calculate } from '../../../lib/calculate'
import { NextRequest, NextResponse } from 'next/server'

const headers = {
  'Content-Type': 'application/json',
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const word = `${url.searchParams.get('word')}`
    const cipher = `${url.searchParams.get('cipher')}`

    const alphabet: Alphabet = ciphers[cipher]
    const inputValue = calculate(word, alphabet)

    const response = new NextResponse(
      JSON.stringify({ word: word, cipher: cipher, value: inputValue }),
      {
        status: 200,
        headers: headers,
      },
    )
    return response
  } catch (error) {
    console.error(error)
    const response = new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: headers,
    })
    return response
  }
}
