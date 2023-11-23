import type { Metadata } from "next"
import "./globals.css"
import {
  standardAlphabet,
  pythagoreanAlphabet,
  reversePythagoreanAlphabet,
  reverseStandardAlphabet,
  simpleAlphabet,
  multiple6Alphabet,
} from "../lib/ciphers"
import { preCalculateValues } from "../lib/calculate"
import fs from "fs"
import path from "path"

export const metadata: Metadata = {
  title: "Gematria Calculator",
  description: "Decode words using various historical and non-historical ciphers.",
}

const filePath = path.join(process.cwd(), "files", "british-english.txt")
const wordList = fs.readFileSync(filePath, "utf-8").toString().split(" \n")

export const wordListMaps: { [key: string]: Map<number, string[]> } = {
  "Standard Gematria": preCalculateValues(wordList, standardAlphabet.use()),
  "Reverse Standard Gematria": preCalculateValues(wordList, reverseStandardAlphabet.use()),
  "Pythagorean Gematria": preCalculateValues(wordList, pythagoreanAlphabet.use()),
  "Reverse Pythagorean Gematria": preCalculateValues(wordList, reversePythagoreanAlphabet.use()),
  "Simple Gematria": preCalculateValues(wordList, simpleAlphabet.use()),
  "Multiple 6 Gematria": preCalculateValues(wordList, multiple6Alphabet.use()),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
