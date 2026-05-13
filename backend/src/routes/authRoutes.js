const express = require("express");
const passport = require("passport");
const router = express.Router();
const protect =
require("../middleware/authMiddleware");
const {
  register,
  login,
  getProfile
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.get(
  "/google",

  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"]
    }
  )
);

router.get(
  "/google/callback",

  passport.authenticate(
    "google",
    {
      session: false
    }
  ),

  (req, res) => {

    res.redirect(
  `http://localhost:5173/2fa?token=${req.user.token}`
);

  }
);

router.get(
  "/profile",
  protect,
  getProfile
);

module.exports = router;
