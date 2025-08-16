const express = require("express")
const tasksController = require("../controllers/tasks.controllers");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.use(userController.protectRoutes);

router.route("/")
  .post(tasksController.addTask)
  .get(tasksController.getUserTasks);

router.route("/:id")
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTaskByID)
  .delete(tasksController.deleteTaskByID);


module.exports = router;