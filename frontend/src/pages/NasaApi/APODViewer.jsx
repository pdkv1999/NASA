// Importing necessary modules and hooks
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VITE_NASA_API_KEY from "../../config/apiConfig";   // API key for NASA's APOD API

// APODViewer component definition
const APODViewer = () => {
  // Getting today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // State variables for managing component data
  const [selectedDate, setSelectedDate] = useState(today);      // State for selected date
  const [apodData, setApodData] = useState(null);               // State for APOD data
  const [error, setError] = useState("");                       // State for error messages
  const [loading, setLoading] = useState(false);                // State for loading indicator
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State for responsive layout

  // useEffect hook for handling window resize and fetching data on mount
  useEffect(() => {
    window.addEventListener("resize", handleResize);            // Add resize event listener
    fetchAPOD(selectedDate);                                    // Fetch APOD for today's date by default

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to update isMobile state based on window width
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Function to fetch APOD data from NASA API
  const fetchAPOD = useCallback(async (date) => {
    if (!date) return;                                         // Return if no date is provided
    try {
      setLoading(true);                                         // Show loading indicator
      setError("");                                             // Clear previous errors
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${VITE_NASA_API_KEY}&date=${date}`
      );
      setApodData(response.data);                               // Save fetched data in state
    } catch (error) {
      setError(error.response?.data?.msg || "No data found for this date."); // Show error message
      setApodData(null);                                        // Clear previous data on error
    } finally {
      setLoading(false);                                        // Hide loading indicator
    }
  }, []);

  // Function to handle date input changes
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);                                   // Update selected date
    fetchAPOD(newDate);                                         // Fetch APOD for the new date
  };

  // Returning JSX for the APODViewer component
  return (
    <div className="container mx-auto px-4 py-8 bg-cover bg-center" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <h1 className="text-center text-3xl font-semibold mb-4 text-white">Astronomy Picture of the Day</h1>
      <p className="text-lg text-white mb-8 text-center">
        Explore the Astronomy Picture of the Day! Discover stunning images from NASA, offering daily glimpses of the universe.
      </p>
      
      {/* Date Picker Input */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={today} // Prevents selecting future dates
          className="p-2 mr-2 border rounded mb-2 lg:mr-4 lg:mb-0"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin h-10 w-10 border-t-4 border-purple-500 border-solid rounded-full"></div>
        </div>
      ) : (
        apodData && (
          <div className="mb-8">
            <div className={isMobile ? "mb-4" : "flex flex-row mb-4"}>
              {/* Conditional rendering based on media type */}
              {apodData.media_type === "image" ? (
                <img src={apodData.url} alt={apodData.title} className="max-w-full md:max-w-md mb-4 md:mr-4 rounded-lg shadow-lg" loading="lazy" />
              ) : (
                <iframe 
                  title={apodData.title} 
                  src={apodData.url} 
                  frameBorder="0" 
                  allowFullScreen 
                  className="max-w-full md:max-w-md mb-4 md:mr-4 rounded-lg shadow-lg"
                ></iframe>
              )}
              <div className="text-white">
                <p className="text-lg font-semibold mb-2">{apodData.title}</p>
                <p className="mb-2">{apodData.date}</p>
                <p>{apodData.explanation}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// Exporting APODViewer component
export default APODViewer;
