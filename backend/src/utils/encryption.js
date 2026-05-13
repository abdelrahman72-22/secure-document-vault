const crypto = require("crypto");
const fs = require("fs");

const algorithm = "aes-256-cbc";

const secretKey = crypto
  .createHash("sha256")
  .update("supersecretkey")
  .digest("hex")
  .substring(0, 32);

const iv = crypto.randomBytes(16);

const encryptFile = (inputPath, outputPath) => {

  return new Promise((resolve, reject) => {

    const cipher = crypto.createCipheriv(
      algorithm,
      secretKey,
      iv
    );

    const input = fs.createReadStream(inputPath);

    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    output.on("finish", () => {
      resolve();
    });

    output.on("error", reject);

  });

};

module.exports = {
  encryptFile
};
