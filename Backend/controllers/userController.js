const User = require("../models/userModel");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidEmail, validatePassword } = require("../utils/commonFunctions");

// Helper function to handle errors
const handleError = (res, error, message) => {
  logger.error(message, error);
  res.status(500).json({ success: false, message, error: error.message });
};

// Controller to register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check for missing required fields
    if (!firstName || !lastName || !email || !password) {
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

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, message: "New user created", data: user });
  } catch (error) {
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

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn("Email or password is not valid during user login");
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect, please try again",
      });
    }

    // Generate access token
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
    const users = await User.find();
    res.status(200).json({ success: true, message: "Users retrieved", data: users });
  } catch (error) {
    handleError(res, error, "Error while retrieving users");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};