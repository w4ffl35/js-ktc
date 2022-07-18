const C = require('./cipher.min.js');
describe("Basic tests", () => {
    let ktc = null;

    beforeAll(() => {
        ktc = new C("secret");
    })

    test('encrypted message is JHQSU XFXBQ', () => {
        expect(ktc.encrypt("cryptology"))
            .toBe("JHQSU XFXBQ ")
    })

    test('decrypted message is CRYPT OLOGY', () => {
        expect(ktc.decrypt("JHQSU XFXBQ "))
            .toBe("CRYPT OLOGY ")
    })
})

describe("Expanded tests", () => {
    let ktc = null
    let key = ""
    let encryptedMessage = ""
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()_-+=[{}]\\|;:',<.>/?" + '"'
    const props = {
        alpha: alphabet,
        toUpper: false,
        stripCharacters: false,
        addSpaces: false,
        stripSpaces: false
    }
    const expectedEncryption = "hBFJNRVZdjnrx159@^)=]:.\"iCGKOSWaekouy26`#&_[\\'> sDHLPTXbflpvz37~$*-{|,/ tAEIMQUYcgmqw048!%(+};"

    // The decrypted alphabet contains the character `v` in place of the character `*`
    // This is because the shape of the alphabet "grid" is such that it requires two blank spaces
    // when decrypting, these blank spaces always resolve to the first found blank character. In the case
    // of this test suite it maps to the character `v`.
    // This is a known limitation of the basic cipher and will be fixed in an upcoming version.
    const decrypted_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&v()_-+=[{}]\\|;:',<.>/?" + '"'

    beforeAll(() => {
        key = "this"
        ktc = new C(key, props)
        encryptedMessage = ktc.encrypt(alphabet)
    })

    test('Props are set to expected value', () => expect(ktc.props).toBe(props))
    test('Key equals expected value', () => expect(ktc.key).toBe(key))
    test('Cipher is set to an array', () => expect(ktc.cipher).toEqual(["h","i","s","t"]))
    test('Cipher width is correct', () => expect(ktc.width).toBe(4))
    test('Cipher height is correct', () => expect(ktc.height).toBe(24))
    test('Alpha length is correct', () => expect(ktc.alpha.length).toBe(94))
    test('Distinct works: AABBCC == ABC', () => expect(ktc._distinct("AABBCC")).toBe("ABC"))
    test('Encryption works', () => expect(encryptedMessage).toBe(expectedEncryption))
    test('Decrypted alphabet returns expected string', () => expect(ktc.decrypt(expectedEncryption)).toBe(decrypted_alphabet))
})