import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo } from '../mock/mockData';
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TechSection from '../components/TechSection';
import Footer from '../components/Footer';

const LandingAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animation duration: 3 seconds total
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 800); // Wait for fade out
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0A111A] via-[#1A2130] to-[#0A111A]"
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 204, 0, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 204, 0, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite'
              }}
            />
          </div>

          {/* Animated Circles */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FFCC00] opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FFCC00] opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1] // Bounce ease
              }}
              className="mb-8"
            >
              <motion.img
                src={companyInfo.logo}
                alt={companyInfo.name}
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px rgba(255, 204, 0, 0.5))',
                    'drop-shadow(0 0 40px rgba(255, 204, 0, 0.8))',
                    'drop-shadow(0 0 20px rgba(255, 204, 0, 0.5))',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Company Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3 text-center"
            >
              Byten Geomapping
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-[#FFCC00] mb-8 text-center font-medium"
            >
              AI-Powered Geospatial Intelligence
            </motion.p>

            {/* Loading Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  delay: 1,
                  ease: "easeInOut" 
                }}
                className="h-full bg-gradient-to-r from-[#FFCC00] to-[#FFD633] rounded-full"
              />
            </motion.div>

            {/* Scanning Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 2, 
                delay: 1,
                repeat: 1,
                ease: "easeInOut" 
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                animate={{ 
                  scale: [1, 2.5],
                  opacity: [0.5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut" 
                }}
                className="w-48 h-48 border-2 border-[#FFCC00] rounded-full"
              />
            </motion.div>

            {/* Particles/Dots */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#FFCC00] rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 4) * 200],
                  y: [0, Math.sin(i * Math.PI / 4) * 200],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.2 + i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ 
              duration: 2, 
              delay: 1.5,
              ease: "easeInOut" 
            }}
            className="absolute bottom-12 text-center"
          >
            <p className="text-gray-400 text-sm">Loading Intelligence Platform...</p>
          </motion.div>

          <style jsx>{`
            @keyframes gridMove {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(50px, 50px);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
// Import your new wrapper component!
import VantaBackground from '../components/VantaBackground';

const LandingPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      
      {/* Hero Section stays out here so its video plays normally */}
      <HeroSection />

      {/* Everything wrapped inside VantaBackground will have the clouds behind it */}
      <VantaBackground>
        
        <FeaturesSection />
        <TechSection />
        {/* Add ProductGrid, ContactForm, etc. here */}
        
      </VantaBackground>
      
      <Footer />
    </div>
  );
};


export default LandingAnimation;