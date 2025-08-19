const Task = require("../models/tasks.model");
const User = require("../models/user.model");



const addTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, priority, dueDate, status, comments } = req.body;
    console.log("File received:", req.file);
    const imagePath = req.file ? req.file.filename : null;
//    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;


    if (!title) {
      return res.status(400).json({ status: "fail", message: "Title is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const newTask = await Task.create({
      title, description, priority, dueDate, status, comments, coverImage: imagePath
    });

    user.listTasks.push(newTask._id);
    await user.save();

    return res.status(200).json({ status: "success", data: { task: newTask } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: `error in addTask: ${error.message}` });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("listTasks");

    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    console.log(user.listTasks)

    return res.status(200).json({ status: "success", data: { tasks: user.listTasks } });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: `error in getUserTasks: ${error.message}` });
  }
};

const updateTaskByID = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    const user = await User.findById(userId);
    if (!user || !user.listTasks.includes(taskId)) {
      return res.status(403).json({ status: "fail", message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedTask) {
      return res.status(404).json({ status: "fail", message: "Task not found" });
    }

    return res.status(200).json({ status: "success", data: { task: updatedTask } });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: `error in updateTaskByID: ${error.message}` });
  }
};

const deleteTaskByID = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    const user = await User.findById(userId);
    if (!user || !user.listTasks.includes(taskId)) {
      return res.status(403).json({ status: "fail", message: "Not authorized" });
    }

    user.listTasks = user.listTasks.filter(id => id.toString() !== taskId);
    await user.save();

    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({ status: "success", message: "Task deleted", data: { tasks: user.listTasks } });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: `error in deleteTaskByID: ${error.message}` });
  }
};

const getTaskById = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    const user = await User.findById(userId);
    if (!user || !user.listTasks.includes(taskId)) {
      return res.status(403).json({ status: "fail", message: "Not authorized" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ status: "fail", message: "Task not found" });
    }

    return res.status(200).json({ status: "success", data: { task: task } });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: `error in getTaskByid: ${error.message}` });
  }
};

module.exports = {
  addTask,
  getUserTasks,
  updateTaskByID,
  deleteTaskByID,
  getTaskById
};
