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
    let { name, username, email, password, photo } = req.body;
    if (!name || !email || !password || !username) {
      if (req.file) {
        fs.unlinkSync(photoPath);
      }
      return res.status(400).json({ status: "fail", message: "All fields are required" });
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

    const user = await User.create({ name, email, username, password, photo });

    // jwt
    const token = jwt.sign(
      { id: user._id, email },
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

  existingUser.password = undefined
  const token = jwt.sign(
    { id: existingUser._id, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return res.status(200).json({
    status: "success",
    token: token,
    data: { user: { name: existingUser.name } },
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

    console.log(userId)
    console.log(name)
    console.log(username)
    console.log(newPhoto)

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
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return res.status(200).json({ status: "success", token ,data: { user } });
    }

  } catch (error) {
    if (req.file) {
      try {
        fs.unlinkSync(path.join(__dirname, "../uploads", req.file.filename));
      } catch (err) {
        console.error("Error deleting uploaded file:", err);
      }
    }
    console.log("error reached here")
    res.status(400).json({ status: "fail", message: `error in updating the task ${error.message}` });
  }
}

const resetPassword = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const { email, oldpassword, newPassword, confirmedPassword } = req.body;
    if (!email || !oldpassword || !newPassword || !confirmedPassword) {
      return res.status(400).json({ status: "fail", message: "All fields are required" });
    }

    const matchedPassword = await bcrypt.compare(oldpassword, user.password);
    if (!matchedPassword) {
      return res.status(400).json({ status: "fail", message: "Old password is incorrect" });
    }

    if (newPassword !== confirmedPassword) {
      return res.status(400).json({ status: "fail", message: "New password and confirmed password do not match" });
    }

    if (newPassword === oldpassword) {
      return res.status(400).json({ status: "fail", message: "New password cannot be the same as the old password" });
    }

    user.password = newPassword;
    await user.save();
    return res.status(200).json({ status: "success", message: "Password updated successfully" });

  } catch (error) {
    return res.status(404).json({ status: "fail", message: error.message });
  }
}

module.exports = { signup, login, protectRoutes, updateUserDetails, getAllUsers, getUserDetails, resetPassword };