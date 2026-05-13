const express = require("express");

const router = express.Router();

const {
  generate2FA,
  verify2FA
} = require(
  "../controllers/twoFactorController"
);

const protect = require(
  "../middleware/authMiddleware"
);

router.get(
  "/generate",
  protect,
  generate2FA
);

router.post(
  "/verify",
  protect,
  verify2FA
);

module.exports = router;
