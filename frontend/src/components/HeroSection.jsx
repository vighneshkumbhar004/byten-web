import React from 'react';
import { heroData, statsData } from '../mock/mockData';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const dashboardImages = [
    "https://images.unsplash.com/photo-1583932692931-7929f3c35e6a?w=800",
    "https://images.pexels.com/photos/4558710/pexels-photo-4558710.jpeg?w=800",
    "https://images.pexels.com/photos/6366444/pexels-photo-6366444.jpeg?w=800"
  ];

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0A111A] mb-6 leading-tight">
            {heroData.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            {heroData.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              className="bg-[#FFCC00] text-[#0A111A] hover:bg-[#FFD633] font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {heroData.primaryCTA}
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              variant="outline"
              className="bg-[#0A111A] text-white hover:bg-[#1A2130] border-[#0A111A] font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {heroData.secondaryCTA}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlapping Dashboard Images */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardImages.map((img, index) => (
              <div 
                key={index}
                className="relative rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:z-10"
                style={{
                  marginTop: index === 1 ? '2rem' : '0',
                  marginBottom: index === 1 ? '0' : '2rem'
                }}
              >
                <img 
                  src={img} 
                  alt={`Dashboard ${index + 1}`}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A111A]/30 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
