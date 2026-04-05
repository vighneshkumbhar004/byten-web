import React from 'react';
import { clientLogos } from '../mock/mockData';

const TrustedBySection = () => {
  // Triple the logos for seamless infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 font-medium mb-10 uppercase tracking-wider text-sm">
          Trusted by Leading Enterprises
        </p>
        
        {/* Infinite Scroll Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Track */}
          <div className="flex animate-infinite-scroll hover:pause-animation">
            {duplicatedLogos.map((client, index) => (
              <div 
                key={index}
                className="flex items-center justify-center flex-shrink-0 w-48 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
