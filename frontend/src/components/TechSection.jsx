import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Zap, Camera, Brain, ArrowRight, Cpu, Layers, Sparkles } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

const techData = [
  {
    id: 1,
    icon: Zap,
    title: "Advanced UAVs",
    subtitle: "Drone Hover Quadcopters",
    description: "State-of-the-art unmanned aerial vehicles equipped with precision flight controls, autonomous navigation, and real-time data capture capabilities.",
    features: ["Autonomous Flight", "Real-Time Streaming", "Precision Hover", "Long Range Operations"],
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    bgPattern: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
    accentColor: "blue"
  },
  {
    id: 2,
    icon: Camera,
    title: "Most Advanced LiDAR",
    subtitle: "Thermal Cameras",
    description: "Industry-leading LiDAR sensors and thermal imaging technology that capture millimeter-accurate 3D data and heat signatures.",
    features: ["Millimeter Precision", "Thermal Detection", "3D Point Cloud", "Night Vision"],
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    bgPattern: "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
    accentColor: "purple"
  },
  {
    id: 3,
    icon: Brain,
    title: "AI-Driven Analytics",
    subtitle: "Intelligent Reporting",
    description: "Our proprietary software transforms raw data into actionable intelligence using state-of-the-art mathematics and artificial intelligence.",
    features: ["Automated Reports", "Predictive Analytics", "Pattern Recognition", "Smart Insights"],
    gradient: "from-amber-500 via-orange-500 to-red-500",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)",
    accentColor: "orange"
  }
];

const TechCard = ({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const IconComponent = tech.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="perspective-1000"
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative group cursor-pointer h-full"
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 h-full flex flex-col">
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ background: tech.bgPattern }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Animated Gradient Orb */}
          <motion.div
            className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${tech.gradient} rounded-full blur-3xl opacity-20`}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 90 : 0,
            }}
            transition={{ duration: 1 }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon & Title */}
            <div className="mb-4">
              {/* Animated Icon */}
              <motion.div
                animate={{
                  rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
                className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${tech.gradient} shadow-lg mb-3`}
              >
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.gradient} blur-lg opacity-40`}
                  animate={{
                    opacity: isHovered ? 0.6 : 0.4,
                  }}
                />
                <IconComponent size={28} className="text-white relative z-10" />
                
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles size={14} className="text-[#FFCC00]" />
                  </motion.div>
                )}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0A111A] mb-1">
                {tech.title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${tech.gradient}`} />
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                  {tech.subtitle}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
              {tech.description}
            </p>

            {/* Features Compact List */}
            <div className="space-y-2 mb-4">
              {tech.features.slice(0, 3).map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.15 + idx * 0.05 + 0.2 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    className={`w-4 h-4 rounded bg-gradient-to-br ${tech.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <Cpu size={10} className="text-white" />
                  </motion.div>
                  <span className="text-xs text-gray-700 font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-3 rounded-lg bg-gradient-to-br ${tech.gradient} text-white text-center`}
            >
              <div className="text-xl font-bold">99.9%</div>
              <div className="text-[10px] opacity-90">Accuracy</div>
            </motion.div>
          </div>

          {/* Number Badge - Top Right */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#0A111A]/5 backdrop-blur-sm flex items-center justify-center">
            <span className="text-lg font-bold text-gray-300">0{index + 1}</span>
          </div>
        </div>

        {/* Animated Border on Hover */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tech.gradient} opacity-0`}
          animate={{
            opacity: isHovered ? 0.2 : 0,
          }}
          style={{
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const TechSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(10,17,26,0.15) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
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

        {/* Tech Cards Grid - 3 Columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techData.map((tech, index) => (
            <TechCard key={tech.id} tech={tech} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#0A111A] to-[#1A2130] rounded-2xl p-10 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,204,0,0.3) 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Experience the Technology Difference
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                See how our advanced technology stack delivers unmatched precision and intelligence
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFCC00] text-[#0A111A] px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              >
                Schedule a Technical Demo
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;
