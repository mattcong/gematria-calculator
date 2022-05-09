import { SimpleAlphabet, BaseAlphabet, ModularAlphabet, IncrementalAlphabet } from "./alphabets";


const simpleAlphabet: SimpleAlphabet = new SimpleAlphabet()

const base6Alphabet: BaseAlphabet = new BaseAlphabet(6)

const pythagoreanAlphabet: ModularAlphabet = new ModularAlphabet(9)

const hebrewAlphabet: IncrementalAlphabet = new IncrementalAlphabet([1, 10, 100])


export type Cipher = 
| "Simple Gematria" 
| "Base 6 Gematria"  
| "Pythagorean Gematria" 
| "Hebrew Gematria"

export const ciphers = {
    "Simple Gematria": simpleAlphabet.use(),
    "Base 6 Gematria": base6Alphabet.use(),
    "Pythagorean Gematria": pythagoreanAlphabet.use(),
    "Hebrew Gematria": hebrewAlphabet.use(),
}