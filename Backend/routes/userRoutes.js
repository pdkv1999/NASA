// Importing express library to create routes
const express = require("express");
// Creating a router instance for handling routes
const router = express.Router();

// Importing controller functions for user operations
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController");

// Route to register a new user (POST request)
// Endpoint: /api/users/register
router.post("/register", registerUser);

// Route to login an existing user (POST request)
// Endpoint: /api/users/login
router.post("/login", loginUser);

// Route to get all users (GET request)
// Endpoint: /api/users/
router.get("/", getAllUsers);

// Exporting the router to be used in the main application
module.exports = router;
