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

        // Prepare the secret and store it as a key
        this.key = this._parse(secret)

        // Consider the given keyword "secret". After parsing the key would become SECRT
        this.key = this._distinct(this.key);

        // Prepare the cipher based on the key by splitting the key into an array of letters
        this.cipher = this.key.split('');

        // Sort the cipher by alphabetical order
        this.cipher = this.cipher.sort();

        // Set the "width" of the cipher.
        //
        // The cipher is a string with a set number of unique characters.
        // In our example, the width is 5
        this.width = this.cipher.length;

        // Set the "height" of the cipher.
        //
        // Divde the length of the alphabet by the length of the cipher
        // to find its width. In our example, the height is 6 (26 / 5 = 5.2 rounded up to 6)
        this.height = Math.floor(this.alpha.length / this.cipher.length)+1;

        // Create a "keyword" alphabet based on the original alphabet and the keyword
        //
        // in our example, kAlpha will equal:
        /*
        SECRTABCDEFGHIJKLMNOPQRSTUVWXYZ
        */
        var kAlpha = this.key + this.alpha;

        // Remove any repeated letters
        //
        // in our example, kAlpha becomes:
        /*
        SECRTABDFGHIJKLMNOPQUVWXYZ
        */
        kAlpha = this._distinct(kAlpha);

        // Store keyword alpha as a class property and add padding to the end of it.
        //
        // In our example, width is 5, height is 6 and alpha.length is 26
        // 5 * 6 = 30 - 26 = 4
        // An array of length 4 is created, then joined together on a " " blank space character.
        // This is added to the kAlpha and stored as a class property.
        console.log("this.width * this.height: " + this.width * this.height + " kalpha.length: " + kAlpha.length)
        // console.log(kAlpha);
        const padding = Array(Math.abs(this.width * this.height - kAlpha.length) + 1).join(" ");

        this.kAlpha = kAlpha + padding;

        // // ARRANGE THE GRID
        // // Iterate over each letter in the cipher array.
        this.cipher.forEach(
            (_, i) => {
                // get a letter from the keyword alphabet
                let letter = this.kAlpha[i];

                // get the index of the chosen letter from the cipher
                let cipherIndex = this.cipher.indexOf(letter);

                // store the character in the transform alpha using the cipher index
                this.trans[cipherIndex] = cipherIndex - i;
            }
        );

        // Build the encrypted alphabet
        // parse the keyword alphabet
        this.encryptedAlpha = this._parse(
            // Split the keyword into an array
            this.kAlpha.split('').map(
                (_, i) => {
                    // set keyword alphabet index by converting 2d coordinates to 1d index
                    let kAlphaIndex = this._max(
                        this._flatIndex(i) - this.trans[this._flatIndex(i) % this.width],
                        this.kAlpha.length
                    )
                    return this.kAlpha[kAlphaIndex]
                }
            ).join('')
        );
    }

    _distinct = (val) => val.split('').filter((item, i, self) => self.indexOf(item) === i).join('')

    // compare two integers and return max if i is greater
    _max = (i, max) => i > max ? max : i

    // get index
    _flatIndex = (i) => Math.floor(i / this.height) + ((i % this.height) * this.width)

    _addSpaces = (s) => this.props.addSpaces ? s.replace(/.{5}/g, '$& ') : s

    _crypt = (s, alphaA, alphaB) => this._addSpaces(s.split('').map(lttr => alphaA[alphaB.indexOf(lttr)]).join(''))

    _convertCase = (s) => this.props.toUpper ? s.toUpperCase() : s;

    _stripCharacters = (s) => this.props.stripCharacters ? s.replace(/[^a-zA-Z]/g, '') : s

    _stripSpaces = (s) => this.props.stripSpaces ? s.replace(/ /g, '') : s

    // Convert the given string to uppercase, replace non-alpha characters.
    _parse = (s) => this._stripCharacters(this._stripSpaces(this._convertCase(s)))

    encrypt = (s) => this._crypt(this._parse(s), this.encryptedAlpha, this.alpha)

    decrypt = (s) => this._crypt(s, this.alpha, this.encryptedAlpha)
}

module.exports = Cipher;
