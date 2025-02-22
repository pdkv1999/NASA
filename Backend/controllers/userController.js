const User = require("../models/userModel");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidEmail, validatePassword } = require("../utils/commonFunctions");

// Controller to register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //check for missig required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missig required fields",
      });
    }
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
        message:
          "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (user) {
      res
        .status(201)
        .json({ success: true, message: "New user created", data: user });
    } else {
      logger.error("User data not valid during registration");
      res.status(400).json({ success: false, error: "User data not valid" });
    }
  } catch (error) {
    logger.error("Error while registering user", error);
    res.status(500).json({
      success: false,
      error,
      message: "Error while registering user",
    });
  }
};

// Controller to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check for missig required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missig required fields",
      });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    // Find the user by email
    const user = await User.findOne({ email });
    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
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
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          id: user.id,
          name: user.firstName,
          email: user.email,
        },
        token,
      });
    } else {
      logger.warn("Email or password is not valid during user login");
      res
        .status(400)
        .json({ success: false, error: "Email or password is not valid" });
    }
  } catch (error) {
    logger.error("Error while logging user:", error);
    res.status(500).json({
      success: false,
      error,
      message: "Error while logging user",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res
        .status(200)
        .json({ success: true, message: "Users retrieved", data: users });
    } else {
      logger.error("Error in retrieving users");
      res
        .status(400)
        .json({ success: false, error: "Error in retrieving users" });
    }
  } catch (error) {
    logger.error("Error while getting all users:", error);
    res.status(500).json({
      success: false,
      error,
      message: "Error while getting all users",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
