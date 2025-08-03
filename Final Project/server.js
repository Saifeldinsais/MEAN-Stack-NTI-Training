const express = require("express");
const eventRouter = require("./routers/tasks.routers");
const usersRouter = require("./routers/user.routers");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT;
connectDB();


app.use("/tasks", eventRouter);
app.use("/tasks", usersRouter);
app.use("/uploads",express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`My Events Server is Listening on port ${PORT}`);
});