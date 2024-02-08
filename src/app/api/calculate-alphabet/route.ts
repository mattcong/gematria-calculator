import { NextRequest, NextResponse } from "next/server"
import {
  standardAlphabet,
  pythagoreanAlphabet,
  reversePythagoreanAlphabet,
  reverseStandardAlphabet,
  simpleAlphabet,
  multiple6Alphabet,
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

    const getFilePath = (fileName: string) => {
      const basePath = process.env.NODE_ENV === "development" ? process.cwd() : "/var/task"

      return path.join(basePath, "files", fileName)
    }

    const fileNameMap: { [key: string]: string } = {
      kjv: "bible-kjv.txt",
      apocrypha: "apocrypha.txt",
      default: "british-english.txt",
    }

    const filePath = getFilePath(fileNameMap[text])

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
    case "Reverse Standard Gematria":
      return reverseStandardAlphabet.use()
    case "Pythagorean Gematria":
      return pythagoreanAlphabet.use()
    case "Reverse Pythagorean Gematria":
      return reversePythagoreanAlphabet.use()
    case "Simple Gematria":
      return simpleAlphabet.use()
    case "Multiple 6 Gematria":
      return multiple6Alphabet.use()
    default:
      throw new Error("Unknown cipher")
  }
}
