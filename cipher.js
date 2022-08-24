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

    /*
    * Remove any repeated letters from the given string
    * */
    _distinct = (val) => val.split('').filter((item, i, self) => self.indexOf(item) === i).join('')

    /*
    * Compare two integers and return max if i is greater
    * */
    _max = (i, max) => i > max ? max : i

    /*
    * Get an index based on the "height" and "width" of the cipher
    * */
    _flatIndex = (i) => Math.floor(i / this.height) + ((i % this.height) * this.width)

    /*
    * Adds spaces to the given string
    * */
    _addSpaces = (s) => this.props.addSpaces ? s.replace(/.{5}/g, '$& ') : s

    /*
    * Encrypts the given input string
    * */
    _crypt = (s, alphaA, alphaB) => this._addSpaces(s.split('').map(lttr => alphaA[alphaB.indexOf(lttr)]).join(''))

    /*
    * Converts the given string to upper-case
    * */
    _convertCase = (s) => this.props.toUpper ? s.toUpperCase() : s;

    /*
    * Strip any non-alpha characters from the input string
    * */
    _stripCharacters = (s) => this.props.stripCharacters ? s.replace(/[^a-zA-Z]/g, '') : s

    /*
    * Strip any spaces from the input string
    * */
    _stripSpaces = (s) => this.props.stripSpaces ? s.replace(/ /g, '') : s

    /*
    * Convert the given string to uppercase, replace non-alpha characters.
    * */
    _parse = (s) => this._stripCharacters(
        this._stripSpaces(
            this._convertCase(s)
        )
    )

    /*
    * encrypt(string: s): string
    *
    * Given a plain text string, this function will return an encrypted version of it
    * using the _crypt function.
    * */
    encrypt = (s) => this._crypt(this._parse(s), this.encryptedAlpha, this.alpha)

    /*
    * decrypt(string: s): string
    *
    * Given an encrypted string, this function will return a decrypt it
    * using the _crypt function.
    * */
    decrypt = (s) => this._crypt(s, this.alpha, this.encryptedAlpha)
}

module.exports = Cipher;
