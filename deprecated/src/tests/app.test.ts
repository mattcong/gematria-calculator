import request from 'supertest'
import app from '../app'
import { Alphabet } from '../modules/alphabets';
import { ciphers, Cipher } from '../modules/ciphers';
import { calculate, wordList, findShared } from '../modules/calculate';
import { displayRandomWords } from '../modules/sortwords';


test("GET /", async () => {
    const res = await request(app)
        .get("/")
    expect(res.status).toBe(200)
})

test("display correct calculation result", async () => {
    const res = await request(app)
        .post("/")
        .send({ calculate: 'Test input', cipher: 'Standard Gematria' })
    expect(res.status).toBe(200)
    expect(res.text).toContain("The Standard Gematria value of Test input is 1134.")
})


test("shared words do not contain input", async () => {
    const input: string = "Buzzword"
    const cipher: Cipher = "Standard Gematria"
    const alphabet: Alphabet = ciphers[cipher]
    const inputValue = calculate(input, alphabet)
    const shared = findShared(wordList, inputValue, alphabet)
    const sharedWords = displayRandomWords(shared, input)

    const res = await request(app)
        .post("/")
        .send({ calculate: input, cipher: cipher })
    expect(res.status).toBe(200)
    expect(sharedWords).toEqual(expect.not.stringContaining(input));})