import { Alphabet } from '../types/Alphabet'

export class SimpleAlphabet {
  alphabet: Alphabet
  isReverse: boolean

  constructor(isReverse: boolean, options?: { mapping?: number[] }) {
    this.alphabet = {}
    this.isReverse = isReverse

    if (options && options.mapping) {
      // Use the custom mapping
      for (let i = 0; i < 26; i++) {
        this.alphabet[String.fromCharCode(i + 65)] = options.mapping[i]
      }
    } else {
      // Use the default mapping
      if (!isReverse) {
        for (let i = 1; i < 27; i++) {
          this.alphabet[String.fromCharCode(i + 64)] = i
        }
      }
      if (isReverse) {
        let count = 1
        for (let i = 26; i > 0; i--) {
          this.alphabet[String.fromCharCode(i + 64)] = count++
        }
      }
    }
  }

  use() {
    return this.alphabet
  }
}

export class MultipleAlphabet extends SimpleAlphabet {
  multiplier: number

  constructor(multiplier: number, isReverse: boolean) {
    super(isReverse)
    this.multiplier = multiplier

    for (const v in this.alphabet) {
      this.alphabet[v] = this.alphabet[v] * multiplier
    }
  }
}

export class ModularAlphabet extends SimpleAlphabet {
  modulus: number

  constructor(modulus: number, isReverse: boolean) {
    super(isReverse)
    this.modulus = modulus

    for (const v in this.alphabet) {
      this.alphabet[v] = ((this.alphabet[v] - 1) % modulus) + 1
    }
  }
}

type Exceptions = {
  exceptionLetter: string
  exceptionValue: number
}[]
export class IncrementalAlphabet extends SimpleAlphabet {
  incrementBy: number[]
  exceptions: Exceptions | undefined

  constructor(units: number[], isReverse: boolean, exceptions?: Exceptions) {
    super(isReverse)
    this.incrementBy = units
    this.exceptions = exceptions

    const numbers: number[] = []
    const step = Math.ceil(26 / units.length)
    for (const n of units) {
      for (let i = 1; i <= step; i++) {
        numbers.push(i * n)
      }
    }
    let i = 0
    for (const letter in this.alphabet) {
      this.alphabet[letter] = numbers[i]

      const exceptions = this.exceptions
      if (exceptions && exceptions.length) {
        exceptions.forEach((exception) => {
          const { exceptionLetter, exceptionValue } = exception
          if (letter === exceptionLetter) {
            this.alphabet[letter] = exceptionValue

            //step back so next letter value follows in sequence from letter before exception
            //TODO: probably want to add disable flag for this
            i--
          }
        })
      }
      i++
    }
  }
}
