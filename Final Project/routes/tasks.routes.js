const express = require("express")
const tasksController = require("../controllers/tasks.controllers");
const userController = require("../controllers/user.controller");
const multer = require("multer");
const upload = require("../middleware/upload.middleware");
const multerErrorHandler = require("../middleware/multer.error.handler");

const router = express.Router();

// router.use(userController.protectRoutes);

router.route("/")
  .post(upload.single("taskPhoto"), multerErrorHandler,tasksController.addTask)
  .get(tasksController.getUserTasks);

router.route("/:id")
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTaskByID)
  .delete(tasksController.deleteTaskByID);


module.exports = router;