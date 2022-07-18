const C = require('./cipher.min.js');
const readline = require('readline');

class CipherRunner {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    question = (message) => new Promise((resolve, _reject) => this.rl.question(message, (res) => resolve(res)))

    encryptMessage = (message) => new Promise((resolve) => resolve(this.cipher.encrypt(message)))

    decryptMessage = (message) => new Promise((resolve) => resolve(this.cipher.decrypt(message)))

    doEncryption = () => {
        this.question('Enter a message: ')
            .then(message => this.encryptMessage(message))
            .then(encrypted => {
                console.log(encrypted);
                return encrypted;
            })
            .then(this.decryptMessage)
            .then(console.log)
            .then(this.doEncryption)
    }

    run = () => this.question('Enter a secret: ')
        .then(secret => this.cipher = new C(secret))
        .then(this.doEncryption)
}

const cr = new CipherRunner();
cr.run();