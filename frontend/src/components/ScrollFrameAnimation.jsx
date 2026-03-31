import React, { useEffect, useState, useRef } from 'react';

const ScrollFrameAnimation = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  
  const totalFrames = 80;
  const framePrefix = 'Drone_moving_across_202604010153_';

  // Preload all images
  useEffect(() => {
    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, '0');
      img.src = `/drone-frames/${framePrefix}${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
          console.log(`✅ All ${totalFrames} drone frames loaded!`);
        }
      };
      
      img.onerror = () => {
        console.error(`❌ Failed to load frame: ${frameNumber}`);
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // Handle scroll to change frames
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      
      // Map scroll progress to frame number (0 to totalFrames-1)
      const frameIndex = Math.floor(scrollProgress * (totalFrames - 1));
      setCurrentFrame(frameIndex);
    };

    handleScroll(); // Set initial frame
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw current frame on canvas
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[currentFrame];

    if (img && img.complete) {
      // Set canvas size to window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image to cover entire canvas
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, [currentFrame, imagesLoaded]);

  // Handle window resize
  useEffect(() => {
    if (!imagesLoaded) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Force redraw
        const frameIndex = currentFrame;
        setCurrentFrame(-1);
        setTimeout(() => setCurrentFrame(frameIndex), 10);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, currentFrame]);

  return (
    <>
      {/* Fixed background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{
          objectFit: 'cover',
          filter: 'brightness(0.4) blur(2px)' // Much darker + slight blur for depth
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 -z-10 pointer-events-none" />
      
      {/* Loading indicator */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A111A]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#FFCC00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Loading Drone Animation...</p>
            <p className="text-gray-400 text-sm mt-2">Preparing {totalFrames} frames</p>
          </div>
        </div>
      )}

      {/* Frame counter (optional - can remove) */}
      {imagesLoaded && (
        <div className="fixed bottom-20 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-mono z-40">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FFCC00] rounded-full animate-pulse"></div>
            <span>Frame: {currentFrame + 1}/{totalFrames}</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            Scroll: {Math.round((currentFrame / (totalFrames - 1)) * 100)}%
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollFrameAnimation;