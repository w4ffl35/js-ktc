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

        // Prepare the keyword based on the provided string in the secret variable
        //
        // Example: if the keyword "mythology" was used, it would become "MYTHOLOGY"
        // after running this._parse
        this.key = this._parse(secret)

        // Remove any duplicate characters from the keyword
        //
        // Example: the keyword "MYTHOLOGY" would become "MYTHOLG"
        this.key = this._distinct(this.key);

        // Prepare the cipher based on the key by splitting the key into an array of letters
        //
        // Example: they key "MYTHOLG" is split into the array
        // ["M", "Y", "T", "H", "O", "L", "G"]
        this.cipher = this.key.split('');

        // Sort the cipher by alphabetical order
        //
        // now the array is sorted into
        // ["G", "H", "L", "M", "O", "T", "Y"]
        this.cipher = this.cipher.sort();

        // Set the "width" of the cipher.
        //
        // The cipher is a string with a set number of unique characters.
        // In our example, the width is 7
        this.width = this.cipher.length;

        // Set the "height" of the cipher.
        //
        // Divide the length of the alphabet by the length of the cipher
        // to find its height. In our example, the height is 4
        this.height = Math.floor(this.alpha.length / this.cipher.length)+1;

        // Create a "keyword" alphabet based on the original alphabet and the keyword
        //
        // in our example, kAlpha will equal:
        /*
        MYTHOLGABCDEFGHIJKLMNOPQRSTUVWXYZ
        */
        var kAlpha = this.key + this.alpha;

        // Remove any repeated letters
        //
        // in our example, kAlpha becomes:
        /*
        MYTHOLGABCDEFIJKNPQRSUVWXZ
        */
        kAlpha = this._distinct(kAlpha);

        // Store keyword alpha as a class property and add padding to the end of it.
        //
        // In our example:
        // 7 * 4 = 28 - 26 + 1 = 3
        // An array of length 3 is created, then joined together on a " " blank space character.
        // This is added to the kAlpha and stored as a class property.
        const padding = Array(Math.abs(this.width * this.height - kAlpha.length) + 1).join(" ");
        this.kAlpha = kAlpha + padding;

        // ARRANGE THE GRID
        //
        // Iterate over each letter in the cipher array.
        this.cipher.forEach(
            (_, i) => {
                // get a letter from the keyword alphabet
                let letter = this.kAlpha[i];

                // get the index of the chosen letter from the cipher
                let cipherIndex = this.cipher.indexOf(letter);

                // store the character in the transform alpha using the cipher index
                //
                // In our example, a transform of the following shape is created
                // this is used to create an enciphered alphabet
                // [-6, -2, -3, 3, 0,  3,  5 ]
                this.trans[cipherIndex] = cipherIndex - i;
            }
        );

        // Build the encrypted alphabet
        //
        // In our example, GISHDPXLFRMAJUOEQZTCNWYBKV
        this.encryptedAlpha = this._parse(
            // Split the keyword into an array
            this.kAlpha.split('').map(
                (_, i) => {
                    /*
                    set keyword alphabet index
                    _flatIndex transforms the given keyword alpha index into an index which
                    can be used with a transform.
                    The max between that number and the kAlpha length becomes the kAlphaIndex.
                    This operation is performed for each letter in the kAlpha string.

                    In our example, the
                        index => flat => kAlpha => kAlphaIndex
                    transformation for each letter is:

                    0 => 0 => 6 => 6
                    1 => 7 => 13 => 13
                    2 => 14 => 20 => 20
                    3 => 21 => 27 => 27
                    4 => 1 => 3 => 3
                    5 => 8 => 10 => 10
                    6 => 15 => 17 => 17
                    7 => 22 => 24 => 24
                    8 => 2 => 5 => 5
                    9 => 9 => 12 => 12
                    10 => 16 => 19 => 19
                    11 => 23 => 26 => 26
                    12 => 3 => 0 => 0
                    13 => 10 => 7 => 7
                    14 => 17 => 14 => 14
                    15 => 24 => 21 => 21
                    16 => 4 => 4 => 4
                    17 => 11 => 11 => 11
                    18 => 18 => 18 => 18
                    19 => 25 => 25 => 25
                    20 => 5 => 2 => 2
                    21 => 12 => 9 => 9
                    22 => 19 => 16 => 16
                    23 => 26 => 23 => 23
                    24 => 6 => 1 => 1
                    25 => 13 => 8 => 8
                    26 => 20 => 15 => 15
                    27 => 27 => 22 => 22
                    */
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
