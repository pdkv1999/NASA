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
    window.addEventListener("resize", handleResize);
    fetchAPODForDate();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const fetchAPODForDate = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${VITE_NASA_API_KEY}`);
      setApodData([response.data]);
      setError("");
    } catch (error) {
      setError("Error fetching APOD data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAPODsBetweenDates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${VITE_NASA_API_KEY}&start_date=${startDate}&end_date=${endDate}`
      );
      setApodData(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching APOD data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchAPODsBetweenDates();
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-cover bg-center" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <h1 className="text-center text-3xl font-semibold mb-4 text-white">Astronomy Picture of the Day</h1>
      <p className="text-lg text-white mb-8 text-center">
        Explore the Astronomy Picture of the Day! Discover stunning images from NASA, offering daily glimpses of the universe.
      </p>
      <div className="mb-6 flex flex-col md:flex-row items-center justify-center">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 mr-2 border rounded mb-2 lg:mr-4 lg:mb-0"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 mr-2 border rounded mb-2 lg:mr-4 lg:mb-0"
        />
        <button onClick={handleSearch} className="text-white bg-[#9933FF] hover:bg-[#BF40BF] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5">
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-[#9933FF] animate-ping"></div>
        </div>
      ) : (
        apodData.map((apod) => (
          <div key={apod.date} className="mb-8">
            <div className={isMobile ? "mb-4" : "flex flex-row mb-4"}>
              {apod.media_type === "image" ? (
                <img src={apod.url} alt={apod.title} className="max-w-full md:max-w-md mb-4 md:mr-4" />
              ) : (
                <iframe title={apod.title} src={apod.url} frameBorder="0" allowFullScreen className="max-w-full md:max-w-md mb-4 md:mr-4"></iframe>
              )}
              <div className="text-white">
                <p className="text-lg font-semibold mb-2">{apod.title}</p>
                <p className="mb-2">{apod.date}</p>
                <p>{apod.explanation}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default APODViewer;
