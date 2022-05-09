import * as fs from 'fs';
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

export function findShared(words: string[], value: number, alphabet: Alphabet) {
    const sharedWords: string[] = []
    words.forEach(e => {if (value === calculate(e, alphabet)) { sharedWords.push(e) }}) 
    return sharedWords.toString().replaceAll(',', ', ')
}

export const wordList = fs.readFileSync('./public/british-english.txt', 'utf-8').toString().split(' \n')