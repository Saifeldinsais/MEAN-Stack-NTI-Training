const express = require("express");
const userControllers = require("../controllers/user.controller");
const multer = require("multer");
const upload = require("../middleware/upload.middleware");
const multerErrorHandler = require("../middleware/multer.error.handler");

const router = express.Router();

router.route("/signup").post(upload.single("photo"), multerErrorHandler, userControllers.signup);
router.post("/login", userControllers.login);


router.patch("/updateUser",
  upload.single("photo"),
  multerErrorHandler,
  userControllers.protectRoutes,
  userControllers.updateUserDetails
);

router.patch("/updatePassword",
  userControllers.protectRoutes,
  userControllers.resetPassword
);


router.get("/getUserDetails", userControllers.protectRoutes, userControllers.getUserDetails);


router.get("/", userControllers.getAllUsers);

module.exports = router;