const jwtHeler = require("./jwtHelper");

async function init() {
    const payload = {
        msg: "Hello!"
    };
    await jwtHeler.creteKeystore();
    const publicJWK = await jwtHeler.createPublicJWK();
    const privateJWK = await jwtHeler.createPrivateJWK();
    const token = await jwtHeler.createJWT(payload);
    const result = await jwtHeler.verifyJWT(token, publicJWK);

    console.log("public jwk :: ", JSON.stringify(publicJWK));
    console.log("\n");
    console.log("private jwk :: ", JSON.stringify(privateJWK));
    console.log("\n");
    console.log("token :: ", token);
    console.log("\n");
    console.log("payload :: ", result.payload.toString());

}
init();