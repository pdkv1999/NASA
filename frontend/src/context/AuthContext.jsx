// Importing necessary hooks and methods from React
import React, { createContext, useState, useEffect, useContext } from 'react';

// Creating a context for authentication
const AuthContext = createContext();

// Creating a context provider component for authentication
export const AuthProvider = ({ children }) => {
  // State to manage login status, initialized based on localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Retrieve login status from localStorage or default to false
    const loggedIn = localStorage.getItem('isLoggedIn');
    return loggedIn === 'true';
  });
  
  // Effect to synchronize login status with localStorage
  useEffect(() => {
    // Retrieve login status from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true' || loggedIn === 'false') {
      // Update state if the value is valid
      setIsLoggedIn(loggedIn === 'true');
    } else {
      // Default to false if value is unexpected
      setIsLoggedIn(false);
    }
  }, []);
  
  // Function to handle user login
  const login = () => {
    setIsLoggedIn(true);                     // Update state to logged in
    localStorage.setItem('isLoggedIn', 'true'); // Save status in localStorage
  };
  
  // Function to handle user logout
  const logout = () => {
    setIsLoggedIn(false);                    // Update state to logged out
    localStorage.removeItem('isLoggedIn');   // Remove status from localStorage
  };

  // Providing authentication context to children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume authentication context
export const useAuth = () => useContext(AuthContext);
