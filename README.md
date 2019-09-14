# Javascript Keyword Transposition Cipher

This is an implementation of a keyword transposition cipher according to the
description given at the [Keyword Transposition Cipher hackerrank problem](https://www.hackerrank.com/challenges/keyword-transposition-cipher/problem)

> A keyword transposition cipher is a method of choosing a monoalphabetic substitution to encode a message. The substitution alphabet is determined by choosing a keyword, arranging the remaining letters of the alphabet in columns below the letters of the keyword, and then reading back the columns in the alphabetical order of the letters of the keyword.

## **THIS PACKAGE IS INTENDED FOR EDUCATIONAL PURPOSES ONLY**

The author is not a cryptographer and keyword transposition ciphers are extremely easy to crack. Do not use this package to secure your data or messages.

---

## Installation

`npm install --save js-ktc`

## Usage

- **Require** `const Cipher = require('js-keyword-transposition-cipher');`
- **Initialize** `let ktc = new Cipher('secret')`
- **Encrypt** `ktc.encrypt('CRYPTOLOGY')`
- **Decrypt** `ktc.decrypt('JHQSU XFXBQ')`

## Demo

A demo using this package and React [can be found here](https://github.com/mdmnk/react-keyword-transposition-cipher).
