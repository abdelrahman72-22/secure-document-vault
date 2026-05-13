const crypto = require("crypto");

const { publicKey, privateKey } =
  crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048
  });

const signHash = (hash) => {

  const sign = crypto.sign(
    "sha256",
    Buffer.from(hash),
    privateKey
  );

  return sign.toString("hex");

};

const verifySignature = (hash, signature) => {

  return crypto.verify(
    "sha256",
    Buffer.from(hash),
    publicKey,
    Buffer.from(signature, "hex")
  );

};

module.exports = {
  signHash,
  verifySignature
};
