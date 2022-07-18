const Cipher = require('./index');
let ktc = new Cipher("secret");
const encrypted = ktc.encrypt("cryptology");
const decrypted = ktc.decrypt(encrypted);
console.log(encrypted);
console.log(decrypted);
