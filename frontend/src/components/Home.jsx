import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import spaceImage from '/nasa1.jpg'; 
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#00FFCC", "#2E6AC6", "#B888D1", "#DD4455"];

const Home = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 12,
      repeat: Infinity,
      repeatType: "reverse",
    });
  }, []);

  const backgroundImage = useMotionTemplate`url(${spaceImage})`;
  //const backgroundImage = useMotionTemplate`radial-gradient(140% 140% at 50% 0%, #111B28 60%, ${color})`;
  const border = useMotionTemplate`2px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 6px 30px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6 py-20 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
      <h1 className="max-w-3xl text-center text-4xl font-bold leading-tight text-white">
      Discover the Infinite Wonders of the Universe
        </h1>
        <p className="my-8 max-w-2xl text-center text-lg leading-relaxed md:text-xl md:leading-relaxed">
          Join us on an extraordinary cosmic journey! Explore stunning space imagery, dive deep into astronomical phenomena, and uncover the mysteries of the universe with our NASA-powered space exploration app. 🚀🌌
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#1e1e1e",
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-gray-700/80 to-gray-800/50 px-6 py-3 text-white transition-all"
        >
          Start Your Journey
          <FiArrowRight className="transition-transform group-hover:rotate-45 group-active:rotate-12" />
        </motion.button>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={60} count={3000} factor={3} fade speed={1.5} />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default Home;
