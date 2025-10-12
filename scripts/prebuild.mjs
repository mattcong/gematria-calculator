#!/usr/bin/env node

/**
 * Prebuild script to generate static JSON files for all cipher/text combinations
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILES_DIR = path.join(__dirname, '..', 'files')
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'precalculated')

function calculate(word, alphabet) {
  const upperWord = word.toUpperCase()
  let sum = 0
  for (let i = 0; i < upperWord.length; i++) {
    const char = upperWord[i]
    const value = alphabet[char]
    if (value !== undefined) {
      sum += value
    }
  }
  return sum
}

function preCalculateValues(wordList, alphabet) {
  const words = {}
  wordList.forEach((word) => {
    const wordValue = calculate(word, alphabet).toString()
    if (!words[wordValue]) {
      words[wordValue] = []
    }
    words[wordValue].push(word)
  })
  return words
}

// Alphabet generators
function createSimpleAlphabet(isReverse = false, mapping = null) {
  const alphabet = {}
  if (mapping) {
    for (let i = 0; i < 26; i++) {
      alphabet[String.fromCharCode(i + 65)] = mapping[i]
    }
  } else if (!isReverse) {
    for (let i = 1; i < 27; i++) {
      alphabet[String.fromCharCode(i + 64)] = i
    }
  } else {
    let count = 1
    for (let i = 26; i > 0; i--) {
      alphabet[String.fromCharCode(i + 64)] = count++
    }
  }
  return alphabet
}

function createModularAlphabet(modulus, isReverse = false) {
  const alphabet = createSimpleAlphabet(isReverse)
  for (const v in alphabet) {
    alphabet[v] = ((alphabet[v] - 1) % modulus) + 1
  }
  return alphabet
}

function createMultipleAlphabet(multiplier, isReverse = false) {
  const alphabet = createSimpleAlphabet(isReverse)
  for (const v in alphabet) {
    alphabet[v] = alphabet[v] * multiplier
  }
  return alphabet
}

function createIncrementalAlphabet(units, isReverse = false, exceptions = []) {
  const alphabet = createSimpleAlphabet(isReverse)
  const numbers = []
  const step = Math.ceil(26 / units.length)
  for (const n of units) {
    for (let i = 1; i <= step; i++) {
      numbers.push(i * n)
    }
  }
  let i = 0
  for (const letter in alphabet) {
    alphabet[letter] = numbers[i]
    exceptions.forEach((exception) => {
      if (letter === exception.exceptionLetter) {
        alphabet[letter] = exception.exceptionValue
        i--
      }
    })
    i++
  }
  return alphabet
}

const standardAlphabetExceptions = [
  { exceptionLetter: 'J', exceptionValue: 600 },
  { exceptionLetter: 'V', exceptionValue: 700 },
  { exceptionLetter: 'W', exceptionValue: 900 },
]

const CIPHERS = {
  'Standard Gematria': createIncrementalAlphabet([1, 10, 100], false, standardAlphabetExceptions),
  'Pythagorean Gematria': createModularAlphabet(9, false),
  'Reverse Pythagorean Gematria': createModularAlphabet(9, true),
  'Simple Gematria': createSimpleAlphabet(false),
  'Multiple 6 Gematria': createMultipleAlphabet(6, false),
  'Alphanumeric Qabbala': createSimpleAlphabet(
    false,
    Array.from({ length: 26 }, (_, i) => i + 10),
  ),
}

const FILE_MAP = {
  kjv: 'bible-kjv.txt',
  apocrypha: 'apocrypha.txt',
  mormon: 'mormon.txt',
  'british-english': 'british-english.txt',
}

const CIPHER_KEY_MAP = {
  'Standard Gematria': 'standard',
  'Pythagorean Gematria': 'pythagorean',
  'Reverse Pythagorean Gematria': 'reverse-pythagorean',
  'Simple Gematria': 'simple',
  'Multiple 6 Gematria': 'multiple6',
  'Alphanumeric Qabbala': 'alphanumeric',
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`✓ Created directory: ${dirPath}`)
  }
}

function main() {
  console.log('Starting prebuild computation...\n')

  ensureDirectoryExists(OUTPUT_DIR)

  let totalFiles = 0
  let totalSize = 0

  // Iterate through each text file
  Object.entries(FILE_MAP).forEach(([textKey, filename]) => {
    console.log(`Processing ${textKey} (${filename})...`)

    const filePath = path.join(FILES_DIR, filename)
    const rawContent = fs.readFileSync(filePath, 'utf-8')
    const words = rawContent.split('\n').filter(Boolean)

    console.log(`Found ${words.length.toLocaleString()} words`)

    Object.entries(CIPHERS).forEach(([cipherName, alphabet]) => {
      const cipherKey = CIPHER_KEY_MAP[cipherName]

      if (!cipherKey) {
        console.warn(`Unknown cipher: ${cipherName}`)
        return
      }

      const startTime = Date.now()
      const wordListMap = preCalculateValues(words, alphabet)
      const duration = Date.now() - startTime

      const result = { [cipherName]: wordListMap }

      const outputFilename = `${cipherKey}-${textKey}.json`
      const outputPath = path.join(OUTPUT_DIR, outputFilename)
      const jsonContent = JSON.stringify(result)

      fs.writeFileSync(outputPath, jsonContent)

      const sizeKB = (jsonContent.length / 1024).toFixed(2)
      totalSize += jsonContent.length
      totalFiles++

      console.log(`✓ ${cipherKey}: ${sizeKB} KB (${duration}ms)`)
    })

    console.log()
  })

  console.log(`Prebuild complete`)
  console.log(`   Files generated: ${totalFiles}`)
  console.log(`   Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   Output directory: ${OUTPUT_DIR}`)
}

try {
  main()
} catch (error) {
  console.error('Prebuild failed:', error)
  process.exit(1)
}
