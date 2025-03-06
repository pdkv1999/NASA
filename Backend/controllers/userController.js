// Importing necessary modules
const User = require("../models/userModel");               // Mongoose model for User
const logger = require("../utils/logger");                 // Custom logger for logging errors and warnings
const bcrypt = require("bcrypt");                          // Library for password hashing
const jwt = require("jsonwebtoken");                       // Library for generating JSON Web Tokens
const { isValidEmail, validatePassword } = require("../utils/commonFunctions"); // Custom functions for email and password validation

// Helper function to handle errors consistently
const handleError = (res, error, message) => {
  logger.error(message, error);                            // Logging error message with stack trace
  res.status(500).json({ success: false, message, error: error.message }); // Sending error response
};

// Controller to register a new user
const registerUser = async (req, res) => {
  // Extracting user details from request body
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check for missing required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate email format using custom function
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate password strength using custom function
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    // Check if user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password before storing in the database
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds set to 10 for security
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Sending success response
    res.status(201).json({ success: true, message: "New user created", data: user });
  } catch (error) {
    // Error handling using helper function
    handleError(res, error, "Error while registering user");
  }
};

// Controller to login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for missing required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Find user by email and validate password
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn("Email or password is not valid during user login");
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect, please try again",
      });
    }

    // Generate access token with a 15-minute expiration
    const token = jwt.sign(
      {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Sending success response with token
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        id: user.id,
        name: user.firstName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    handleError(res, error, "Error while logging in user");
  }
};

// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();   // Fetching all users from the database
    res.status(200).json({ success: true, message: "Users retrieved", data: users });
  } catch (error) {
    handleError(res, error, "Error while retrieving users");
  }
};

// Exporting controller functions
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
