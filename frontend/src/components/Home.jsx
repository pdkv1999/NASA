// Importing necessary modules from react-three, framer-motion, and React
import { Stars } from "@react-three/drei";               // For starry background
import { Canvas } from "@react-three/fiber";              // For 3D rendering
import React, { useEffect } from "react";                 // For component lifecycle
import { FiArrowRight } from "react-icons/fi";            // Icon for button
import spaceImage from '/nasa1.jpg';                      // Background image
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion"; // For animations
import { Link } from "react-router-dom";                  // For navigation between routes

// Defining an array of colors for animations
const COLORS_TOP = ["#00FFCC", "#2E6AC6", "#B888D1", "#DD4455"];

// Defining the Home functional component
const Home = () => {
  // Using useMotionValue hook for animated color transitions
  const color = useMotionValue(COLORS_TOP[0]);

  // Using useEffect to animate the color in an infinite loop
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",        // Smooth easing for transitions
      duration: 12,             // Duration of the animation cycle
      repeat: Infinity,         // Infinite loop for colors
      repeatType: "reverse",    // Reverse animation direction after each cycle
    });
  }, []);

  // Creating dynamic CSS styles using motion templates
  const backgroundImage = useMotionTemplate`url(${spaceImage})`;
  const border = useMotionTemplate`2px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 6px 30px ${color}`;

  // Returning JSX for the Home component
  return (
    <motion.section
      style={{
        backgroundImage,        // Setting animated background image
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6 py-20 text-gray-200"
    >
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <h1 className="max-w-3xl text-center text-4xl font-bold leading-tight text-white">
          Discover the Infinite Wonders of the Universe
        </h1>
        
        {/* Description paragraph */}
        <p className="my-8 max-w-2xl text-center text-lg leading-relaxed md:text-xl md:leading-relaxed">
          Join us on an extraordinary cosmic journey! Explore stunning space imagery, dive deep into astronomical phenomena, and uncover the mysteries of the universe with our NASA-powered space exploration app. 🚀🌌
        </p>

        {/* Button wrapped with Link for navigation */}
        <Link to="/gallery">
          <motion.button
            style={{
              border,             // Animated border color
              boxShadow,          // Animated shadow color
            }}
            whileHover={{
              scale: 1.05,        // Enlarge on hover
              backgroundColor: "#1e1e1e",
            }}
            whileTap={{
              scale: 0.97,        // Shrink on tap
            }}
            className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-700/80 to-gray-800/50 px-6 py-3 text-white transition-all"
          >
            Start Your Journey
            <FiArrowRight className="transition-transform group-hover:rotate-45 group-active:rotate-12" />
          </motion.button>
        </Link>
      </div>

      {/* 3D starry background using react-three-fiber */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={60} count={3000} factor={3} fade speed={1.5} />
        </Canvas>
      </div>
    </motion.section>
  );
};

// Exporting Home component for use in other parts of the application
export default Home;
