import { calculate } from '../calculate'
import { simpleAlphabet, base6Alphabet, pythagoreanAlphabet, hebrewAlphabet } from "../ciphers"


test("calculate simple value", () => {
    expect(calculate("abcde", simpleAlphabet.use())).toStrictEqual(15)
})

test("calculate base 6 value", () => {
    expect(calculate("abcde", base6Alphabet.use())).toStrictEqual(90)
})

test("calculate pythagorean value", () => {
    expect(calculate("abjsz", pythagoreanAlphabet.use())).toStrictEqual(13)
})

test("calculate hebrew value", () => {
    expect(calculate("abjsz", hebrewAlphabet.use())).toStrictEqual(913)
})