import { Alphabet, SimpleAlphabet, BaseAlphabet, ModularAlphabet, IncrementalAlphabet } from '../alphabets'


test("create simple alphabet", () => {

    const simpleAlphabet = new SimpleAlphabet()

    expect(simpleAlphabet.use()["A"]).toStrictEqual(1)
    expect(simpleAlphabet.use()["B"]).toStrictEqual(2)
    expect(simpleAlphabet.use()["Y"]).toStrictEqual(25)
    expect(simpleAlphabet.use()["Z"]).toStrictEqual(26)
})

test("create base alphabet with multiplyer of 6", () => {

    const baseAlphabet = new BaseAlphabet(6)

    expect(baseAlphabet.use()["A"]).toStrictEqual(6)
    expect(baseAlphabet.use()["B"]).toStrictEqual(12)
    expect(baseAlphabet.use()["Y"]).toStrictEqual(150)
    expect(baseAlphabet.use()["Z"]).toStrictEqual(156)
})

test("create modular alphabet with modulus of 9", () => {

    const modularAlphabet = new ModularAlphabet(9)

    expect(modularAlphabet.use()["A"]).toStrictEqual(1)
    expect(modularAlphabet.use()["B"]).toStrictEqual(2)
    expect(modularAlphabet.use()["Y"]).toStrictEqual(7)
    expect(modularAlphabet.use()["Z"]).toStrictEqual(8)
})

test("create incremental alphabet from units 1, 10, 100", () => {

    const incrementalAlphabet = new IncrementalAlphabet([1, 10, 100])

    expect(incrementalAlphabet.use()["A"]).toStrictEqual(1)
    expect(incrementalAlphabet.use()["J"]).toStrictEqual(10)
    expect(incrementalAlphabet.use()["S"]).toStrictEqual(100)
    expect(incrementalAlphabet.use()["Z"]).toStrictEqual(800)
})