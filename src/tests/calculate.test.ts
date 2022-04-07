import { calculateSimple, calculateBase6, calculatePythagorean } from '../calculate'

test("calculate simple value", () => {
    expect(calculateSimple("abcde")).toBe(15)
})

test("calculate base 6 value", () => {
    expect(calculateBase6("abcde")).toBe(90)
})

test("calculate pythagorean value", () => {
    expect(calculatePythagorean("zxcvb")).toBe(23)
})