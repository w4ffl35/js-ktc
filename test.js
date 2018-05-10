const KTC = require('js-keyword-transposition-cipher');
let ktc = new KTC.Cipher("secret");
const encrypted = ktc.encrypt("cryptology");
const decrypted = ktc.decrypt(encrypted);
console.log(encrypted);
console.log(decrypted);
