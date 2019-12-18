const jose = require('node-jose');
const fs = require('fs');
const path = require('path');
const keystore = jose.JWK.createKeyStore();
const opts = {
    algorithms: ["RS256"],
};

const privkeys = [
    fs.readFileSync(path.join("k1.private")),
    fs.readFileSync(path.join("k2.private")),
];

async function creteKeystore() {
    await keystore.add(privkeys[1], 'pem');
    await keystore.add(privkeys[0], 'pem');
}

async function createPublicJWK() {
    const jwk = keystore.toJSON();
    return jwk;
}

async function createPrivateJWK() {
    // giving true as argument will give private JWK
    const jwk = keystore.toJSON(true);
    return jwk;
}

async function createJWT(payload) {
    let token = await jose.JWS
        .createSign({ format: 'compact' }, keystore.all()[0])
        .update(JSON.stringify(payload))
        .final();
    return token;
}

async function verifyJWT(token, jwk) {
    const keystore = await jose.JWK.createKeyStore();
    for (const key of jwk.keys) {
        await keystore.add(key);
    }
    const result = await jose.JWS
        .createVerify(keystore, opts)
        .verify(token);
    return result;
}

exports.creteKeystore = creteKeystore;
exports.createPublicJWK = createPublicJWK;
exports.createPrivateJWK = createPrivateJWK;
exports.createJWT = createJWT;
exports.verifyJWT = verifyJWT;