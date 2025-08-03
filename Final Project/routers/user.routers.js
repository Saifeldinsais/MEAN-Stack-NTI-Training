const express = require("express");
const userControllers = require("../controllers/user.controller");
const multer = require("multer");

const router = express.Router();

router.post("/signup", userControllers.signup);
router.get("/", userControllers.getAllUsers);
router.post("/login", userControllers.login);
router.post(
  "/favoriteTask",
  userControllers.protectRoutes,
  userControllers.addTaskToFav
);

module.exports = router;