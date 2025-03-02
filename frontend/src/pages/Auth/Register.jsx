import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/commonFunctions";
import axios from "axios";
import { toast } from 'react-toastify';
import { Eye, EyeOff } from "lucide-react";
import { FaSpinner } from 'react-icons/fa';  // For the loading spinner

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);  // Add loading state
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one special character, and one number"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);  // Set loading to true when the request starts
      const response = await axios.post(
        "https://nasa-dp3s.onrender.com/api/users/register",
        { firstName, lastName, email, password }
      );
      setLoading(false);  // Set loading to false when the request is complete

      if (response.data.success) {
        toast.success("User registered successfully");
        navigate("/login");
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      setLoading(false);  // Set loading to false in case of an error
      toast.error("Error registering user:", error);
      alert("An error occurred while registering. Please try again later.");
    }
  };

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
                  className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-r hover:from-[#FEB47B] hover:to-[#FF7E5F] transition-all duration-300 ease-in-out flex items-center justify-center"
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
                <a href="/login" className="text-[#FEB47B] font-semibold">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
