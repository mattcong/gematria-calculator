import { Alphabet } from "./alphabets"


export function calculate(s: string, alphabet: Alphabet): number {
    let result: number[] = []

    for (const letter in alphabet) {
        [...s.toUpperCase()].forEach(e => {
            if (letter === e) { result.push(alphabet[letter]) }
        })
    }
    return result.reduce((a, b) => a + b)
}