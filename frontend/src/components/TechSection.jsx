import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Zap, Camera, Brain, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const techData = [
  {
    id: 1,
    icon: Zap,
    title: "Advanced UAVs",
    subtitle: "Drone Hover Quadcopters",
    description: "State-of-the-art unmanned aerial vehicles equipped with precision flight controls, autonomous navigation, and real-time data capture capabilities. Our drone fleet delivers unmatched aerial intelligence for infrastructure monitoring and surveying.",
    features: ["Autonomous Flight", "Real-Time Streaming", "Precision Hover", "Long Range Operations"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    icon: Camera,
    title: "Most Advanced LiDAR",
    subtitle: "Thermal Cameras",
    description: "Industry-leading LiDAR sensors and thermal imaging technology that capture millimeter-accurate 3D data and heat signatures. Our sensors detect what traditional cameras cannot, revealing hidden anomalies and structural issues.",
    features: ["Millimeter Precision", "Thermal Detection", "3D Point Cloud", "Night Vision"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    icon: Brain,
    title: "AI-Driven Analytics",
    subtitle: "Intelligent Reporting",
    description: "Our proprietary software transforms raw data into actionable intelligence using state-of-the-art mathematics and artificial intelligence. Automated analysis delivers comprehensive reports, predictive insights, and data-driven recommendations.",
    features: ["Automated Reports", "Predictive Analytics", "Pattern Recognition", "Smart Insights"],
    gradient: "from-amber-500 to-orange-500"
  }
];

const TechSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <motion.div
        className="absolute top-20 -right-32 w-96 h-96 bg-[#FFCC00] opacity-10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4"
          >
            <span className="bg-[#FFCC00]/10 text-[#0A111A] px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Technology Stack
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-[#0A111A] mb-6">
            Powered by Advanced Technology
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge hardware and intelligent software working in perfect harmony
          </p>
        </motion.div>

        {/* Tech Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {techData.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={tech.id}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                  {/* Animated Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Icon with Gradient */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${tech.gradient} mb-6 shadow-lg`}
                  >
                    <IconComponent size={32} className="text-white" />
                  </motion.div>

                  {/* Number Badge */}
                  <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-400">0{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-[#0A111A] mb-2">
                      {tech.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-semibold mb-4 uppercase tracking-wide">
                      {tech.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {tech.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {tech.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 0.1 * idx + 0.3 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.gradient}`} />
                          <span className="text-sm text-gray-700 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      className="mt-6 flex items-center gap-2 text-[#FFCC00] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="text-sm">Learn More</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[#0A111A] to-[#1A2130] rounded-2xl p-12 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,204,0,0.3) 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Experience the Technology Difference
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                See how our advanced technology stack delivers unmatched precision and intelligence
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFCC00] text-[#0A111A] px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              >
                Schedule a Technical Demo
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;
