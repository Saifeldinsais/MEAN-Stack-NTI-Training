const express = require("express");
const userControllers = require("../controllers/user.controller");
const multer = require("multer");
const upload = require("../middleware/upload.middleware");
const multerErrorHandler = require("../middleware/multer.error.handler");

const router = express.Router();

router.route("/signup").post(upload.single("photo"), multerErrorHandler, userControllers.signup);
router.post("/login", userControllers.login);
router.post("/addTasks",
  userControllers.protectRoutes,
  userControllers.addTaskToList
);
router.patch("/updateUser",
  upload.single("photo"),
  multerErrorHandler,
  userControllers.protectRoutes,
  userControllers.updateUserDetails
);

router.patch("/updateUserTask/:id",
  userControllers.protectRoutes,
  userControllers.updateTaskByID
);

router.patch("/updatePassword",
  userControllers.protectRoutes,
  userControllers.resetPassword
);


router.get("/getUserDetails", userControllers.protectRoutes, userControllers.getUserDetails);
router.get("/getUserTasks", userControllers.protectRoutes, userControllers.getUserTasks);

router.delete("/deleteTask/:id", userControllers.protectRoutes,
  userControllers.deleteTaskByID
)
router.get("/", userControllers.getAllUsers);

module.exports = router;