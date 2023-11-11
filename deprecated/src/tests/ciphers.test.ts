import { SimpleAlphabet, MultipleAlphabet, ModularAlphabet, IncrementalAlphabet } from '../modules/alphabets'


const reverse = true
const regular = false

test("create incremental alphabet from units 1, 10, 100", () => {

    const incrementalAlphabet = new IncrementalAlphabet([1, 10, 100], regular)

    expect(incrementalAlphabet.use()["A"]).toStrictEqual(1)
    expect(incrementalAlphabet.use()["J"]).toStrictEqual(10)
    expect(incrementalAlphabet.use()["S"]).toStrictEqual(100)
    expect(incrementalAlphabet.use()["Z"]).toStrictEqual(800)
})

test("create reverse incremental alphabet from units 3, 30, 300", () => {

    const incrementalAlphabet = new IncrementalAlphabet([3, 30, 300], reverse)

    expect(incrementalAlphabet.use()["A"]).toStrictEqual(2400)
    expect(incrementalAlphabet.use()["J"]).toStrictEqual(240)
    expect(incrementalAlphabet.use()["S"]).toStrictEqual(24)
    expect(incrementalAlphabet.use()["Z"]).toStrictEqual(3)
})

test("create modular alphabet with modulus of 9", () => {

    const modularAlphabet = new ModularAlphabet(9, regular)

    expect(modularAlphabet.use()["A"]).toStrictEqual(1)
    expect(modularAlphabet.use()["B"]).toStrictEqual(2)
    expect(modularAlphabet.use()["Y"]).toStrictEqual(7)
    expect(modularAlphabet.use()["Z"]).toStrictEqual(8)
})

test("create reverse modular alphabet with modulus of 13", () => {

    const modularAlphabet = new ModularAlphabet(13, reverse)

    expect(modularAlphabet.use()["A"]).toStrictEqual(13)
    expect(modularAlphabet.use()["B"]).toStrictEqual(12)
    expect(modularAlphabet.use()["Y"]).toStrictEqual(2)
    expect(modularAlphabet.use()["Z"]).toStrictEqual(1)
})

test("create simple alphabet", () => {

    const simpleAlphabet = new SimpleAlphabet(regular)

    expect(simpleAlphabet.use()["A"]).toStrictEqual(1)
    expect(simpleAlphabet.use()["B"]).toStrictEqual(2)
    expect(simpleAlphabet.use()["Y"]).toStrictEqual(25)
    expect(simpleAlphabet.use()["Z"]).toStrictEqual(26)
})

test("create multiple alphabet with multiplyer of 6", () => {

    const multipleAlphabet = new MultipleAlphabet(6, regular)

    expect(multipleAlphabet.use()["A"]).toStrictEqual(6)
    expect(multipleAlphabet.use()["B"]).toStrictEqual(12)
    expect(multipleAlphabet.use()["Y"]).toStrictEqual(150)
    expect(multipleAlphabet.use()["Z"]).toStrictEqual(156)
})