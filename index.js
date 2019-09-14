'use strict';

class Cipher {
  constructor(secret)
  {
    this.alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const keywrd = this.parse(secret).split('').filter(this.distinct).join('');
    const cipher = keywrd.split('').sort().join('');
    this.width = cipher.length;
    this.height = Math.ceil(this.alpha.length / this.width);
    this.trans = [];
    this.kwAlpha = (keywrd + this.alpha).split('').filter(this.distinct).join('') + Array(((this.width * this.height) - this.alpha.length)).join(' ');
    cipher.split('').forEach((_, i) => this.trans[cipher.indexOf(this.kwAlpha[i])] = cipher.indexOf(this.kwAlpha[i]) - i);
    this.encryptedAlpha = this.parse(this.kwAlpha.split('').map((_, i) => this.kwAlpha[this.transIndex(i)]).join(''));
  }
  
  distinct(val, index, self) {
    return self.indexOf(val) === index;
  }
  
  max(i, max) {
    return (i >= max) ? max - 1 : i;
  }
  
  flattenIndex(i) {
    return Math.floor(i / this.height) + (i % this.height) * this.width;
  }

  transIndex(i) {
    return this.max(this.flattenIndex(i) - this.trans[this.flattenIndex(i) % this.width], this.kwAlpha.length);
  }

  crypt(s, alphaA, alphaB) {
    return s.split('').map(lttr => alphaA[alphaB.indexOf(lttr)]).join('').replace(/.{5}/g, '$& ');
  }
  
  encrypt(s) {
    return this.crypt(this.parse(s), this.encryptedAlpha, this.alpha);
  }
  
  decrypt(s) {
    return this.crypt(this.parse(s), this.alpha, this.encryptedAlpha);
  }
  
  parse(s) {
    return s.toUpperCase().replace(/ /g, '').replace(/[^a-zA-Z]/g, '');
  }
}

module.exports = Cipher;