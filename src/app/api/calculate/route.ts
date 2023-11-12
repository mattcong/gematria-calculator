import { Alphabet } from "../../../lib/alphabets"
import { ciphers } from "../../../lib/ciphers"
import { calculate, findShared } from "../../../lib/calculate"
import { displayWords } from "../../../lib/sortwords"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const headers = {
  "Content-Type": "application/json",
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const filePath = path.join(
      process.cwd(),
      "files",
      "british-english.txt"
    )
    const wordList = fs.readFileSync(filePath, "utf-8").toString().split(" \n")

    const url = new URL(req.url)
    const word = `${url.searchParams.get("word")}`
    const cipher = url.searchParams.get("cipher")

    const alphabet: Alphabet = ciphers[`${cipher}`]
    const inputValue = calculate(word, alphabet)
    const shared = displayWords(findShared(wordList, inputValue, alphabet), word)

    const response = new NextResponse(JSON.stringify({ value: inputValue, words: shared }), {
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
