import React, { useState } from "react";
import VITE_NASA_API_KEY from "../../config/apiConfig";

const EarthImage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setErrorMessage("Invalid latitude (-90 to 90) or longitude (-180 to 180).");
      setLoading(false);
      return;
    }

    if (!date) {
      setErrorMessage("Please select a date.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.1&date=${date}&api_key=${VITE_NASA_API_KEY}`
      );

      if (!response.ok) {
        setErrorMessage(response.status === 400 ? "No images available." : "Failed to fetch data.");
      } else {
        const contentType = response.headers.get("content-type");
        const data = contentType?.includes("application/json") ? await response.json() : await response.blob();
        setImageUrl(data.url || URL.createObjectURL(data));
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching Earth image:", error);
      setErrorMessage("Error fetching Earth image. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center py-10 min-h-screen"
      style={{ backgroundImage: 'url("/background.jpg")', backgroundSize: "cover" }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-[#9933FF] animate-ping"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-center text-3xl font-semibold text-white">NeoWs</h1>
          <p className="text-center text-lg text-white mb-8 px-4">
            Discover breathtaking images of Earth taken by NASA's EPIC camera. Explore stunning photos of our planet from space.
            </p>
            <br/>
            <p>
            Use the sample data like latitude -6.36, longitude 176.40, and date 23/02/2025, then click "Show Image" to view the results.
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
            <button type="submit" className="bg-[#FEB47B] hover:bg-[#00B5B8] text-white px-4 py-2 rounded-md">
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
