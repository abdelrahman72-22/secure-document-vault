const express =
  require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const {

  getAllUsers,
  changeRole

} = require(
  "../controllers/adminController"
);

router.get(

  "/users",

  protect,

  authorizeRoles("ADMIN"),

  getAllUsers

);

router.put(

  "/users/:id/role",

  protect,

  authorizeRoles("ADMIN"),

  changeRole

);

module.exports = router;
