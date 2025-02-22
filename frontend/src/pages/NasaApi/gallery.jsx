import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import VITE_NASA_API_KEY from "../../config/apiConfig";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [searchCamera, setSearchCamera] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [page, setPage] = useState(1); // Use page instead of currentPage
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
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${VITE_NASA_API_KEY}`
        );
        setPhotos(response.data.photos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${searchCamera}&api_key=${VITE_NASA_API_KEY}`
      );
      setSearchResults(response.data.photos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

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

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div
      className="container mx-auto px-4 py-8 bg-cover bg-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-[#9933FF] animate-ping"></div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl lg:text-4xl font-semibold whitespace-nowrap">
            Mars Rover Photos Gallery
          </h1>
          <br />
          <p className="lg:text-lg md:text-base text-gray-700 mb-8 text-center">
            Explore stunning photos captured by NASA's Mars rovers as they
            journey across the Martian landscape. From breathtaking vistas to
            close-up shots of geological formations, witness the beauty and
            wonder of the Red Planet through the lenses of Curiosity and other
            rovers.
          </p>
          <div className="mb-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
              <div className="relative w-full mb-2 md:w-auto md:mr-2">
                <input
                  type="text"
                  value={options[selectedOption] || searchCamera}
                  readOnly={true}
                  placeholder="Select camera"
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-full md:w-64"
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
              <div className="flex flex-col md:flex-row items-center">
                <button
                  onClick={handleSearch}
                  className="bg-[#9933FF] hover:bg-[#BF40BF] text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2 focus:outline-none focus:bg-blue-600"
                >
                  Search
                </button>
                <button
                  onClick={clearSelection}
                  className="bg-gray-200 hover:bg-gray-400 font-bold py-2 px-4 rounded-md focus:outline-none"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="mx-12 md:mx-2">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-14">
              {(searchResults.length > 0 ? searchResults : photos).map(
                (photo) => (
                  <div
                    key={photo.id}
                    className="rounded-lg overflow-hidden shadow-lg bg-white"
                  >
                    <img
                      className="w-full h-64 object-cover"
                      src={photo.img_src}
                      alt={photo.id}
                    />
                    <div className="p-4">
                      <p className="text-lg font-semibold mb-2">
                        Rover: {photo.camera.full_name}
                      </p>
                      <p className="text-sm text-gray-700">
                        Date: {photo.earth_date}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 mr-2 rounded"
        >
          Previous
        </button>
        <div>
          <p className="text-xl font-bold">--Page {page}-- </p>
        </div>
        <p></p>
        <button
          onClick={nextPage}
          disabled={page === 4} // Assuming you want to limit to 4 pages
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
