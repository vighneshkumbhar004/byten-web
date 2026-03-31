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

    console.log('🚁 Starting to load drone frames...');

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, '0');
      img.src = `/drone-frames/${framePrefix}${frameNumber}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        console.log(`✓ Loaded frame ${loadedCount}/${totalFrames}`);
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
          console.log(`✅ All ${totalFrames} drone frames loaded!`);
        }
      };
      
      img.onerror = () => {
        console.error(`❌ Failed to load frame: ${frameNumber}`);
        console.error(`URL: ${img.src}`);
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // Handle scroll to change frames
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      
      const frameIndex = Math.floor(scrollProgress * (totalFrames - 1));
      setCurrentFrame(frameIndex);
    };

    handleScroll();
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        className="fixed top-0 left-0 w-full h-full"
        style={{
          zIndex: 0,
          objectFit: 'cover',
          filter: 'brightness(0.35)' // Darker for better contrast
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Frame counter */}
      {imagesLoaded && (
        <div 
          className="fixed bottom-20 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-mono"
          style={{ zIndex: 100 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FFCC00] rounded-full animate-pulse"></div>
            <span>Frame: {currentFrame + 1}/{totalFrames}</span>
          </div>
        </div>
      )}
      
      {/* Loading state */}
      {!imagesLoaded && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-[#0A111A]"
          style={{ zIndex: 9999 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#FFCC00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollFrameAnimation;