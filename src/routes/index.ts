import express from 'express';
import { Alphabet } from '../modules/alphabets';
import { ciphers, Cipher } from '../modules/ciphers';
import { calculate, wordList, findShared } from '../modules/calculate';
import {displayRandomWords} from '../modules/sortwords';


const index = express.Router()

const title = "Gematria Calculator"

index.get("/", (req, res) => { res.render("calculate", { title }) })

index.post("/", (req, res) => {
    const input: string = req.body.calculate
    const cipher: Cipher = req.body.cipher
    const alphabet: Alphabet = ciphers[cipher]
    const inputValue = calculate(input, alphabet)
    const shared = findShared(wordList, inputValue, alphabet)
    const sharedWords = displayRandomWords(shared)
    
    res.render("result", {
        title,
        input,
        cipher,
        inputValue,
        sharedWords
    })
})


export { index }