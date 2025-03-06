// Importing necessary modules and components
import React from "react";
import ReactDOM from "react-dom/client";                      // React DOM for rendering components
import App from "./App.jsx";                                  // Main App component
import "./index.css";                                         // Global CSS styles
import { ToastContainer } from 'react-toastify';               // Toast container for notifications
import 'react-toastify/dist/ReactToastify.css';                // Styles for react-toastify
import { AuthProvider } from './context/AuthContext.jsx';      // Authentication context provider

// Creating root element and rendering App component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>                                           {/* Enables strict mode for development */}
    <AuthProvider>                                              {/* Provides authentication state globally */}
        <App />                                                 {/* Main application component */}
      <ToastContainer />                                        {/* Container for displaying toast notifications */}
    </AuthProvider>
  </React.StrictMode>
);
