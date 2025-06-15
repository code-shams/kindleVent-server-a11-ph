const fs = require("fs");
const json = fs.readFileSync("./firebaseAdminKey.json", "utf8");
const encoded = Buffer.from(json).toString("base64");
console.log(encoded);
