// Importing mongoose library for MongoDB interaction
const mongoose = require("mongoose");
// Importing dotenv library to manage environment variables
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

// Fetching MongoDB URL from environment variables
const URL = process.env.MONGODB_URL;

// Function to establish a connection to the MongoDB database
const databaseConnection = () => {
  // Connecting to MongoDB using the URL from environment variables
  mongoose.connect(URL);

  // Setting mongoose to use strict query mode for safety (disallows unknown fields in queries)
  mongoose.set("strictQuery", true);

  // Getting a reference to the database connection
  const connection = mongoose.connection;

  // Event listener for a successful connection
  connection.once("open", () => {
    console.log(`Database Connection Success`);
  });
};

// Exporting the function to be used in other parts of the application
module.exports = databaseConnection;
