import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { features } from '../mock/mockData';
import { Quote, ArrowUpRight } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight } from '../utils/animations';

const FeatureItem = ({ feature, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = React.useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col ${
        feature.imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } gap-16 items-center mb-40 last:mb-0 group`}
    >
      {/* Image with Premium Effects */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={feature.imagePosition === 'left' ? slideInLeft : slideInRight}
        className="flex-1 relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          {/* Animated Border Gradient */}
          <motion.div 
            className="absolute inset-0 z-10 rounded-2xl"
            animate={{
              background: isHovered 
                ? 'linear-gradient(45deg, #FFCC00, transparent, #FFCC00)'
                : 'linear-gradient(45deg, transparent, transparent, transparent)'
            }}
            style={{
              padding: '3px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />
          
          {/* Image Container */}
          <motion.div 
            className="relative h-[500px] overflow-hidden rounded-2xl"
            style={{ y: imageY }}
          >
            <motion.img 
              src={feature.image} 
              alt={feature.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {/* Premium Gradient Overlay */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: isHovered 
                  ? 'linear-gradient(135deg, rgba(255,204,0,0.3) 0%, rgba(10,17,26,0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(255,204,0,0.1) 0%, rgba(10,17,26,0.3) 100%)'
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Animated Light Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,204,0,0.3) 0%, transparent 50%)',
              }}
            />
          </motion.div>
          
          {/* Floating Number Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.4 }}
            className="absolute -left-6 top-8 bg-white text-[#FFCC00] w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold font-heading shadow-xl border border-gray-100/50"
          >
            0{index + 1}
          </motion.div>
        </div>
      </motion.div>

      {/* Content with Premium Styling */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={feature.imagePosition === 'left' ? slideInRight : slideInLeft}
        className="flex-1 space-y-8"
      >
        {/* Title with Animated Underline */}
        <div className="relative inline-block">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-white mb-2 relative z-10 font-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            {feature.title}
          </motion.h2>
          <motion.div
            className="h-1 bg-gradient-to-r from-[#FFCC00] to-transparent"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </div>
        
        <motion.p 
          className="text-lg text-gray-300 leading-relaxed drop-shadow-sm font-sans"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          {feature.description}
        </motion.p>

        {/* Premium Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-md overflow-hidden group/quote"
        >
          {/* Animated Background Element */}
          <motion.div
            className="absolute -right-8 -top-8 w-32 h-32 bg-[#FFCC00] opacity-10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <Quote className="text-[#FFCC00] mb-4 opacity-80" size={36} />
          <p className="text-gray-600 italic mb-6 text-lg leading-relaxed relative z-10 font-sans">
            "{feature.quote.text}"
          </p>
          <div className="flex items-center justify-between relative z-10 mb-6">
            <div>
              <p className="font-bold text-gray-900 text-lg font-heading">
                {feature.quote.author}
              </p>
              <p className="text-sm text-gray-500 mt-1 font-sans">
                {feature.quote.company}
              </p>
            </div>
          </div>

          {/* Learn More Button Inside Quote Card */}
          <button 
            className="learn-more relative z-10"
            onClick={() => window.location.href = `/services/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
            </span>
            <span className="button-text text-gray-900 font-bold font-sans">Learn More</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="solutions" className="py-32 bg-transparent relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {features.map((feature, index) => (
          <FeatureItem key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
