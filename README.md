# Javascript Keyword Transposition Cipher

[![Node.js Package](https://github.com/w4ffl35/js-ktc/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/w4ffl35/js-ktc/actions/workflows/npm-publish.yml)[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

An implementation of a basic keyword transposition cipher in Javascript with no external dependencies.

## Installation

`npm install js-ktc`

---

## Usage

- **Require** `const C = require('js-ktc');`
- **Initialize** `let ktc = new C('secret')`
- **Encrypt** `ktc.encrypt('CRYPTOLOGY')`
- **Decrypt** `ktc.decrypt('JHQSU XFXBQ')`

## Contributing

---

Please use a separate branch for development with the following naming convention

`[type]-[name]`

***Examples:***

- bugfix-some-unique-branch-name
- hotfix-some-unique-branch-name
- feature-some-unique-branch-name
