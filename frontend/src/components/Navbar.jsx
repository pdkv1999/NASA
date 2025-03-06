// Importing necessary modules and hooks from React and other libraries
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";           // Custom hook for authentication
import { toast } from "react-toastify";                     // For displaying toast notifications

// Defining Header functional component
const Header = () => {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Extracting authentication status and logout function from custom hook
  const { isLoggedIn, logout } = useAuth();

  // Function to handle user logout
  const handleLogout = () => {
    try {
      toast.success("You've logged out successfully");        // Success message
      localStorage.removeItem("isLoggedIn");                  // Clearing local storage
      localStorage.removeItem("auth");
      logout();                                               // Calling logout function from context
      navigate("/");                                          // Redirecting to home page
    } catch (error) {
      toast.error("Error logging out");                       // Error message on failure
    }
  };

  // Function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Returning JSX for Header component
  return (
    <header>
      {/* Navigation bar with responsive styling */}
      <nav className="bg-gray-200 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo and brand name */}
          <a href="/" className="flex items-center">
            <img src="/nasa.png" className="mr-3 h-6 sm:h-9" alt="Nasa Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Dileep
            </span>
          </a>

          {/* Authentication buttons */}
          <div className="flex items-center lg:order-2">
            {!isLoggedIn ? (
              <a
                href="/login"
                className="text-white bg-[#A020F0] hover:bg-[#00B5B8] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Register / Login
              </a>
            ) : (
              <a
                href="/"
                onClick={handleLogout}                       // Logout functionality
                className="text-white bg-[#A020F0] hover:bg-[#00B5B8] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Logout
              </a>
            )}

            {/* Mobile menu toggle button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:block lg:order-1 w-full lg:w-auto`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a href="/gallery" className="link-class">Mars Rover Photos</a>
              </li>
              <li>
                <a href="/apod" className="link-class">Astronomy Picture of the Day</a>
              </li>
              <li>
                <a href="/earth" className="link-class">NeoWs</a>
              </li>
              <li>
                <a href="/epic" className="link-class">Earth Polychromatic Imaging Camera</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

// Exporting Header component for use in other parts of the application
export default Header;
