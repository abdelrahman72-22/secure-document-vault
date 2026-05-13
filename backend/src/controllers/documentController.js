const prisma = require("../config/prisma");

const generateFileHash = require("../utils/hash");

const {
  encryptFile
} = require("../utils/encryption");

const {
  signHash,
  verifySignature
} = require("../utils/signature");

const path = require("path");

const uploadDocument = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });

    }

    const originalPath = req.file.path;

    const encryptedPath =
      originalPath + ".enc";

    await encryptFile(
      originalPath,
      encryptedPath
    );

    const hash =
	await generateFileHash(encryptedPath);
    const signature = signHash(hash);

const fileSize =
  req.file.size;

    const document = await prisma.document.create({
      data: {
        filename: req.file.filename,
        encryptedPath,
        hash,
        signature,
        size: fileSize,
        ownerId: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      document
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Upload failed"
    });

  }

};

const verifyDocument = async (req, res) => {

  try {

    const { id } = req.params;

    const document =
      await prisma.document.findUnique({
        where: {
          id: parseInt(id)
        }
      });

    if (!document) {

      return res.status(404).json({
        success: false,
        message: "Document not found"
      });

    }

    const currentHash =
  await generateFileHash(
    document.encryptedPath
  );

    const valid =
      verifySignature(
        currentHash,
        document.signature
      );

    res.json({
      success: true,
      integrity: valid
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Verification failed"
    });

  }

};
const fs = require("fs");

const getDocuments = async (req, res) => {

  try {

    const documents =
      await prisma.document.findMany({
        where: {
          ownerId: req.user.id
        }
      });

    res.json({
      success: true,
      documents
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch documents"
    });

  }

};

const downloadDocument = async (req, res) => {

  try {

    const { id } = req.params;

    const document =
      await prisma.document.findUnique({
        where: {
          id: parseInt(id)
        }
      });

    if (!document) {

      return res.status(404).json({
        success: false,
        message: "Document not found"
      });

    }

    if (document.ownerId !== req.user.id) {

      return res.status(403).json({
        success: false,
        message: "Access denied"
      });

    }

    res.download(
      document.encryptedPath
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Download failed"
    });

  }

};

const deleteDocument = async (req, res) => {

  try {

    const { id } = req.params;

    const document =
      await prisma.document.findUnique({
        where: {
          id: parseInt(id)
        }
      });

    if (!document) {

      return res.status(404).json({
        success: false,
        message: "Document not found"
      });

    }

    if (document.ownerId !== req.user.id) {

      return res.status(403).json({
        success: false,
        message: "Access denied"
      });

    }

    if (fs.existsSync(document.encryptedPath)) {

      fs.unlinkSync(document.encryptedPath);

    }

    await prisma.document.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.json({
      success: true,
      message: "Document deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Delete failed"
    });

  }

};

module.exports = {
  uploadDocument,
  verifyDocument,
  getDocuments,
  downloadDocument,
  deleteDocument
};
