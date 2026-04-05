import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Building2, Zap, HardHat, Mountain, Sprout, Building, Users } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const fields = [
  {
    id: 1,
    name: 'Infrastructure',
    icon: Building2,
    description: 'Highways, bridges, railways, and urban infrastructure monitoring'
  },
  {
    id: 2,
    name: 'Energy',
    icon: Zap,
    description: 'Power grids, solar farms, wind turbines, and energy infrastructure'
  },
  {
    id: 3,
    name: 'Construction',
    icon: HardHat,
    description: 'Site mapping, progress tracking, and construction management'
  },
  {
    id: 4,
    name: 'Mining',
    icon: Mountain,
    description: 'Quarry mapping, volume measurement, and safety inspections'
  },
  {
    id: 5,
    name: 'Agriculture',
    icon: Sprout,
    description: 'Crop monitoring, land surveying, and precision agriculture'
  },
  {
    id: 6,
    name: 'Government',
    icon: Building,
    description: 'Smart cities, disaster management, and public infrastructure'
  },
  {
    id: 7,
    name: 'Agencies',
    icon: Users,
    description: 'Survey agencies, consulting firms, and service providers'
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {fields.map((field) => {
            const IconComponent = field.icon;
            return (
              <motion.div
                key={field.id}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#FFCC00]"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFCC00] rounded-lg p-3 flex-shrink-0">
                    <IconComponent size={24} className="text-[#0A111A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0A111A] mb-2">
                      {field.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {field.description}
                    </p>
                  </div>
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