// Importing React to create functional components
import React from "react";

// Defining a functional component named Footer
const Footer = () => {
  // Returning the JSX for the footer
  return (
    // Footer element with a gradient background and padding
    <footer className="bg-gradient-to-r from-[#FF7E5F] to-[#0000FF] text-white py-8">
      {/* Container to center content and add responsive padding */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for layout adjustments in different screen sizes */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Section for copyright text and tagline */}
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-lg font-semibold mb-2">
              © 2025 by Dileep. All rights reserved.
            </p>
            <p className="text-sm">Exploring the Universe, One Discovery at a Time.</p>
          </div>

          {/* Section for contact information with responsive adjustments */}
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <div>
              {/* Email link with hover effect */}
              <a
                href="mailto:pdkv1999@gmail.com"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <p className="font-medium">Email: pdkv1999@gmail.com</p>
              </a>
            </div>
            <div>
              {/* Phone link with hover effect */}
              <a
                href="tel:+353892234898"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <p className="font-medium">Phone: +353 892234898</p>
              </a>
            </div>
          </div>
        </div>
        {/* Footer credits section with a margin-top and centered text */}
        <div className="mt-6 text-center text-sm">
          <p>Crafted with ❤️ by Dileep Kumar Varma, Penmetsa</p>
        </div>
      </div>
    </footer>
  );
};

// Exporting Footer component for use in other parts of the application
export default Footer;
