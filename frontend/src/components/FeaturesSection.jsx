import React from 'react';
import { features } from '../mock/mockData';
import { Quote } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature, index) => (
          <div 
            key={feature.id}
            className={`flex flex-col ${
              feature.imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } gap-12 items-center mb-32 last:mb-0`}
          >
            {/* Image */}
            <div className="flex-1">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00]/10 to-transparent"></div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A111A] mb-6">
                {feature.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {feature.description}
              </p>

              {/* Customer Quote */}
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#FFCC00] shadow-md">
                <Quote className="text-[#FFCC00] mb-3" size={32} />
                <p className="text-gray-700 italic mb-4">
                  "{feature.quote.text}"
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-[#0A111A]">
                      {feature.quote.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {feature.quote.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
