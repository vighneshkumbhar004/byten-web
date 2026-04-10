import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { products } from '../mock/mockData';
import { Target, Zap, ShieldCheck, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const iconMap = {
  Target: Target,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  Users: Users
};

const AnimatedCheckbox = ({ id, label, delay = 0 }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const initialTimer = window.setTimeout(() => setChecked(true), delay);

    const interval = window.setInterval(() => {
      setChecked((prev) => !prev);
    }, 2000); // Toggle every 2 seconds

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [delay]);

  return (
    <div className="animated-checkbox-container">
      <input
        id={id}
        type="checkbox"
        className="animated-checkbox-input"
        checked={checked}
        readOnly
      />
      <label htmlFor={id} className="animated-check" aria-label={label}>
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </div>
  );
};

const ProductGrid = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-byten" className="py-20 bg-transparent relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-sm font-heading">
            Why Choose Byten Geomapping
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-sans">
            Delivering survey-grade accuracy, regulatory compliance, and dependable field execution for critical geospatial projects.
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
                  className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white overflow-hidden group h-full"
                >
                  <div className="h-2 bg-gradient-to-r from-[#FFCC00] to-[#FFD633]"></div>
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="bg-gray-50 text-gray-700 border border-gray-200 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FFCC00] group-hover:text-white transition-colors duration-300"
                    >
                      <IconComponent size={32} />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2 font-heading">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed font-sans">
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
                          <AnimatedCheckbox
                            id={`feature-${product.id}-${index}`}
                            label={feature}
                            delay={isInView ? 500 + (index * 200) : 0}
                          />
                          <span className="text-gray-700 ml-3 font-sans font-medium">{feature}</span>
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
