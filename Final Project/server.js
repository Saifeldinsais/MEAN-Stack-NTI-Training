const express = require('express');
const connectDB = require("./config/db");
const taskRouter = require("./routers/tasks.routers")
const app = express();

connectDB();
app.use(express.json());
app.use("/tasks", taskRouter);

app.listen(5000, () => {
  console.log('Server is running on port: 5000');
});