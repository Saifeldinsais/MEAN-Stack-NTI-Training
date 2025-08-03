const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String, required: [true, "Task title is required"], unique: true
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Crucial"],
        default: "Mmedium"
    },
    dueDate: {
        type: Date
    },
    status:{
        type: String,
        enum: ["Not started", "In progress", "Completed", "Late", "Cancelled", "Delayed"],
        Default: "Not started",
    },
    comments: {
        type: String
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;