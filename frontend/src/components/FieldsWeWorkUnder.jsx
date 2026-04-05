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
    name: 'Government',
    image: 'https://images.unsplash.com/photo-1760553120312-2821bf54e767?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBsYW5uaW5nJTIwY2l0eSUyMGRldmVsb3BtZW50fGVufDB8fHx8MTc3NTM5Nzc0Nnww&ixlib=rb-4.1.0&q=85'
  },
  {
    id: 7,
    name: 'Agencies',
    image: 'https://images.unsplash.com/photo-1624222924285-c8e0951b1d18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwbW9uaXRvcmluZyUyMG5hdHVyZSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzc1Mzk3NzQ2fDA&ixlib=rb-4.1.0&q=85'
  }
];

const FieldsWeWorkUnder = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A111A] mb-4">
            Fields We Work Under
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Delivering precision geospatial intelligence across diverse industries
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {fields.map((field) => {
            return (
              <motion.div
                key={field.id}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative h-32 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
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
                  <h3 className="font-bold text-base md:text-lg text-white text-center drop-shadow-lg">
                    {field.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FieldsWeWorkUnder;