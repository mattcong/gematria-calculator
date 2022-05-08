export type Alphabet = { [key: string]: number }

export class SimpleAlphabet {

    alphabet: Alphabet

    constructor() {
        this.alphabet = {}

        for (let i = 1; i < 27; i++) {
            this.alphabet[String.fromCharCode(i + 64)] = i
        }
    }

    use() {
        return this.alphabet
    }
}

export class BaseAlphabet extends SimpleAlphabet {

    multiplyer: number

    constructor(multiplyer: number) {
        super()
        this.multiplyer = multiplyer

        for (const v in this.alphabet) {
            this.alphabet[v] = this.alphabet[v] * multiplyer
        }
    }
}

export class ModularAlphabet extends SimpleAlphabet {

    modulus: number

    constructor(modulus: number) {
        super()
        this.modulus = modulus

        for (const v in this.alphabet) {
            this.alphabet[v] = (this.alphabet[v] - 1) % modulus + 1
        }
    }
}

export class IncrementalAlphabet extends SimpleAlphabet {

    incrementBy: number[]

    constructor(units: number[]) {
        super()
        this.incrementBy = units

        let numbers: number[] = []
        for (const n of units) {
            for (let i = 1; i < 10; i++) {
                numbers.push(i * n)
            }
        }
        let i = 0
        for (const v in this.alphabet) {
            this.alphabet[v] = numbers[i]
            i++
        }
    }
}