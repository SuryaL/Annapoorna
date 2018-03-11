'use strict';

const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
const numBits = 512;

const KEY_TYPE_PRIVATE = "PRIVATE";
const KEY_TYPE_PUBLIC = "PUBLIC";

let __private_key = void 0;

const init = function(private_key) {
    __private_key = openpgp.key.readArmored(standardKey(private_key, KEY_TYPE_PRIVATE)).keys[0]
};

const initialized = function() {
    if (__private_key)
        return true;
    throw 'PGP Not initalized';
}

const armoredKeys = function(public_key) {
    return openpgp.key.readArmored(standardKey(public_key, KEY_TYPE_PUBLIC)).keys
};

//generate key pair
const generate_key_options = (name, email) => ({
    userIds: [{
        name: name,
        email: email
    }],
    numBits
});

const generate = async (name, email) => {
    const key = await openpgp.generateKey(generate_key_options(name, email));
    return ({
        public_key: key.publicKeyArmored,
        private_key: key.privateKeyArmored
    });
}

//encryption with receiver's public key
const encrypt_options = (payload, public_key) => ({
    data: payload + '', // input as String (or Uint8Array)
    publicKeys: armoredKeys(public_key) // for encryption
});

const encrypt = async (payload, public_key) => {
    const ciphertext = await openpgp.encrypt(encrypt_options(payload, public_key));
    return parseMessage(ciphertext.data);
};

//encryption with password
const encrypt_password_options = (payload, password) => ({
    data: payload + '', // input as String (or Uint8Array)
    passwords: [password]
});

const encryptWithPassword = async (payload, password) => {
    const ciphertext = await openpgp.encrypt(encrypt_password_options(payload, password));
    return ciphertext.data;
};

//decryption with your private key
const decrypt_options = ciphertext => ({
    message: openpgp.message.readArmored(ciphertext), // parse armored message
    privateKey: __private_key // for decryption
});

const decrypt = async ciphertext => {
    initialized();
    const decryptedText = await openpgp.decrypt(decrypt_options(standardMessage(ciphertext)));
    return decryptedText.data;
}

//decryption with your private key
const decrypt_password_options = (ciphertext, password) => ({
    message: openpgp.message.readArmored(ciphertext), // parse armored message
    password // for decryption
});

const decryptWithPassword = async (ciphertext, password) => {
    initialized();
    const decryptedText = await openpgp.decrypt(decrypt_password_options(standardMessage(ciphertext), password));
    return decryptedText.data;
}

//signing with your private key
const signing_options = payload => ({
    data: payload + '', // input as String
    privateKeys: __private_key // for signing
});

const sign = async payload => {
    initialized();
    const signedPayload = await openpgp.sign(signing_options(parseMessage(payload)));
    return {
        message: parseMessage(signedPayload.data),
        signature: signedPayload.data.split('\r\n\r\n')[2].split('\r\n-')[0]
    };
};

//verifying with sender's public key
const verifying_options = (payload, public_key) => ({
    message: openpgp.cleartext.readArmored(payload), // input as String
    publicKeys: armoredKeys(public_key) // for verification
});

const verify = async (payload, public_key) => {
    const verified = await openpgp.verify(verifying_options(validationPayload(payload), public_key))
    return verified.signatures[0].valid;
};

const parseMessage = signature => signature.split('\r\n\r\n').length > 1 ? signature.split('\r\n\r\n')[1].split('\r\n-')[0] : signature;

const standardMessage = message =>
    `
-----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v2.6.2
Comment: https://openpgpjs.org

${message}
-----END PGP MESSAGE-----
`;

const standardKey = (key, type) =>
    `
-----BEGIN PGP ${type} KEY BLOCK-----
Version: OpenPGP.js v2.6.2
Comment: https://openpgpjs.org

${key}
-----END PGP ${type} KEY BLOCK-----
`;

const validationPayload = ({
        message,
        signature
    }) =>
    `-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

${message}
----- BEGIN PGP SIGNATURE-----
Version: OpenPGP.js v2.6.2
Comment: https://openpgpjs.org

${signature}
----- END PGP SIGNATURE-----`;

const user_info = public_key => {
    let name = "Anonymous";
    let email = "Anonymous";
    const keys = armoredKeys(public_key);
    if (keys.length > 0 && keys[0]["users"].length > 0) {
        const info = keys[0]["users"][0]["userId"]["userid"];
        name = info.split(' <')[0];
        email = info.split(' <')[1].split('>')[0];
    }
    return {
        name,
        email
    }
}

module.exports = {
    init,
    encrypt,
    encryptWithPassword,
    decrypt,
    decryptWithPassword,
    sign,
    verify,
    user_info
}