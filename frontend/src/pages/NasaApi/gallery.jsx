import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import VITE_NASA_API_KEY from "../../config/apiConfig";

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

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [searchCamera, setSearchCamera] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${VITE_NASA_API_KEY}`
        );
        setPhotos(response.data.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${searchCamera}&api_key=${VITE_NASA_API_KEY}`
      );
      setSearchResults(response.data.photos);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropDown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchCamera(option);
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedOption(null);
    setSearchCamera("");
    setSearchResults([]);
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(1, prev - 1));

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-purple-500 animate-ping"></div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl lg:text-4xl font-semibold">Mars Rover Photos</h1>
          <p className="lg:text-lg mb-8 text-center">
            Discover images captured by NASA's Mars rovers on the Martian surface.
          </p>
          <div className="mb-4 flex flex-col md:flex-row justify-center items-center">
            <div className="relative w-full md:w-64 mb-2 md:mb-0 md:mr-2" ref={dropdownRef}>
              <input
                type="text"
                value={options[selectedOption] || ""}
                readOnly
                placeholder="Select camera"
                className="border border-gray-300 rounded-md py-2 px-4 w-full cursor-pointer"
                onClick={toggleDropDown}
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
              onClick={handleSearch}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md md:mr-2"
            >
              Search
            </button>
            <button
              onClick={clearSelection}
              className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-md"
            >
              Clear
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(searchResults.length > 0 ? searchResults : photos).map((photo) => (
              <div key={photo.id} className="rounded-lg overflow-hidden shadow-lg bg-white">
                <img className="w-full h-64 object-cover" src={photo.img_src} alt={photo.id} />
                <div className="p-4">
                  <p className="text-lg font-semibold">Rover: {photo.camera.full_name}</p>
                  <p className="text-sm text-gray-700">Date: {photo.earth_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button onClick={prevPage} disabled={page === 1} className="bg-gray-300 py-2 px-4 mr-2 rounded">Previous</button>
        <p className="text-xl font-bold">Page {page}</p>
        <button onClick={nextPage} disabled={page === 4} className="bg-gray-300 py-2 px-4 ml-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default Gallery;
