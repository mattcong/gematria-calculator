# Gematria Calculator

Web app that calculates the value of a word and returns words that share the same value.

## Stack

TypeScript, Next.js 13, CSS.

Deployed on Vercel.

## Ciphers

The app uses various traditional and non-traditional ciphers:

Standard
![standard](/docs/images/standard-cipher.jpg)

Pythagorean (Reduction) / Reverse Pythagorean
![pythagorean](/docs/images/pythagorean-cipher.jpg)
![reversepythagorean](/docs/images/reverse-pythagorean-cipher.jpg)

Simple (English Ordinal)
![simple](/docs/images/simple-cipher.jpg)

Multiple 6
![multiplesix](/docs/images/multiple-six-cipher.jpg)

Alphanumeric Qabbala
![alphanumeric](/docs/images/alphanumeric-cipher.jpg)

Ciphers are created from alphabet classes that assign A - Z values according to specific patterns.

For example, the Pythagorean cipher is created by passing `9` as a modulus into the `ModularAlphabet` constructor, making a pattern wrapping from 1 - 9 and ending at 8 on Z.

The Standard cipher increments from A - Z in steps of 1 - 9, 10 - 90, 100 - 800. This is created by passing `[1, 10, 100]` as an argument to the `IncrementalAlphabet` constructor, where each element is the amount by which to increment and the number of elements determines the length of each step. `[30, 60, 30, 90]` would produce a cipher incrementing from A - Z in steps of 30 - 210, 60 - 420, 30 - 210, 90 - 450. Negative increments can also be used.

This means any number of custom ciphers can be made using these patterns (even though they have no basis in historical exegesis).

## To do 🔜

- Special number identification (prime, triangular, square, Fibonacci)
- Prime value factorization
- Base class that creates alphabet values from radix
- Search history
- Multi-word relationship identification: arithmetic (value) / geometric (ratio) sequence detection / amicable numbers
  - Word sequences
  - Bulk text analysis
- Hebrew language support
- Custom cipher UI
