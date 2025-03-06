// Importing mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Defining the schema for User collection in MongoDB
const userSchema = mongoose.Schema(
  {
    // Defining firstName field as a required string
    firstName: {
      type: String,
      required: true,
    },
    // Defining lastName field as a required string
    lastName: {
      type: String,
      required: true,
    },
    // Defining email field as a required and unique string
    email: {
      type: String,
      required: true,
      unique: true,   // Ensures no duplicate emails in the collection
    },
    // Defining password field as a required string
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Adding createdAt and updatedAt timestamps automatically
    timestamps: true,
  }
);

// Creating a Mongoose model named 'User' using the schema defined above
const User = mongoose.model("User", userSchema);

// Exporting the model to be used in other parts of the application
module.exports = User;
