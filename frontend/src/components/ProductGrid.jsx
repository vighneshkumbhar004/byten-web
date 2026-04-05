import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { products } from '../mock/mockData';
import { Target, Zap, ShieldCheck, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const iconMap = {
  Target: Target,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  Users: Users
};

const ProductGrid = () => {
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
            Why Byten
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Precision, speed, compliance, and expertise—everything you need for mission-critical geospatial intelligence
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => {
            const IconComponent = iconMap[product.icon];
            return (
              <motion.div
                key={product.id}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-none overflow-hidden group h-full"
                >
                  <div className="h-2 bg-gradient-to-r from-[#FFCC00] to-[#FFD633]"></div>
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="bg-[#0A111A] text-white w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FFCC00] transition-colors duration-300"
                    >
                      <IconComponent size={32} className="group-hover:text-[#0A111A]" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-[#0A111A] mb-2">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 0.1 * index, duration: 0.4 }}
                          className="flex items-start"
                        >
                          <CheckCircle className="text-[#FFCC00] mr-3 flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
