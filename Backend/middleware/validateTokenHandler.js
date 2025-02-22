const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res
            .status(401)
            .json({ success: false, error: "User is not authorized" });
        }
        req.user = decoded.user;
        next(); // Call next middleware
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "User is not authorized or token is missing",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      error,
      message: "Error while validating token",
    });
  }
};

module.exports = validateToken;
