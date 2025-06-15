require("dotenv").config();

function decryptSecretKey() {
    const base64 = process.env.SECRET_KEY;
    const json = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(json);
}

module.exports = decryptSecretKey;
