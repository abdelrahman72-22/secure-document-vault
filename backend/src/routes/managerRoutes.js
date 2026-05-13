const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const {
  getAllDocuments
} = require(
  "../controllers/managerController"
);

router.get(

  "/documents",

  authMiddleware,

  authorizeRoles(
    "MANAGER",
    "ADMIN"
  ),

  getAllDocuments

);

module.exports =
  router;
