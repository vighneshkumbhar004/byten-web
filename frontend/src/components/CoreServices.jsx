import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Map, MapPin, Database, Construction, Share2, FileText, Zap, Landmark } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const services = [
  { name: "Land Surveying", icon: Map },
  { name: "Drone & Photogrammetry", icon: MapPin },
  { name: "GIS & Remote Sensing", icon: Database },
  { name: "Geotechnical Engineering", icon: Construction },
  { name: "UAV Asset Inspection", icon: Zap },
  { name: "Route Surveys", icon: Share2 },
  { name: "Feasibility Studies", icon: FileText },
  { name: "Smart City & Gov Schemes", icon: Landmark }
];

const CoreServices = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="core-services" className="py-20 bg-transparent relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial="hidden"
           animate={isInView ? "visible" : "hidden"}
           variants={fadeInUp}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#FFCC00]" />
            <span className="text-white font-bold uppercase tracking-wide text-xs">
              COMPREHENSIVE SOLUTIONS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-sm font-heading">
            Core Services
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors cursor-pointer group shadow-xl"
              >
                <div className="w-16 h-16 bg-[#FFCC00]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FFCC00] group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="text-[#FFCC00] group-hover:text-gray-900 w-8 h-8" />
                </div>
                <h3 className="text-white font-bold font-heading text-lg">
                  {service.name}
                </h3>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreServices;
