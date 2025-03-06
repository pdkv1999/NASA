// Importing necessary modules and hooks
import React, { useState, useEffect } from "react";

// Defining the NASA EPIC API URL
const EPIC_API_URL = "https://epic.gsfc.nasa.gov/api/natural";

// Epic component definition
function Epic() {
  // State variables for managing component data
  const [images, setImages] = useState([]);                  // State for storing EPIC images data
  const [loading, setLoading] = useState(true);               // State for managing loading status

  // useEffect hook to fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(EPIC_API_URL);           // Fetching data from NASA EPIC API
        if (!response.ok) throw new Error("Failed to fetch images"); // Error handling for failed requests
        const data = await response.json();                   // Parsing JSON response
        setImages(data);                                      // Saving image data to state
      } catch (error) {
        console.error("Error fetching images:", error);       // Logging error to console
      } finally {
        setLoading(false);                                    // Hide loading indicator after fetch
      }
    };

    fetchImages();                                            // Invoking the fetch function
  }, []);                                                     // Empty dependency array to run only once

  // Returning JSX for the Epic component
  return (
    <div className="min-h-screen p-8" style={{ backgroundImage: 'url("/background.jpg")' }}>
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-[#0000FF] animate-ping"></div>
        </div>
      ) : (
        <>
          {/* Header and Description */}
          <h1 className="text-center text-3xl font-semibold text-white">NASA EPIC Images</h1>
          <p className="lg:text-lg text-gray-700 mb-8 text-center mt-4 text-white">
            Explore stunning natural images of Earth captured by NASA's EPIC (Earth Polychromatic Imaging Camera). Each image is accompanied by its date of capture, center latitude, and longitude coordinates.
          </p>

          {/* Grid of Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.identifier} className="bg-white p-4 rounded-lg shadow-md overflow-hidden transform hover:scale-110 transition duration-300">
                {/* Constructing image URL dynamically based on API response */}
                <img
                  src={`https://epic.gsfc.nasa.gov/archive/natural/${image.date.slice(0, 4)}/${image.date.slice(5, 7)}/${image.date.slice(8, 10)}/png/${image.image}.png`}
                  alt={`EPIC Image on ${image.date}`}
                  className="w-full h-auto"
                />
                <div className="mt-2 text-gray-700">
                  <p>Date: {image.date}</p>
                  <p>Center Latitude: {image.centroid_coordinates.lat.toFixed(2)}</p>
                  <p>Center Longitude: {image.centroid_coordinates.lon.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Exporting Epic component
export default Epic;
