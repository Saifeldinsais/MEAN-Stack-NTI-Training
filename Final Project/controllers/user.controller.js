const User = require("../models/user.model");
const Task = require("../models/tasks.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: false, __v: false });
    res
      .status(200)
      .json({ status: "success", length: users.length, data: { users } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const signup = async (req, res) => {
  const uploadedPhoto = req.file ? req.file.filename : "profile.png";
  const photoPath = path.join(__dirname, "../uploads", uploadedPhoto);
  try {
    let { name, username, email, password, confirmPassword, photo } = req.body;
    if (!name || !email || !password || !confirmPassword || !username) {
      if (req.file) {
        fs.unlinkSync(photoPath);
      }
      return res.status(400).json({ status: "fail", message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      if (req.file) {
        fs.unlinkSync(photoPath);
      }
      return res.status(400).json({ status: "fail", message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      if (req.file) {
        fs.unlinkSync(photoPath);
      }
      return res.status(400).json({ status: "fail", message: "User already exists" });
    }

    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      if (req.file) {
        fs.unlinkSync(photoPath);
      }
      return res.status(400).json({ status: "fail", message: "Username already exists" });
    }


    password = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, username, password, photo });

    // jwt
    const token = jwt.sign(
      { id: user._id, name: name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ status: "success", token: token, data: { user: user } });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(photoPath);
    }
    res.status(400).json({ status: "fail", message: `Error in Sign up ${error.message}` });
  }
};

const login = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email && !username) {
    return res.status(400).json({ status: "fail", message: "please enter either the username or the email" });
  }

  if (!password) {
    return res.status(400).json({ status: "fail", message: "Password is required" });
  }

  const existingUser = email ? await User.findOne({ email }) : await User.findOne({ username });
  if (!existingUser) {
    return res.status(404).json({ status: "fail", message: "User not found" });
  }


  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) {
    return res.status(404).json({ status: "fail", message: "Wrong password" });
  }
  const token = jwt.sign(
    { id: existingUser._id, name: existingUser.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return res.status(200).json({
    status: "success",
    token: token,
    data: { user: { name: existingUser.name, email } },
  });
};

const protectRoutes = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }
    if (!token) {
      return res.status(400).json({ status: "fail", message: "Your are not logged in" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id
    next();
  } catch (error) {
    res.status(401).json({ status: "fail", message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId, { password: false, __v: false })
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    return res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
}

const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, username } = req.body;
    const newPhoto = req.file ? req.file.filename : null;

    const user = await User.findById(userId);
    if (!user) {
      if (newPhoto) {
        fs.unlinkSync(path.join(__dirname, "../uploads", newPhoto));
      }
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    let updated = false;

    if (name) {
      if (name !== user.name) {
        user.name = name;
        updated = true;
      } else {
        if (newPhoto) {
          fs.unlinkSync(path.join(__dirname, "../uploads", newPhoto));
        }
        return res.status(400).json({ status: "fail", message: "Name is already the same" });
      }
    }

    if (username) {
      if (username !== user.username) {
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
          if (newPhoto) {
            fs.unlinkSync(path.join(__dirname, "../uploads", newPhoto));
          }
          return res.status(400).json({ status: "fail", message: "Username already exists" });
        }
      }
      user.username = username;
      updated = true;

    }

    if (newPhoto) {
      if (user.photo && user.photo !== "profile.png") {
        try {
          fs.unlinkSync(path.join(__dirname, "../uploads", user.photo));
        } catch (err) {
          return res.status(500).json({ status: "fail", message: "Error deleting old photo" });
        }
      }
      user.photo = newPhoto;
      updated = true;
    }

    if (!updated) {
      return res.status(400).json({ status: "fail", message: "No changes made to user details" });
    } else {
      await user.save();
      return res.status(200).json({ status: "success", data: { user } });
    }

  } catch (error) {
    if (req.file) {
      try {
        fs.unlinkSync(path.join(__dirname, "../uploads", req.file.filename));
      } catch (err) {
        console.error("Error deleting uploaded file:", err);
      }
    }
    res.status(400).json({ status: "fail", message: error.message });
  }
}

const addTaskToList = async (req, res) => {
  try {

    const userId = req.userId;
    const { title, description, priority, dueDate, status, comments } = req.body;

    if (!title) {
      return res.status(400).json({ status: "fail", message: "Title is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const newTask = await Task.create({ title, description, priority, dueDate, status, comments });

    user.listTasks.push(newTask);
    await user.save();

    res.status(200).json({ status: "success", data: { listTasks: user.listTasks } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const deleteTaskByID = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskID } = req.body;

    if (!taskID) {
      return res.status(400).json({ status: "fail", message: "taskID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const taskIndex = user.listTasks.indexOf(taskID);
    if (taskIndex === -1) {
      return res.status(404).json({ status: "fail", message: "Task not found in user's list" });
    } else {
      user.listTasks.splice(taskIndex, 1);
      await user.save();
      return res.status(200).json({ status: "success", message: "Task removed from user's list" });
    }

  } catch (error) {
    return res.status(404).json({ status: "fail", message: error.message });
  }
}

const updateTaskByID = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ status: "fail", message: "Task not found" });
    }
    return res.status(200).json({ status: "success", data: { task } });
  } catch (error) {
    return res.status(404).json({ status: "fail", message: error.message });
  }
}

const getUserTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("listTasks");

    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const tasks = user.listTasks;
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ status: "fail", message: "No tasks found for this user" });
    }

    return res.status(200).json({ status: "success", data: { tasks } });

  } catch (error) {
    return res.status(404).json({ status: "fail", message: `Error getting user tasks: ${error.message}` })
  }
}

module.exports = { signup, login, protectRoutes, updateUserDetails, addTaskToList, getAllUsers, deleteTaskByID, updateTaskByID, getUserDetails, getUserTasks };