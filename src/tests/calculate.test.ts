import calculateSimple from '../calculate'

test("calculate simple value", () => {
    expect(calculateSimple("abcde")).toBe(15)
})