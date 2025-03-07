// Importing necessary modules and hooks
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import VITE_NASA_API_KEY from "../../config/apiConfig";  // Importing NASA API key

// Camera options for the dropdown
const options = {
  fhaz: "Front Hazard Avoidance Camera",
  rhaz: "Rear Hazard Avoidance Camera",
  mast: "Mast Camera",
  chemcam: "Chemistry and Camera Complex",
  mahli: "Mars Hand Lens Imager",
  mardi: "Mars Descent Imager",
  navcam: "Navigation Camera",
  pancam: "Panoramic Camera",
  minites: "Miniature Thermal Emission Spectrometer (Mini-TES)",
};

// Constants for pagination
const ITEMS_PER_PAGE = 6;

// Gallery component definition
const Gallery = () => {
  // State variables for managing component data
  const [photos, setPhotos] = useState([]);                     // State for storing photos
  const [selectedCamera, setSelectedCamera] = useState("");      // State for selected camera
  const [page, setPage] = useState(1);                          // State for current page
  const [totalPages, setTotalPages] = useState(1);               // State for total pages
  const [loading, setLoading] = useState(false);                 // State for loading indicator
  const dropdownRef = useRef(null);                             // Ref for dropdown
  const [isOpen, setIsOpen] = useState(false);                   // State for dropdown visibility

  // Fetch photos when selectedCamera changes
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!selectedCamera) return;                              // Return if no camera selected
      setLoading(true);
      try {
        // Fetching data from NASA API
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${selectedCamera}&api_key=${VITE_NASA_API_KEY}`
        );
        const fetchedPhotos = response.data.photos;
        setPhotos(fetchedPhotos);

        // Calculate total pages based on data length
        const pages = fetchedPhotos.length > 0 ? Math.ceil(fetchedPhotos.length / ITEMS_PER_PAGE) : 1;
        setTotalPages(pages);
        setPage(1);                                             // Reset to first page on camera change
      } catch (error) {
        console.error("Error fetching photos:", error);          // Log any errors
      } finally {
        setLoading(false);                                      // Hide loading spinner
      }
    };

    fetchPhotos();                                               // Call fetch function
  }, [selectedCamera]);                                          // Dependency on selectedCamera

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle camera selection from dropdown
  const handleOptionClick = (camera) => {
    setSelectedCamera(camera);
    setIsOpen(false);                                            // Close dropdown
  };

  // Clear camera selection and reset states
  const clearSelection = () => {
    setSelectedCamera("");
    setPhotos([]);
    setPage(1);
    setTotalPages(1);
  };

  // Pagination functions
  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // Slice photos for current page
  const currentImages = photos.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Returning JSX for the Gallery component
// Returning JSX for the Gallery component
return (
  <div className="container mx-auto px-4 py-8">
    {/* Header and Dropdown - Always Visible */}
    <h1 className="text-center text-2xl lg:text-4xl font-semibold">Mars Rover Photos</h1>
    <br />
    <div className="mb-4 flex flex-col md:flex-row justify-center items-center">
      <div className="relative w-full md:w-64 mb-2 md:mb-0 md:mr-2" ref={dropdownRef}>
        <input
          type="text"
          value={options[selectedCamera] || ""}
          readOnly
          placeholder="Select camera"
          className="border border-gray-300 rounded-md py-2 px-4 w-full cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
            <ul className="py-1">
              {Object.entries(options).map(([key, value]) => (
                <li
                  key={key}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleOptionClick(key)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={clearSelection}
        className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-md"
      >
        Clear
      </button>
    </div>

    {/* Show message if no camera is selected */}
    {!selectedCamera && (
      <div className="text-center text-xl font-semibold text-red-500 mt-4">
        Please select a camera to view images.
      </div>
    )}

    {/* Loading Spinner - Positioned Below the Content */}
    {loading && (
      <div className="flex justify-center items-center my-4">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-75"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-225"></div>
        </div>
      </div>
    )}

    {/* Photos Grid - Hidden if Loading */}
    {!loading && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentImages.length > 0 ? (
          currentImages.map((photo) => (
            <div key={photo.id} className="rounded-lg overflow-hidden shadow-lg bg-white">
              <img className="w-full h-64 object-cover" src={photo.img_src} alt={photo.id} />
              <div className="p-4">
                <p className="text-lg font-semibold">Rover: {photo.camera.full_name}</p>
                <p className="text-sm text-gray-700">Date: {photo.earth_date}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No images available for this camera.</p>
        )}
      </div>
    )}

    {/* Pagination Controls */}
    {photos.length > 0 && (
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`py-2 px-4 mr-2 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Previous
        </button>
        <p className="text-xl font-bold">
          Page {page} of {totalPages}
        </p>
        <button
          onClick={nextPage}
          disabled={page >= totalPages}
          className={`py-2 px-4 ml-2 rounded ${page >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Next
        </button>
      </div>
    )}
  </div>
);
};

// Exporting Gallery component
export default Gallery;
