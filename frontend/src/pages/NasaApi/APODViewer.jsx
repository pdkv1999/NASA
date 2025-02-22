import React, { useState, useEffect } from "react";
import axios from "axios";
import VITE_NASA_API_KEY from "../../config/apiConfig";

const APODViewer = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [apodData, setApodData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    fetchAPODForDate();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const fetchAPODForDate = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${VITE_NASA_API_KEY}`
      );
      setApodData([response.data]);
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Error fetching APOD data. Please try again later.");
      console.error(error);
      setLoading(false);
    }
  };

  const fetchAPODsBetweenDates = async () => {
    try {
      setLoading(true);
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${VITE_NASA_API_KEY}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      );
      setApodData(response.data);
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Error fetching APOD data. Please try again later.");
      console.error(error);
      setLoading(false);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearch = () => {
    fetchAPODsBetweenDates();
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className="container mx-auto px-4 py-8 bg-cover bg-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <h1 className="text-center text-3xl font-semibold mb-4">APOD Viewer</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Welcome to our APOD Viewer! Explore captivating snapshots of the cosmos
        captured by NASA's Astronomy Picture of the Day (APOD) service. Each
        day, we present a stunning visual journey through the universe,
        featuring celestial wonders ranging from distant galaxies to mesmerizing
        phenomena.
      </p>
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center">
        <p className="text-lg font-bold mr-4 mb-2 md:mb-0">
          Search for APOD images by start date and end date:
        </p>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="p-2 mr-2 border rounded mb-2 lg:mr-4 lg:mb-0"
        />
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="p-2 mr-2 border rounded mb-2 lg:mr-4 lg:mb-0"
        />
        <button
          onClick={handleSearch}
          className="text-white bg-[#9933FF] hover:bg-[#BF40BF] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-[#9933FF] animate-ping"></div>
        </div>
      ) : (
        <div>
          {apodData.map((apod) => (
            <div key={apod.date} className="mb-8">
              <div className={isMobile ? "mb-4" : "flex flex-row mb-4"}>
                {apod.media_type === "image" ? (
                  <img
                    src={apod.url}
                    alt={apod.title}
                    className="max-w-full md:max-w-md mb-4 md:mr-4"
                  />
                ) : (
                  <iframe
                    title={apod.title}
                    src={apod.url}
                    frameBorder="0"
                    allowFullScreen
                    className="max-w-full md:max-w-md mb-4 md:mr-4"
                  ></iframe>
                )}
                {!isMobile && (
                  <div>
                    <p className="text-lg font-semibold mb-2">{apod.title}</p>
                    <p className="mb-2">{apod.date}</p>
                    <p>{apod.explanation}</p>
                  </div>
                )}
              </div>
              {isMobile && (
                <div>
                  <p className="text-lg font-semibold mb-2">{apod.title}</p>
                  <p className="mb-2">{apod.date}</p>
                  <p>{apod.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default APODViewer;
