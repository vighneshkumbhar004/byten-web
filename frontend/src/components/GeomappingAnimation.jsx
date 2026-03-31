import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo } from '../mock/mockData';

const GeomappingAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState('scanning'); // scanning, processing, complete

  useEffect(() => {
    // Phase transitions
    const scanTimer = setTimeout(() => setPhase('processing'), 1500);
    const processTimer = setTimeout(() => setPhase('complete'), 3000);
    
    // Complete animation
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 800);
    }, 4000);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(processTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Generate random data points
  const dataPoints = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 1.5
  }));

  // Generate grid lines
  const gridLines = Array.from({ length: 20 }, (_, i) => i);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A111A] overflow-hidden"
        >
          {/* Starfield Background */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* 3D Terrain/Map Container */}
          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            
            {/* Rotating 3D Grid/Terrain */}
            <motion.div
              initial={{ rotateX: 60, rotateY: 0, scale: 0.5, opacity: 0 }}
              animate={{ 
                rotateX: 45, 
                rotateY: phase === 'complete' ? 360 : 25,
                scale: 1,
                opacity: 1
              }}
              transition={{ 
                duration: 2, 
                ease: "easeOut",
                rotateY: { duration: phase === 'complete' ? 2 : 0.8 }
              }}
              className="relative preserve-3d"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px)'
              }}
            >
              {/* 3D Grid Base */}
              <svg 
                width="600" 
                height="600" 
                viewBox="0 0 600 600"
                className="relative"
                style={{ filter: 'drop-shadow(0 0 30px rgba(255, 204, 0, 0.3))' }}
              >
                {/* Horizontal Grid Lines */}
                {gridLines.map((_, i) => (
                  <motion.line
                    key={`h-${i}`}
                    x1="50"
                    y1={50 + i * 25}
                    x2="550"
                    y2={50 + i * 25}
                    stroke="#FFCC00"
                    strokeWidth="0.5"
                    opacity="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5, delay: i * 0.05 }}
                  />
                ))}
                
                {/* Vertical Grid Lines */}
                {gridLines.map((_, i) => (
                  <motion.line
                    key={`v-${i}`}
                    x1={50 + i * 25}
                    y1="50"
                    x2={50 + i * 25}
                    y2="550"
                    stroke="#FFCC00"
                    strokeWidth="0.5"
                    opacity="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5, delay: i * 0.05 }}
                  />
                ))}

                {/* Topographic Contour Lines */}
                <motion.ellipse
                  cx="300"
                  cy="300"
                  rx="180"
                  ry="120"
                  fill="none"
                  stroke="#FFCC00"
                  strokeWidth="2"
                  opacity="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <motion.ellipse
                  cx="300"
                  cy="300"
                  rx="140"
                  ry="90"
                  fill="none"
                  stroke="#FFD633"
                  strokeWidth="2"
                  opacity="0.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, delay: 0.7 }}
                />
                <motion.ellipse
                  cx="300"
                  cy="300"
                  rx="100"
                  ry="60"
                  fill="none"
                  stroke="#FFCC00"
                  strokeWidth="2"
                  opacity="0.7"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2, delay: 0.9 }}
                />

                {/* Scanning Beam */}
                {phase === 'scanning' && (
                  <motion.line
                    x1="300"
                    y1="50"
                    x2="300"
                    y2="550"
                    stroke="#FFCC00"
                    strokeWidth="2"
                    opacity="0.8"
                    filter="url(#glow)"
                    animate={{ x1: [100, 500], x2: [100, 500] }}
                    transition={{ duration: 1.5, repeat: 2, ease: "linear" }}
                  />
                )}

                {/* Data Points */}
                {dataPoints.map((point) => (
                  <motion.circle
                    key={point.id}
                    cx={50 + point.x * 5}
                    cy={50 + point.y * 5}
                    r="3"
                    fill="#FFCC00"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.5, 1], 
                      opacity: [0, 1, 0.8] 
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1 + point.delay 
                    }}
                  />
                ))}

                {/* Elevation Points with Lines */}
                {phase !== 'scanning' && dataPoints.slice(0, 10).map((point, i) => (
                  <motion.g key={`elevation-${i}`}>
                    <motion.line
                      x1={50 + point.x * 5}
                      y1={50 + point.y * 5}
                      x2={50 + point.x * 5}
                      y2={50 + point.y * 5 - 30}
                      stroke="#FFCC00"
                      strokeWidth="1"
                      opacity="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
                    />
                    <motion.circle
                      cx={50 + point.x * 5}
                      cy={50 + point.y * 5 - 30}
                      r="2"
                      fill="#FFD633"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 2 + i * 0.1 }}
                    />
                  </motion.g>
                ))}

                {/* SVG Filters */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </motion.div>

            {/* Scanning HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner Brackets */}
              <motion.div 
                className="absolute top-20 left-20 w-16 h-16 border-t-2 border-l-2 border-[#FFCC00]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.div 
                className="absolute top-20 right-20 w-16 h-16 border-t-2 border-r-2 border-[#FFCC00]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              <motion.div 
                className="absolute bottom-20 left-20 w-16 h-16 border-b-2 border-l-2 border-[#FFCC00]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.div 
                className="absolute bottom-20 right-20 w-16 h-16 border-b-2 border-r-2 border-[#FFCC00]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </div>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mb-6 z-10"
            >
              <motion.img
                src={companyInfo.logo}
                alt={companyInfo.name}
                className="w-24 h-24 object-contain"
                animate={{
                  filter: [
                    'drop-shadow(0 0 15px rgba(255, 204, 0, 0.4))',
                    'drop-shadow(0 0 25px rgba(255, 204, 0, 0.7))',
                    'drop-shadow(0 0 15px rgba(255, 204, 0, 0.4))',
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
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-2 z-10"
            >
              Byten Geomapping
            </motion.h1>

            {/* Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="text-[#FFCC00] font-mono text-sm z-10"
            >
              {phase === 'scanning' && '[ SCANNING TERRAIN... ]'}
              {phase === 'processing' && '[ PROCESSING DATA POINTS... ]'}
              {phase === 'complete' && '[ INTELLIGENCE READY ]'}
            </motion.div>

            {/* Data Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.3 }}
              className="mt-6 flex gap-8 text-xs font-mono z-10"
            >
              <div className="text-center">
                <motion.div 
                  className="text-[#FFCC00] text-lg font-bold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {phase === 'scanning' ? '34%' : phase === 'processing' ? '78%' : '100%'}
                </motion.div>
                <div className="text-gray-400">SCAN</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-[#FFCC00] text-lg font-bold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                >
                  {dataPoints.length}
                </motion.div>
                <div className="text-gray-400">POINTS</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-[#FFCC00] text-lg font-bold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                >
                  0.3cm
                </motion.div>
                <div className="text-gray-400">PRECISION</div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden z-10"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ 
                  width: phase === 'scanning' ? '40%' : phase === 'processing' ? '80%' : '100%'
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#FFCC00] via-[#FFD633] to-[#FFCC00] rounded-full"
                style={{
                  boxShadow: '0 0 10px rgba(255, 204, 0, 0.8)'
                }}
              />
            </motion.div>
          </div>

          {/* Coordinate Grid Overlay */}
          <div className="absolute bottom-8 left-8 font-mono text-xs text-[#FFCC00] opacity-60 z-10">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LAT: 18.5204° N<br/>
              LONG: 73.8567° E<br/>
              ALT: 560m
            </motion.div>
          </div>

          <style jsx>{`
            .perspective-1000 {
              perspective: 1000px;
            }
            .preserve-3d {
              transform-style: preserve-3d;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GeomappingAnimation;