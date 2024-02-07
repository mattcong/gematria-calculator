export type CalculationResult = {
  word: string,
  cipher: string,
  value: string
  sharedWords: string[]
}

export type CalculationArgs = { word: string; cipher: string; text: string }
