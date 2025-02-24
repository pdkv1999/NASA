import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-lg font-semibold mb-2">
              © 2025 by Dileep. All rights reserved.
            </p>
            <p className="text-sm">Exploring the Universe, One Discovery at a Time.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <div>
              <a
                href="mailto:pdkv1999@gmail.com"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <p className="font-medium">Email: pdkv1999@gmail.com</p>
              </a>
            </div>
            <div>
              <a
                href="tel:+353892234898"
                className="text-white hover:text-gray-200 transition-colors"
              >
                <p className="font-medium">Phone: +353 892234898</p>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>Crafted with ❤️ by Dileep Kumar Varma, Penmetsa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
