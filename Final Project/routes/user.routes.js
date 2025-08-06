const express = require("express");
const userControllers = require("../controllers/user.controller");
const multer = require("multer");
const upload = require("../middleware/upload.middleware");
const multerErrorHandler = require("../middleware/multer.error.handler");

const router = express.Router();

router.route("/signup").post(upload.single("photo"),multerErrorHandler, userControllers.signup);
router.post("/login", userControllers.login);
router.post( "/listTasks", 
  userControllers.protectRoutes, 
  userControllers.addTaskToList,
  userControllers.deleteTaskByID
);
router.patch("/updateUser", 
  userControllers.protectRoutes, 
  userControllers.updateUserDetails,
  userControllers.updateTaskByID
);
router.get("/getAllUsers", userControllers.getAllUsers);

module.exports = router;