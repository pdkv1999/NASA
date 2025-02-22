import React, { useState, useEffect } from "react";

const EPIC_API_URL = "https://epic.gsfc.nasa.gov/api/natural";

function Epic() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(EPIC_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen p-8" style={{ backgroundImage: 'url("/background.jpg")' }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-[#9933FF] animate-ping"></div>
        </div>
      ) : (
        <>
          <h1 className="text-center text-3xl font-semibold whitespace-nowrap">
            NASA EPIC Images
          </h1>
          <p className="lg:text-lg md:text-base text-gray-700 mb-8 text-center mt-4">
            Explore stunning natural images of Earth captured by NASA's EPIC
            (Earth Polychromatic Imaging Camera) instrument. Dive into a
            mesmerizing collection of photographs showcasing Earth's beauty from
            space. Each image is accompanied by its date of capture, center
            latitude, and longitude coordinates, offering a unique perspective
            of our planet. Embark on a visual journey through the lens of EPIC
            and witness the awe-inspiring landscapes and phenomena that adorn
            our home planet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.identifier}
                className="bg-white p-4 rounded-lg shadow-md transform hover:rotate-6 transition duration-300"
              >
                <img
                  src={`https://epic.gsfc.nasa.gov/archive/natural/${image.date.slice(
                    0,
                    4
                  )}/${image.date.slice(5, 7)}/${image.date.slice(8, 10)}/png/${
                    image.image
                  }.png`}
                  alt={`EPIC Image on ${image.date}`}
                  className="w-full h-auto"
                />
                <div className="mt-2 text-gray-700">
                  <p>Date: {image.date}</p>
                  <p>
                    Center Latitude: {image.centroid_coordinates.lat.toFixed(2)}
                  </p>
                  <p>
                    Center Longitude:{" "}
                    {image.centroid_coordinates.lon.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Epic;
