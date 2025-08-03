const Task = require("../models/tasks.model");

const addTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ status: "success", message: "Task added successfully" });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

const listTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ status: "success", length: tasks.length, data: { tasks: tasks } })

    } catch (error) {
        res.status(404).json({ status: "fail", message: error.message });
    }
}

const getTaskByID = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json({ status: "success", data: { task: task } })
    } catch (error) {
        res.status(404).json({ status: "fail", message: error.message });
    }
}

const updateTaskByID = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({ status: "success", data: { task: task } })
    } catch (error) {
        res.status(404).json({ status: "fail", message: error.message })
    }
}

const deleteTaskByID = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "success", data: { task: task } })
    } catch (error) {
        res.status(404).json({ status: "fail", message: error.message })
    }
}

module.exports = {
    addTask, getTaskByID, listTasks, updateTaskByID, deleteTaskByID
}