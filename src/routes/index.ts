import express from 'express';
import { Alphabet } from '../alphabets';
import { ciphers, Cipher } from '../ciphers';
import { calculate, wordList, findShared } from '../calculate';


const index = express.Router()

const title = "Gematria Calculator"

index.get("/", (req, res) => { res.render("calculate", { title }) })

index.post("/", (req, res) => {
    const input: string = req.body.calculate
    const cipher: Cipher = req.body.cipher
    const alphabet: Alphabet = ciphers[cipher]
    const inputValue = calculate(input, alphabet)
    const sharedWords = findShared(wordList, inputValue, alphabet)
    
    res.render("result", {
        title,
        input,
        cipher,
        inputValue,
        sharedWords
    })
})


export { index }