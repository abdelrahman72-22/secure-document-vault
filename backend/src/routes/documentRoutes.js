const express = require("express");

const multer = require("multer");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../config/multer");

const {
  uploadDocument,
  verifyDocument,
  getDocuments,
  downloadDocument,
  deleteDocument
} = require("../controllers/documentController");

router.post(
  "/upload",
  protect,
  upload.single("document"),
  uploadDocument
);

router.get(
  "/verify/:id",
  protect,
  verifyDocument
);

router.get(
  "/",
  protect,
  getDocuments
);

router.get(
  "/download/:id",
  protect,
  downloadDocument
);

router.delete(
  "/:id",
  protect,
  deleteDocument
);

router.use((error, req, res, next) => {

  if (
    error instanceof multer.MulterError
  ) {

    if (
      error.code ===
      "LIMIT_FILE_SIZE"
    ) {

      return res.status(400).json({

        success: false,

        message:
          "File too large. Max size is 5MB"

      });

    }

  }

  next(error);

});

module.exports = router;
