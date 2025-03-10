// Importing necessary modules and hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";        // For navigation
import { validateEmail, validatePassword } from "../../utils/commonFunctions"; // Validation functions
import axios from "axios";                             // For HTTP requests
import { toast } from 'react-toastify';                 // For notifications
import { Eye, EyeOff } from "lucide-react";             // Eye icons for password visibility toggle
import { FaSpinner } from 'react-icons/fa';             // Spinner for loading state

// Register component definition
const Register = () => {
  // State variables for form data and UI behavior
  const [firstName, setFirstName] = useState("");       // State for first name
  const [lastName, setLastName] = useState("");         // State for last name
  const [email, setEmail] = useState("");               // State for email
  const [password, setPassword] = useState("");         // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [showPassword, setShowPassword] = useState(false);    // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility
  const [loading, setLoading] = useState(false);        // Loading state for form submission
  const navigate = useNavigate();                       // For page navigation

  // Enabling cookies with axios requests
  axios.defaults.withCredentials = true;

  // Functions to toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side form validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one special character, and one number");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);  // Show loading spinner

      // Sending registration request to the backend
      const response = await axios.post(
        "https://nasa-dp3s.onrender.com/api/users/register",
        { firstName, lastName, email, password }
      );
      setLoading(false);  // Stop loading spinner

      // Handling registration response
      if (response.data.success) {
        toast.success("User registered successfully");
        navigate("/login");  // Redirect to login page
      } else if (response.data.message === "User already exists") {
        toast.error("User already exists. Please log in or use a different email.");
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      setLoading(false);  // Stop loading spinner in case of error
      if (error.response && error.response.status === 409) {
        toast.error("User already exists. Please log in or use a different email.");
      } else {
        toast.error("Error registering user: " + (error.message || error));
      }
    }
  };

  // Returning JSX for the Register component
  return (
    <div className="relative w-full h-screen">
      <video
        className="absolute w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/SolarSystem.webm" type="video/webm" />
      </video>
      <div className="absolute w-full h-full flex items-center justify-center z-10">
        <div className="xl:max-w-2xl bg-white w-full p-5 sm:p-8 rounded-md">
          <h1 className="text-center text-xl sm:text-3xl font-semibold text-black">Register now</h1>
          <div className="w-full mt-8">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg border-2 bg-gray-100 text-black focus:border-black"
                  type="text"
                  placeholder="Your first name"
                  required
                  disabled={loading}  // Disable input if loading
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg border-2 bg-gray-100 text-black focus:border-black"
                  type="text"
                  placeholder="Your last name"
                  required
                  disabled={loading}  // Disable input if loading
                />
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-lg border-2 bg-gray-100 text-black focus:border-black"
                type="email"
                placeholder="Enter your email"
                required
                disabled={loading}  // Disable input if loading
              />

              {/* Password Field */}
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg border-2 bg-gray-100 text-black focus:border-black pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  disabled={loading}  // Disable input if loading
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  onClick={togglePasswordVisibility}
                  disabled={loading}  // Disable button if loading
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg border-2 bg-gray-100 text-black focus:border-black pr-10"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}  // Disable input if loading
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={loading}  // Disable button if loading
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Loading Spinner and Message */}
              {loading ? (
                <div className="flex justify-center items-center space-x-2 mt-4">
                  <FaSpinner className="animate-spin text-xl" />
                  <span>Please wait while registering the user...</span>
                </div>
              ) : (
                <button
                  className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-[#FF7E5F] to-[#0000FF] text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-r hover:from-[#0000FF] hover:to-[#FF7E5F] transition-all duration-300 ease-in-out flex items-center justify-center"
                  onClick={handleSubmit}
                  disabled={loading}  // Disable button if loading
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Register</span>
                </button>
              )}
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-[#0000FF] font-semibold">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting Register component
export default Register;
