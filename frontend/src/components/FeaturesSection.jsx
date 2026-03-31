import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { features } from '../mock/mockData';
import { Quote } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight } from '../utils/animations';

const FeatureItem = ({ feature }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div 
      ref={ref}
      className={`flex flex-col ${
        feature.imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } gap-12 items-center mb-32 last:mb-0`}
    >
      {/* Image */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={feature.imagePosition === 'left' ? slideInLeft : slideInRight}
        className="flex-1"
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={feature.image} 
            alt={feature.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00]/10 to-transparent"></div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={feature.imagePosition === 'left' ? slideInRight : slideInLeft}
        className="flex-1"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A111A] mb-6">
          {feature.title}
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {feature.description}
        </p>

        {/* Customer Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#FFCC00] shadow-md"
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
