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
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
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
        className="relative group cursor-pointer"
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-gray-200">
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ background: tech.bgPattern }}
            animate={{
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Animated Gradient Orb */}
          <motion.div
            className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${tech.gradient} rounded-full blur-3xl opacity-20`}
            animate={{
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? 180 : 0,
            }}
            transition={{ duration: 1.5 }}
          />

          {/* Floating Particles */}
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -100 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#FFCC00] rounded-full"
              />
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -100 }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#FFCC00] rounded-full"
              />
            </>
          )}

          {/* Content Container */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Side - Icon & Title */}
            <div className="flex-1">
              {/* Large Animated Icon */}
              <motion.div
                animate={{
                  rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.6 }}
                className={`relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${tech.gradient} shadow-2xl mb-6`}
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.gradient} blur-xl opacity-50`}
                  animate={{
                    opacity: isHovered ? 0.8 : 0.5,
                  }}
                />
                <IconComponent size={48} className="text-white relative z-10" />
                
                {/* Sparkle Effect */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles size={20} className="text-[#FFCC00]" />
                  </motion.div>
                )}
              </motion.div>

              {/* Title */}
              <div className="mb-4">
                <h3 className="text-3xl lg:text-4xl font-bold text-[#0A111A] mb-2">
                  {tech.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${tech.gradient}`} />
                  <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                    {tech.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {tech.description}
              </p>

              {/* Learn More Link */}
              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-[#0A111A] font-semibold group/link"
              >
                <span>Explore Technology</span>
                <ArrowRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
              </motion.div>
            </div>

            {/* Right Side - Features Grid */}
            <div className="flex-shrink-0 lg:w-64">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={20} className={`text-${tech.accentColor}-500`} />
                  <h4 className="font-bold text-[#0A111A]">Key Capabilities</h4>
                </div>
                
                <div className="space-y-3">
                  {tech.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.2 + idx * 0.1 + 0.3 }}
                      className="flex items-start gap-3 group/feature"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        className={`mt-1 w-6 h-6 rounded-lg bg-gradient-to-br ${tech.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <Layers size={14} className="text-white" />
                      </motion.div>
                      <span className="text-sm text-gray-700 font-medium group-hover/feature:text-[#0A111A] transition-colors">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`mt-6 p-4 rounded-xl bg-gradient-to-br ${tech.gradient} text-white`}
                >
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-xs opacity-90">Operational Accuracy</div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Number Badge - Bottom Right */}
          <div className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl bg-[#0A111A]/5 backdrop-blur-sm flex items-center justify-center border border-gray-200">
            <span className="text-3xl font-bold text-gray-300">0{index + 1}</span>
          </div>
        </div>

        {/* Animated Border on Hover */}
        <motion.div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tech.gradient} opacity-0`}
          animate={{
            opacity: isHovered ? 0.3 : 0,
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
    <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" ref={ref}>
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

        {/* Tech Cards Stack */}
        <div className="space-y-8">
          {techData.map((tech, index) => (
            <TechCard key={tech.id} tech={tech} index={index} />
          ))}
        </div>

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
