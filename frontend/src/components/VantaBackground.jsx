import React from 'react';

const VantaBackground = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-[100vw] h-[100vh] object-cover z-0 pointer-events-none"
      >
        <source src="/assets/motion graph.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 w-full flex flex-col min-h-screen bg-transparent">
        {children}
      </div>
    </div>
  );
};

export default VantaBackground;