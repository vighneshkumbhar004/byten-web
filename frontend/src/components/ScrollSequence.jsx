import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const ScrollSequence = ({ frameCount = 300, progress }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const loadedImages = [];
    
    // We expect images to be sequential like drone view background for website_000.jpg
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(3, '0');
      img.src = `${process.env.PUBLIC_URL || ''}/sequence/drone_view/drone view  background for website_${numStr}.jpg`;
      
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        checkDone();
      };
      img.onerror = () => {
        console.error("Failed to load image:", img.src);
        loaded++;
        setLoadedCount(loaded);
        checkDone();
      };

      const checkDone = () => {
        if (loaded === frameCount) {
          setLoading(false);
          // Initial draw is now handled by a separate useEffect watching `loading`
        }
      };
      
      // Important to push in order before they load
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, [frameCount]);

  // Use window scroll progress instead of container
  const windowScroll = useScroll();
  const activeProgress = progress || windowScroll.scrollYProgress;

  const frameIndex = useTransform(activeProgress, [0, 1], [0, frameCount - 1]);

  const drawFrame = (index, imgs = images) => {
    if (!canvasRef.current || !imgs[index] || !imgs[index].complete) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    
    // Ensure canvas dimensions match display size
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    } else {
      // Just clear if size hasn't changed (though we are drawing over everything anyway)
      // We don't necessarily need to scale again if size matched
    }
    
    // For redrawing correctly when already scaled, we should reset transform before clearing
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    const img = imgs[index];
    
    // Object-fit "cover" logic to calculate drawing dimensions
    const canvasWh = canvas.width / dpr;
    const canvasHt = canvas.height / dpr;
    const imgWh = img.naturalWidth || img.width;
    const imgHt = img.naturalHeight || img.height;
    
    if (!imgWh || !imgHt) return; // Prevent NaN errors

    const ratio = Math.max(canvasWh / imgWh, canvasHt / imgHt);
    const renderWidth = imgWh * ratio;
    const renderHeight = imgHt * ratio;
    
    // Center the image
    const x = (canvasWh - renderWidth) / 2;
    const y = (canvasHt - renderHeight) / 2;

    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  // Initial draw once loading completes and canvas is in DOM
  useEffect(() => {
    if (!loading && canvasRef.current) {
      requestAnimationFrame(() => {
        drawFrame(Math.round(frameIndex.get()));
      });
    }
  }, [loading]);

  // Subscribe to frame changes to recalculate the canvas
  useEffect(() => {
    if (loading) return;
    const unsubscribe = frameIndex.on("change", (latest) => {
      const index = Math.round(latest);
      // To improve performance, we use requestAnimationFrame
      requestAnimationFrame(() => drawFrame(index));
    });
    return () => unsubscribe();
  }, [loading, frameIndex, images]);
  
  // Handle resize to redraw the canvas
  useEffect(() => {
    if (loading) return;
    const handleResize = () => {
      drawFrame(Math.round(frameIndex.get()));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loading, images, frameIndex]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#E6E6E6] flex items-center justify-center z-0 overflow-hidden pointer-events-none">
      {loading ? (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium tracking-wider uppercase">Loading Sequence {Math.round((loadedCount / frameCount) * 100)}%</p>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ScrollSequence;
