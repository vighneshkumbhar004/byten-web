import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

const VantaBackground = ({ children }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          // skyColor: 0x68b8d7, // Customize your colors here!
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    // The outer shell that holds the Vanta canvas
    <div ref={vantaRef} className="relative w-full overflow-hidden">
      
      {/* The inner container that holds your actual website content on top */}
      <div className="relative z-10">
        {children}
      </div>
      
    </div>
  );
};

export default VantaBackground;