// Importing necessary modules
const express = require("express");                     // Express for server setup
const cors = require("cors");                           // CORS for handling cross-origin requests
const databaseConnection = require("./config/dbConnection"); // Custom module for database connection
const dotenv = require("dotenv");                       // dotenv for managing environment variables

// Loading environment variables from .env file
dotenv.config();

// Creating an instance of an Express application
const app = express();

// Setting the port from environment variables or defaulting to 8090
const port = process.env.PORT || 8090;

// Middleware to parse JSON requests
app.use(express.json());

// Configuring CORS to allow requests from specific origins
app.use(
  cors({
    origin: ["https://nasa-eight-gules.vercel.app/"],   // Allowed origin for security
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers for requests
    credentials: true,                                  // Allowing credentials like cookies or tokens
  })
);

// Setting up routes for user-related operations
app.use("/api/users", require("./routes/userRoutes"));

// Starting the server and establishing a database connection
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  databaseConnection();  // Connecting to MongoDB database
});

// Exporting app for testing or other purposes
module.exports = app;
