import { SimpleAlphabet, BaseAlphabet, ModularAlphabet, IncrementalAlphabet } from "./alphabets"


const simpleAlphabet: SimpleAlphabet = new SimpleAlphabet()

const base6Alphabet: BaseAlphabet = new BaseAlphabet(6)

const pythagoreanAlphabet: ModularAlphabet = new ModularAlphabet(9)

const hebrewAlphabet: IncrementalAlphabet = new IncrementalAlphabet([1, 10, 100])

export { simpleAlphabet, base6Alphabet, pythagoreanAlphabet, hebrewAlphabet }