import { NextRequest, NextResponse } from "next/server"
import {
  standardAlphabet,
  pythagoreanAlphabet,
  reversePythagoreanAlphabet,
  simpleAlphabet,
  multiple6Alphabet,
  customAlphabet,
} from "../../../lib/ciphers"
import { preCalculateValues } from "../../../lib/calculate"
import fs from "fs"
import path from "path"

const headers = {
  "Content-Type": "application/json",
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url)
    const cipher = `${url.searchParams.get("cipher")}`
    const text = `${url.searchParams.get("text")}`

    const localKjv = path.join(process.cwd(), "files", "bible-kjv.txt")
    const prodKjv = "/var/task/files/bible-kjv.txt"

    const localApocrypha = path.join(process.cwd(), "files", "apocrypha.txt")
    const prodApocrypha = "/var/task/files/apocrypha.txt"

    const localMormon = path.join(process.cwd(), "files", "mormon.txt")
    const prodMormon = "/var/task/files/mormon.txt"

    const localDefault = path.join(process.cwd(), "files", "british-english.txt")
    const prodDefault = "/var/task/files/british-english.txt"

    const kjvFile = process.env.NODE_ENV === "development" ? localKjv : prodKjv
    const apocryphaFile = process.env.NODE_ENV === "development" ? localApocrypha : prodApocrypha
    const mormonFile = process.env.NODE_ENV === "development" ? localMormon : prodMormon
    const defaultFile = process.env.NODE_ENV === "development" ? localDefault : prodDefault

    const filePath = text === "kjv" ? kjvFile : text === "apocrypha" ? apocryphaFile : defaultFile

    const wordList = fs.readFileSync(filePath, "utf-8").toString().split("\n")
    const wordListMap = preCalculateValues(wordList, getCipher(cipher))

    const response = new NextResponse(JSON.stringify({ [cipher]: wordListMap }), {
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

function getCipher(cipher: string) {
  switch (cipher) {
    case "Standard Gematria":
      return standardAlphabet.use()
    case "Pythagorean Gematria":
      return pythagoreanAlphabet.use()
    case "Reverse Pythagorean Gematria":
      return reversePythagoreanAlphabet.use()
    case "Simple Gematria":
      return simpleAlphabet.use()
    case "Multiple 6 Gematria":
      return multiple6Alphabet.use()
    case "Alphanumeric Qabbala":
      return customAlphabet.use()
    default:
      throw new Error("Unknown cipher")
  }
}
