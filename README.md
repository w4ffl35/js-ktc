# Javascript Keyword Transposition Cipher

[![Node.js Package](https://github.com/w4ffl35/js-ktc/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/w4ffl35/js-ktc/actions/workflows/npm-publish.yml) [![CodeQL](https://github.com/w4ffl35/js-ktc/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/w4ffl35/js-ktc/actions/workflows/codeql-analysis.yml) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

An implementation of a basic keyword transposition cipher in Javascript with zero dependencies.

```
$ node
Welcome to Node.js v18.7.0.
Type ".help" for more information.
> const C = require('js-ktc');
> let ktc = new C('secret')
> ktc.encrypt('CRYPTOLOGY')
'JHQSU XFXBQ '
> ktc.decrypt('JHQSU XFXBQ')
'CRYPT OLOGY '
```

✅ Easy to use<br />
✅ Extensible<br />
✅ Test coverage<br />
✅ Lots of comments (good for education)<br />
✅ No bloat (zero dependencies)<br />
✅ MIT license

---

## Installation

`npm install js-ktc`

---

## Usage

- **Require** `const C = require('js-ktc');`
- **Initialize** `let ktc = new C('secret')`
- **Encrypt** `ktc.encrypt('CRYPTOLOGY')`
- **Decrypt** `ktc.decrypt('JHQSU XFXBQ')`

---

## Limitations

The basic implementation only works with A-Z though it can easily be extended to support other characters.

---

## Development

---

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for instructions on how to contribute to this project.
