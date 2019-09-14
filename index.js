'use strict';

class Cipher {
  constructor(secret)
  {
    this.alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const key = this._distinct(this._parse(secret));
    const cipher = key.split('').sort();
    this.trans = [];
    this.width = cipher.length;
    this.height = Math.ceil(this.alpha.length / cipher.length);
    this.kAlpha = this._distinct(key + this.alpha) + Array(this.width * this.height - this.alpha.length).join(' ');
    cipher.forEach((_, i) => this.trans[cipher.indexOf(this.kAlpha[i])] = cipher.indexOf(this.kAlpha[i]) - i);
    this.encryptedAlpha = this._parse(this.kAlpha.split('').map((_, i) => this.kAlpha[
      this._max(this._flatIndex(i) - this.trans[this._flatIndex(i) % this.width], this.kAlpha.length)
    ]).join(''));
  }

  _distinct(val) {
    return val.split('').filter((item, i, self) => self.indexOf(item) === i).join('');
  }
  
  _max(i, max) {
    return (i >= max) ? max - 1 : i;
  }
  
  _flatIndex(i) {
    return Math.floor(i / this.height) + (i % this.height) * this.width;
  }

  _crypt(s, alphaA, alphaB) {
    return s.split('').map(lttr => alphaA[alphaB.indexOf(lttr)]).join('').replace(/.{5}/g, '$& ');
  }
  
  _parse(s) {
    return s.toUpperCase().replace(/ /g, '').replace(/[^a-zA-Z]/g, '');
  }

  encrypt(s) {
    return this._crypt(this._parse(s), this.encryptedAlpha, this.alpha);
  }
  
  decrypt(s) {
    return this._crypt(this._parse(s), this.alpha, this.encryptedAlpha);
  }
}

module.exports = Cipher;