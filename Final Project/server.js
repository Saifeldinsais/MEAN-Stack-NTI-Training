const express = require("express");
const eventRouter = require("./routes/tasks.routes");
const usersRouter = require("./routes/user.routes");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
app.use(express.json());
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT;
connectDB();


app.use("/tasks", eventRouter);
app.use("/users", usersRouter);
app.use(cors({origin: 'http://localhost:4200'}));

app.get('/tasks', (req, res) => {
  
  console.log('CORS is working!');
  res.json({ message: 'CORS working!' });
});

app.listen(PORT, () => {
  console.log(`My Events Server is Listening on port ${PORT}`);
});