import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VITE_NASA_API_KEY from "../../config/apiConfig";

const APODViewer = () => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(today);
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    fetchAPOD(selectedDate); // Fetch APOD for today's date by default
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const fetchAPOD = useCallback(async (date) => {
    if (!date) return;
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${VITE_NASA_API_KEY}&date=${date}`
      );
      setApodData(response.data);
    } catch (error) {
      setError(error.response?.data?.msg || "No data found for this date.");
      setApodData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchAPOD(newDate);
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
          value={selectedDate}
          onChange={handleDateChange}
          max={today} // Prevents future dates
          className="p-2 mr-2 border rounded mb-2 lg:mr-4 lg:mb-0"
        />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin h-10 w-10 border-t-4 border-purple-500 border-solid rounded-full"></div>
        </div>
      ) : (
        apodData && (
          <div className="mb-8">
            <div className={isMobile ? "mb-4" : "flex flex-row mb-4"}>
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

export default APODViewer;
