export type Alphabet = { [key: string]: number }

export class SimpleAlphabet {

    alphabet: Alphabet
    isReverse: Boolean

    constructor(isReverse: Boolean) {
        this.alphabet = {}
        this.isReverse = isReverse

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

    use() {
        return this.alphabet
    }
}

export class MultipleAlphabet extends SimpleAlphabet {

    multiplyer: number

    constructor(multiplyer: number, isReverse: boolean) {
        super(isReverse)
        this.multiplyer = multiplyer

        for (const v in this.alphabet) {
            this.alphabet[v] = this.alphabet[v] * multiplyer
        }
    }
}

export class ModularAlphabet extends SimpleAlphabet {

    modulus: number

    constructor(modulus: number, isReverse: boolean) {
        super(isReverse)
        this.modulus = modulus

        for (const v in this.alphabet) {
            this.alphabet[v] = (this.alphabet[v] - 1) % modulus + 1
        }
    }
}

export class IncrementalAlphabet extends SimpleAlphabet {

    incrementBy: number[]

    constructor(units: number[], isReverse: boolean) {
        super(isReverse)
        this.incrementBy = units

        let numbers: number[] = []
        const step = Math.ceil(26 / units.length)
        for (const n of units) {
            for (let i = 1; i <= step; i++) {
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