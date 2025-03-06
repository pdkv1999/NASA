// Importing necessary modules
const jwt = require("jsonwebtoken");         // Library for handling JSON Web Tokens
const logger = require("../utils/logger");    // Custom logger for logging errors

// Middleware to validate JSON Web Tokens
const validateToken = async (req, res, next) => {
  try {
    let token;
    // Extracting Authorization header from the request
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    // Checking if the Authorization header exists and starts with 'Bearer'
    if (authHeader && authHeader.startsWith("Bearer")) {
      // Extracting the token part from 'Bearer <token>'
      token = authHeader.split(" ")[1];

      // Verifying the token using the secret key
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          // Token is invalid or expired
          return res.status(401).json({ 
            success: false, 
            error: "User is not authorized" 
          });
        }
        // Storing decoded user information in request object for further use
        req.user = decoded.user;

        // Proceed to the next middleware or route handler
        next(); 
      });
    } else {
      // Authorization header is missing or does not start with 'Bearer'
      return res.status(401).json({
        success: false,
        error: "User is not authorized or token is missing",
      });
    }
  } catch (error) {
    // Logging error if something goes wrong during token validation
    logger.error(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Error while validating token",
    });
  }
};

// Exporting the middleware function for use in other parts of the application
module.exports = validateToken;
