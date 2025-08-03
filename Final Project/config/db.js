const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://saifeldinsais:ptCjLx3NpBDTRzTg@cluster0.yw38mns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { dbName: "TasksDB" }
    );
    console.log(`Database Connection Successfully`);
  } catch (error) {
    console.log(`Error in Connection with Database. ${error}`);
  }
};
module.exports = connectDB;