import React from 'react';
import { clientLogos } from '../mock/mockData';

const TrustedBySection = () => {
  // Triple the logos for seamless infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="bg-transparent relative z-10 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-300 font-sans drop-shadow-sm font-medium mb-2 uppercase tracking-wider text-sm">
          Trusted by Leading Enterprises
        </p>
        <p className="text-center text-gray-400 font-sans text-xs mb-10">
          Partnering with industry leaders across energy, infrastructure, construction, and government sectors.
        </p>
        
        {/* Infinite Scroll Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Track */}
          <div className="flex animate-infinite-scroll hover:pause-animation">
            {duplicatedLogos.map((client, index) => (
              <div 
                key={index}
                className="flex items-center justify-center flex-shrink-0 mx-8 opacity-75 hover:opacity-100 transition-all duration-300"
              >
                {client.logo ? (
                  <div className="bg-white rounded-xl px-5 py-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center" style={{minWidth: '130px', height: '56px'}}>
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-8 w-auto object-contain max-w-[110px]"
                    />
                  </div>
                ) : (
                  <span className="text-white font-bold text-base tracking-wide whitespace-nowrap border border-white/20 rounded-xl px-5 py-3 bg-white/5 hover:bg-white/10 hover:border-[#FFCC00]/50 hover:text-[#FFCC00] transition-all duration-300 font-heading">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
