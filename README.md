# Gematria Calculator

Web app that calculates the value of a word and returns words that share the same value.

## Stack

TypeScript, Next.js 13, CSS.

Deployed on Vercel.

## Ciphers

The app uses various traditional and non-traditional ciphers:

Standard / Reverse Standard

![standard](https://user-images.githubusercontent.com/80398444/168562813-b3e49e03-3ea1-4683-819e-a5d5b253895a.jpg)
![reversestandard](https://user-images.githubusercontent.com/80398444/168562832-c4e4d521-9107-4dfb-925f-657b4f35f658.jpg)

Pythagorean (aka Reduction) / Reverse Pythagorean
![pythagorean](https://user-images.githubusercontent.com/80398444/168562862-bcdada20-c0d8-498e-a03a-9ae59774e622.jpg)
![reversepythagorean](https://user-images.githubusercontent.com/80398444/168562878-193efaeb-f267-470b-bcdc-b6a84575c8b5.jpg)

Simple (aka Ordinal)
![simple](https://user-images.githubusercontent.com/80398444/168562938-76cd19cc-a288-4307-93f7-3dd94f7f7448.jpg)

Multiple 6 (often called Base 6 Gematria online, renamed here so as not to be confused with base number systems)
![multiplesix](https://user-images.githubusercontent.com/80398444/168562996-999d7d42-18b2-4eaa-a7f5-2feed0442ff2.jpg)

Ciphers are created from alphabet classes that assign A - Z values according to specific patterns.

For example, the Pythagorean cipher is created by passing `9` as a modulus into the `ModularAlphabet` constructor, making a pattern wrapping from 1 - 9 and ending at 8 on Z.

The Standard cipher increments from A - Z in steps of 1 - 9, 10 - 90, 100 - 800. This is created by passing `[1, 10, 100]` as an argument to the `IncrementalAlphabet` constructor, where each element is the amount by which to increment and the number of elements determines the length of each step. `[30, 60, 30, 90]` would produce a cipher incrementing from A - Z in steps of 30 - 210, 60 - 420, 30 - 210, 90 - 450. Negative increments can also be used.

This means any number of custom ciphers can be made using these patterns (even though they have no basis in historical exegesis).

## To do 🔜

- Link to all shared words on result page
- Light / dark theme toggle
- Complete information pages
- Search history
- Hebrew language support
- Base class that creates alphabet values from radix
- Custom cipher UI
