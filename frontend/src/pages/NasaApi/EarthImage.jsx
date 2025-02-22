import React, { useState } from "react";
import VITE_NASA_API_KEY from "../../config/apiConfig";

const EarthImage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    // Validate latitude, longitude, and date inputs
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (
      isNaN(lat) ||
      isNaN(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      setErrorMessage(
        "Please enter valid latitude (-90 to 90) and longitude (-180 to 180)."
      );
      setLoading(false); // Set loading state to false
      return;
    }

    if (!date) {
      setErrorMessage("Please select a date.");
      setLoading(false); // Set loading state to false
      return;
    }

    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&dim=0.1&date=${date}&api_key=${VITE_NASA_API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 400) {
          setErrorMessage(
            "No images available for the provided coordinates and date."
          );
        } else {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setImageUrl(data.url);
          setErrorMessage("");
        } else {
          // Handle the case where the response is not JSON but an image
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          setErrorMessage("");
        }
      }
    } catch (error) {
      console.error("Error fetching Earth image:", error);
      setErrorMessage("Error fetching Earth image. Please try again later.");
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  return (
    <div
      className="flex flex-col items-center py-10 min-h-screen"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: "cover",
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-[#9933FF] animate-ping"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-center text-3xl font-semibold whitespace-nowrap">
            Earth Wonders
          </h1>
          <br />
          <p className="lg:text-lg md:text-base px-4 text-gray-700 mb-8 text-center">
            Discover captivating satellite images of Earth by entering
            coordinates and selecting a date. This page provides a gateway to
            breathtaking views from space. Input latitude, longitude, and date
            to unlock a glimpse of Earth's beauty captured by NASA's satellites.
            Experience the wonder of our planet from above, and embark on a
            visual journey like never before. Start exploring now!
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap justify-center"
          >
            <input
              type="text"
              placeholder="Enter latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md mr-2 mb-2 lg:mr-4 lg:mb-0"
            />
            <input
              type="text"
              placeholder="Enter longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md mr-2 mb-2 lg:mr-4 lg:mb-0"
            />
            <input
              type="date"
              placeholder="Enter date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md mr-2 mb-2 lg:mr-4 lg:mb-0"
            />
            <button
              type="submit"
              className="bg-[#9933FF] hover:bg-[#BF40BF] text-white px-4 py-2 rounded-md mb-2 lg:mb-0"
            >
              Show Image
            </button>
          </form>
        </div>
      )}

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Earth"
          className="mt-5 rounded-md"
          style={{ maxWidth: "100%", maxHeight: "400px" }}
        />
      )}
    </div>
  );
};

export default EarthImage;
