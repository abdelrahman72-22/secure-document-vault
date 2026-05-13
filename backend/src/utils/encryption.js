const crypto = require("crypto");
const fs = require("fs");

const algorithm = "aes-256-cbc";

// Auto-generate encryption key using secure RNG if not provided
const secretKey = process.env.ENCRYPTION_KEY
  ? Buffer.from(process.env.ENCRYPTION_KEY, "hex")
  : crypto.randomBytes(32);

if (secretKey.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be 32 bytes for AES-256-CBC");
}

// Log warning if using auto-generated key (development only)
if (!process.env.ENCRYPTION_KEY && process.env.NODE_ENV !== "production") {
  console.warn("⚠️  WARNING: Using auto-generated ENCRYPTION_KEY. For production, set ENCRYPTION_KEY in .env");
}

const encryptFile = (inputPath, outputPath) => {

  return new Promise((resolve, reject) => {

    const iv = crypto.randomBytes(16);

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
