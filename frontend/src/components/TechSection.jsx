import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Zap, Camera, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

const techData = [
  {
    id: 1,
    icon: Zap,
    title: "Advanced UAVs",
    subtitle: "Next-Generation Aerial Systems",
    description: "Military-grade precision meets commercial accessibility. Our autonomous drone fleet delivers unmatched aerial intelligence.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80",
    features: ["Autonomous Navigation", "Real-Time Processing", "Extended Range", "Weather Resistant"],
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    stats: { value: "50km", label: "Range" }
  },
  {
    id: 2,
    icon: Camera,
    title: "Advanced LiDAR & Thermal",
    subtitle: "Precision Sensing Technology",
    description: "Industrial-grade sensors capturing what the human eye cannot. Millimeter accuracy meets thermal intelligence.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
    features: ["Point Cloud Capture", "Thermal Mapping", "Night Vision", "3D Reconstruction"],
    gradient: "from-purple-600 via-pink-500 to-rose-400",
    stats: { value: "0.3cm", label: "Precision" }
  },
  {
    id: 3,
    icon: Brain,
    title: "AI-Driven Analytics",
    subtitle: "Intelligent Data Processing",
    description: "State-of-the-art machine learning transforms raw data into strategic insights. Predictive intelligence at scale.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    features: ["Automated Reports", "Anomaly Detection", "Predictive Models", "Pattern Recognition"],
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
    stats: { value: "99.7%", label: "Accuracy" }
  }
];

const TechSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="py-32 bg-[#0A111A] relative overflow-hidden" ref={ref}>
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A111A] via-[#1A2130] to-[#0A111A]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,204,0,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
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
            className="inline-block mb-6"
          >
            <div className="flex items-center gap-3 bg-[#FFCC00]/10 backdrop-blur-sm border border-[#FFCC00]/20 rounded-full px-6 py-3">
              <div className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
              <span className="text-[#FFCC00] font-semibold uppercase tracking-wider text-sm">
                Technology Excellence
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Premium Technology.<br />
            <span className="bg-gradient-to-r from-[#FFCC00] to-[#FFD633] bg-clip-text text-transparent">
              Professional Results.
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Military-grade hardware meets enterprise software. Built for those who demand excellence.
          </p>
        </motion.div>

        {/* Premium Tech Showcase */}
        <div className="space-y-24">
          {techData.map((tech, index) => (
            <TechShowcase 
              key={tech.id} 
              tech={tech} 
              index={index} 
              isInView={isInView}
              isActive={activeCard === tech.id}
              setActive={setActiveCard}
            />
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="mt-24"
        >
          <div className="bg-gradient-to-r from-[#FFCC00] to-[#FFD633] rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-[#0A111A] mb-4">
                Experience Enterprise-Grade Technology
              </h3>
              <p className="text-[#0A111A]/80 text-lg mb-8 max-w-2xl mx-auto">
                Join industry leaders who trust Byten for mission-critical operations
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0A111A] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 inline-flex items-center gap-3"
              >
                Schedule Technical Consultation
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TechShowcase = ({ tech, index, isInView, isActive, setActive }) => {
  const IconComponent = tech.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onMouseEnter={() => setActive(tech.id)}
      onMouseLeave={() => setActive(null)}
      className="group"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
        {/* Image Side */}
        <div className="flex-1 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Image */}
            <motion.div 
              className="relative h-[500px] overflow-hidden"
              animate={{
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={tech.image} 
                alt={tech.title}
                className="w-full h-full object-cover"
              />
              {/* Premium Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-40 mix-blend-overlay`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </motion.div>

            {/* Floating Stats Badge */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -20 : 20 }}
              transition={{ delay: index * 0.2 + 0.4 }}
              className={`absolute bottom-8 ${isEven ? 'right-8' : 'left-8'} bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl`}
            >
              <div className="text-4xl font-bold text-[#0A111A] mb-1">
                {tech.stats.value}
              </div>
              <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                {tech.stats.label}
              </div>
            </motion.div>

            {/* Animated Border */}
            <motion.div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              style={{
                padding: '3px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
          </div>
        </div>

        {/* Content Side */}
        <div className="flex-1 space-y-8">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.2 + 0.2 }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${tech.gradient} shadow-2xl`}
          >
            <IconComponent size={40} className="text-white" />
          </motion.div>

          {/* Title */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -20 : 20 }}
              transition={{ delay: index * 0.2 + 0.3 }}
              className="text-[#FFCC00] font-semibold uppercase tracking-wider text-sm mb-3"
            >
              {tech.subtitle}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -20 : 20 }}
              transition={{ delay: index * 0.2 + 0.4 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {tech.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -20 : 20 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              {tech.description}
            </motion.p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {tech.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: index * 0.2 + 0.6 + idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tech.gradient} flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <span className="text-gray-300 font-medium text-sm">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechSection;
