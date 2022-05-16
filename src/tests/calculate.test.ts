import { calculate } from '../modules/calculate'
import { simpleAlphabet, standardAlphabet, reverseStandardAlphabet, pythagoreanAlphabet, reversePythagoreanAlphabet, multiple6Alphabet } from "../modules/ciphers"


test("calculate simple value", () => {
    expect(calculate("abcde", simpleAlphabet.use())).toStrictEqual(15)
})

test("calculate standard value", () => {
    expect(calculate("abjsz", standardAlphabet.use())).toStrictEqual(913)
})

test("calculate reverse standard value", () => {
    expect(calculate("abjsz", reverseStandardAlphabet.use())).toStrictEqual(1589)
})

test("calculate pythagorean value", () => {
    expect(calculate("abjsz", pythagoreanAlphabet.use())).toStrictEqual(13)
})

test("calculate reverse pythagorean value", () => {
    expect(calculate("abjsz", reversePythagoreanAlphabet.use())).toStrictEqual(32)
})

test("calculate multiple 6 value", () => {
    expect(calculate("abcde", multiple6Alphabet.use())).toStrictEqual(90)
})