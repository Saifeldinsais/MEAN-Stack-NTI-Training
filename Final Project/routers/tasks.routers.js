const express = require("express")
const tasksController = require("../controllers/tasks.controllers");

const router = express.Router();

router.route("/").post(tasksController.addTask).get(tasksController.listTasks);
router.route("/:id").get(tasksController.getTaskByID).patch(tasksController.updateTaskByID).delete(tasksController.deleteTaskByID);


module.exports = router;