import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/commonFunctions";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // Importing eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");
    if (!validateEmail(email)) return toast.error("Enter a valid email address");
    if (!validatePassword(password))
      return toast.error("Password must be at least 8 characters with an uppercase letter, special character, and number");

    setLoading(true); // Set loading to true when the request starts

    try {
      const { data } = await axios.post("https://nasa-dp3s.onrender.com/api/users/login", { email, password });

      setLoading(false); // Set loading to false when the request is completed

      if (data.success) {
        toast.success("User logged in successfully");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("auth", JSON.stringify({ token: data.token, user: data.user }));
        navigate("/");
      } else {
        toast.error("Failed to login user");
      }
    } catch (error) {
      setLoading(false); // Set loading to false in case of error
      console.error("Login error:", error.response || error.message);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <video className="absolute w-full h-full object-cover z-0" autoPlay muted loop playsInline>
        <source src="/SolarSystem.webm" type="video/webm" />
      </video>
      <div className="absolute w-full h-full flex items-center justify-center z-10">
        <div className="xl:max-w-2xl bg-white p-5 sm:p-10 rounded-md">
          <h1 className="text-center text-xl sm:text-3xl font-semibold text-black">
            Login to unlock the secrets of the universe
          </h1>
          <form onSubmit={handleSubmit} className="w-full mt-8">
            <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
              {/* Email Input */}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none bg-gray-100 text-black focus:border-black"
                type="email"
                placeholder="Enter your email"
                required
              />
              
              {/* Password Input with Eye Toggle */}
              <div className="relative w-full">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none bg-gray-100 text-black focus:border-black pr-12"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                {/* Eye Icon Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-[#FF7E5F] to-[#0000FF] text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-r hover:from-[#0000FF] hover:to-[#FF7E5F] transition-all duration-300 ease-in-out flex items-center justify-center"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                )}
                <span className="ml-3">{loading ? "Logging in..." : "Login"}</span>
              </button>

              {/* Register Link */}
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <a href="/register" className="text-[#0000FF] font-semibold">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
