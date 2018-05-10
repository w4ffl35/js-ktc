"use strict";

class Cipher {
    constructor(secret)
    {
        this.alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.indexTransformations = [];
        this.keyword = '';
        this.kwAlpha = '';
        this.encryptedAlpha = '';
        this.cipher = '';
        this.width = 0;
        this.height = 0;
        secret = this.parseString(secret);
        if (secret === '') return;
        this.distinct(secret, this, 'keyword');
        this.cipher = this.keyword.split('').sort().join('');
        this.width = this.cipher.length;
        this.height = Math.ceil(26.0 / this.width);
        this.indexTransformations = [];
        this.distinct(this.keyword + this.alpha, this, 'kwAlpha');
        for (let i = 0; i < ((this.width * this.height) - this.alpha.length); i++) this.kwAlpha += ' ';
        this.setIndexTransformations();
        this.setEncryptedAlpha();
    }

    distinct(keyword, obj, prop) {
        keyword.split('').map((item) => {
            return (obj[prop].indexOf(item) === -1) ? obj[prop] += item : false;
        });
    }

    setIndexTransformations()
    {
        for (let i = 0; i < this.width; i++) {
            let indexDist = this.cipher.indexOf(this.kwAlpha[i]) - i;
            this.indexTransformations[i + (indexDist)] = indexDist;
        }
    }

    setEncryptedAlpha()
    {
        let e = "";
        for (let i=0; i < this.kwAlpha.length; i++) {
            let index = Math.floor(i / this.height) + (i % this.height) * this.width;
            index -= this.indexTransformations[index % this.width];
            index = (index >= this.kwAlpha.length) ? this.kwAlpha.length - 1 : index;
            e += this.kwAlpha[index];
        }
        this.encryptedAlpha = this.parseString(e);
    }

    encrypt(s)
    {
        return this.crypt(this.parseString(s), this.encryptedAlpha, this.alpha);
    }

    decrypt(s)
    {
        return this.crypt(this.parseString(s), this.alpha, this.encryptedAlpha);
    }

    crypt(s, alphaA, alphaB)
    {
        if (this.keyword === '') return '';
        let e = '';
        for (let i = 0; i < s.length; i++) e += alphaA[alphaB.indexOf(s[i])];
        return e.replace(/.{5}/g, '$& ');
    }

    parseString(s) {
        return s.toUpperCase().replace(/ /g, '').replace(/[^a-zA-Z]/g, '');
    }
}

module.exports = { Cipher };
