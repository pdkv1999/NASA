const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const URL = "mongodb+srv://124116108:2GX4qsf4uHUGT09e@dileep-nasa-api.xwdqi.mongodb.net/?retryWrites=true&w=majority&appName=Dileep-NASA-API";

const databaseConnection = () => {
  mongoose.connect(URL);
  mongoose.set("strictQuery", true);

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log(`Database Connection Success`);
  });
};

module.exports = databaseConnection;
