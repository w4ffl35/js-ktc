'use strict';

class Cipher {
    constructor(secret, props = {
        alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        toUpper: true,
        stripCharacters: true,
        addSpaces: true,
        stripSpaces: true
    })
    {
        this.props = props;

        // set class properties
        this.alpha = props.alpha;
        this.trans = [];

        this.key = this._parse(secret)
        this.key = [...new Set(this.key.split(''))].join('');

        this.cipher = this.key.split('');
        this.cipher = this.cipher.sort();

        this.width = this.cipher.length;
        this.height = Math.floor(this.alpha.length / this.cipher.length)+1;

        var kAlpha = this.key + this.alpha;
        kAlpha = [...new Set(kAlpha.split(''))].join('');

        const padding = Array(Math.abs(this.width * this.height - kAlpha.length) + 1).join(" ");
        this.kAlpha = kAlpha + padding;

        this.cipher.forEach(
          (_, i) => {
              let letter = this.kAlpha[i];
              let cipherIndex = this.cipher.indexOf(letter);
              this.trans[cipherIndex] = cipherIndex - i;
          }
        );

        this.encryptedAlpha = this._parse(
          this.kAlpha.split('').map(
            (_, i) => {
                let kAlphaIndex = this._max(
                  this._flatIndex(i) - this.trans[this._flatIndex(i) % this.width],
                  this.kAlpha.length
                )
                return this.kAlpha[kAlphaIndex]
            }
          ).join('')
        );
    }

    _distinct = (val) => [...new Set(val.split(''))].join('')
    _max = (i, max) => i > max ? max : i
    _flatIndex = (i) => Math.floor(i / this.height) + ((i % this.height) * this.width)
    _addSpaces = (s) => this.props.addSpaces ? s.replace(/.{5}/g, '$& ') : s
    _crypt = (s, alphaA, alphaB) => this._addSpaces(s.split('').map(lttr => alphaA[alphaB.indexOf(lttr)]).join(''))
    _convertCase = (s) => this.props.toUpper ? s.toUpperCase() : s;
    _stripCharacters = (s) => this.props.stripCharacters ? s.replace(/[^a-zA-Z]/g, '') : s
    _stripSpaces = (s) => this.props.stripSpaces ? s.replace(/ /g, '') : s
    _parse = (s) => this._stripCharacters(this._stripSpaces(this._convertCase(s)))
    encrypt = (s) => this._crypt(this._parse(s), this.encryptedAlpha, this.alpha)
    decrypt = (s) => this._crypt(s, this.alpha, this.encryptedAlpha)
}

module.exports = Cipher;