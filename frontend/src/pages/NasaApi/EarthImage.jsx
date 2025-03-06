// Importing necessary modules and hooks
import React, { useState } from "react";
import VITE_NASA_API_KEY from "../../config/apiConfig"; // API key for NASA's Earth imagery API

// EarthImage component definition
const EarthImage = () => {
  // State variables for managing component data
  const [latitude, setLatitude] = useState("");                // State for latitude input
  const [longitude, setLongitude] = useState("");              // State for longitude input
  const [date, setDate] = useState("");                        // State for date input
  const [imageUrl, setImageUrl] = useState("");                // State for image URL
  const [errorMessage, setErrorMessage] = useState("");        // State for error messages
  const [loading, setLoading] = useState(false);               // State for loading indicator

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);                                          // Show loading indicator
    setImageUrl("");                                           // Clear old image
    setErrorMessage("");                                        // Clear previous error messages

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Validation for future date
    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate > today) {
      setErrorMessage("You have selected a future date. Please select a valid date.");
      setLoading(false);
      return;
    }

    // Validation for latitude and longitude ranges
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setErrorMessage("Invalid latitude (-90 to 90) or longitude (-180 to 180).");
      setLoading(false);
      return;
    }

    // Validation for empty date
    if (!date) {
      setErrorMessage("Please select a date.");
      setLoading(false);
      return;
    }

    try {
      // Fetching Earth image from NASA API
      const response = await fetch(
        `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.1&date=${date}&api_key=${VITE_NASA_API_KEY}`
      );

      if (!response.ok) {
        // Handling API errors
        setErrorMessage(response.status === 400 ? "No images available." : "Failed to fetch data.");
      } else {
        const contentType = response.headers.get("content-type");
        const data = contentType?.includes("application/json") ? await response.json() : await response.blob();
        setImageUrl(data.url || URL.createObjectURL(data));      // Set image URL from API response
      }
    } catch (error) {
      console.error("Error fetching Earth image:", error);
      setErrorMessage("Error fetching Earth image. Please try again later.");
    } finally {
      setLoading(false);                                        // Hide loading indicator
    }
  };

  // Returning JSX for the EarthImage component
  return (
    <div
      className="flex flex-col items-center py-10 min-h-screen"
      style={{ backgroundImage: 'url("/background.jpg")', backgroundSize: "cover" }}
    >
      {/* Header and Description */}
      <div className="flex flex-col items-center">
        <h1 className="text-center text-3xl font-semibold text-white">NeoWs</h1>
        <p className="text-center text-lg text-white mb-8 px-4">
          Discover breathtaking images of Earth taken by NASA's EPIC camera. Explore stunning photos of our planet from space.
        </p>

        {/* Form for submitting latitude, longitude, and date */}
        <br />
        <p className="text-center text-lg text-white mb-8 px-4">
          Use the sample data like latitude -6.36, longitude 176.40, and date 2025-02-23, then click "Show Image" to view the results.
          Click on the "Earth Polychromatic Imaging Camera" tab to find all latitude and longitude details, then copy and paste them into NEOWS to try.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-wrap justify-center">
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="border px-4 py-2 rounded-md mr-2 mb-2"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="border px-4 py-2 rounded-md mr-2 mb-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-4 py-2 rounded-md mr-2 mb-2"
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${
              latitude && longitude && date ? "bg-[#A020F0] hover:bg-[#00B5B8]" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!latitude || !longitude || !date}
          >
            Show Image
          </button>
        </form>
      </div>

      {/* Error Message Display */}
      {errorMessage && <p className="text-red-500 text-2xl mt-3 font-bold">{errorMessage}</p>}

      {/* Loading Spinner or Image Display */}
      <div className="mt-5 flex justify-center items-center">
        {loading ? (
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-75"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-225"></div>
          </div>
        ) : (
          imageUrl && <img src={imageUrl} alt="Earth" className="rounded-md" style={{ maxWidth: "100%", maxHeight: "400px" }} />
        )}
      </div>
    </div>
  );
};

// Exporting EarthImage component
export default EarthImage;
