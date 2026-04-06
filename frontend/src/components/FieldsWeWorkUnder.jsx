import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const fields = [
  {
    id: 1,
    name: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1768174004465-8afe7a180052?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMGNvbnN0cnVjdGlvbiUyMGFlcmlhbCUyMHZpZXd8ZW58MHx8fHwxNzc1Mzk3NzQ2fDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 2,
    name: 'Energy',
    image: 'https://images.unsplash.com/photo-1765263857986-271b4923632d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBwb3dlciUyMHJlbmV3YWJsZSUyMHNvbGFyJTIwd2luZHxlbnwwfHx8fDE3NzUzOTc3NDZ8MA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 3,
    name: 'Construction',
    image: 'https://images.unsplash.com/photo-1663058480199-acbc638bf21a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGUlMjB3b3JrZXJzfGVufDB8fHx8MTc3NTM5Nzc0Nnww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 4,
    name: 'Mining',
    image: 'https://images.unsplash.com/photo-1772543983082-a8a8051ab612?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjBxdWFycnklMjBleGNhdmF0aW9ufGVufDB8fHx8MTc3NTM5Nzc0Nnww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 5,
    name: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1721594489446-7fd9d30a3d71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm1pbmclMjBhZXJpYWx8ZW58MHx8fHwxNzc1Mzk3NzQ2fDA&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 6,
    name: 'Government Agencies',
    image: 'https://images.unsplash.com/photo-1760553120312-2821bf54e767?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBsYW5uaW5nJTIwY2l0eSUyMGRldmVsb3BtZW50fGVufDB8fHx8MTc3NTM5Nzc0Nnww&ixlib=rb-4.1.0&q=85'
  }
];

const FieldsWeWorkUnder = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Duplicate fields for seamless infinite scroll
  const duplicatedFields = [...fields, ...fields, ...fields];

  return (
    <section id="industries" className="py-20 bg-transparent overflow-hidden relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-sm font-heading">
            Fields We Work Under
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-sans">
            Delivering precision geospatial intelligence across diverse industries
          </p>
        </motion.div>

        {/* Infinite Horizontal Scroll Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Track */}
          <div className="flex animate-infinite-scroll hover:pause-animation">
            {duplicatedFields.map((field, index) => (
              <motion.div
                key={`${field.id}-${index}`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative flex-shrink-0 w-56 h-36 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group mx-3"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${field.image})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />
                
                {/* Text */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="font-bold text-sm md:text-base text-white text-center drop-shadow-lg">
                    {field.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FieldsWeWorkUnder;