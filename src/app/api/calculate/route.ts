import { Alphabet } from "../../../lib/alphabets"
import { ciphers } from "../../../lib/ciphers"
import { calculate } from "../../../lib/calculate"
import { displayWords } from "../../../lib/sortwords"
import { NextRequest, NextResponse } from "next/server"
import { wordListMaps } from "../../layout"

const headers = {
  "Content-Type": "application/json",
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url)
    const word = `${url.searchParams.get("word")}`
    const cipher = url.searchParams.get("cipher")

    const alphabet: Alphabet = ciphers[`${cipher}`]
    const inputValue = calculate(word, alphabet)

    let words: string[] | [] = []

    if (wordListMaps[`${cipher}`].has(inputValue)) {
      const wordMap = wordListMaps[`${cipher}`].get(inputValue) as string[]
      const shared = displayWords(wordMap, word)
      words = shared
    }

    const response = new NextResponse(JSON.stringify({ value: inputValue, words: words }), {
      status: 200,
      headers: headers,
    })
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
