"use client"

import { useEffect, useState } from "react"
import MainInput from "../components/MainInput"
import DisplayWords from "../components/DisplayWords"
import Footer from "../components/BottomNav"

export default function Home() {
  const [cipher, setCipher] = useState("Standard Gematria")
  const [word, setWord] = useState("")
  const [value, setValue] = useState("")
  const [words, setWords] = useState<[] | string[]>([])

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <>
      <div className="container">
        {!value ? (
          <MainInput
            cipher={cipher}
            setCipher={setCipher}
            word={word}
            setWord={setWord}
            setValue={setValue}
            setWords={setWords}
          />
        ) : (
          <DisplayWords
            cipher={cipher}
            word={word}
            value={value}
            words={words}
            setValue={setValue}
          />
        )}
      </div>
      <Footer />
    </>
  )
}
