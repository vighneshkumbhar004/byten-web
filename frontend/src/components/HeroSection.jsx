import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { heroData, statsData } from '../mock/mockData';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { requestDemo } from '../services/api';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  imageReveal
} from '../utils/animations';
import TerrainViewer3D from './TerrainViewer3D';

// Animated Counter Component
const AnimatedCounter = ({ end, label, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        // Parse the numeric part from strings like "2.4B+"
        const numericEnd = parseFloat(end);
        const current = numericEnd * progress;
        
        // Format based on the original format
        if (end.includes('B+')) {
          setCount(`${current.toFixed(1)}B+`);
        } else if (end.includes('%')) {
          setCount(`${current.toFixed(1)}%`);
        } else if (end.includes('+')) {
          setCount(`${Math.floor(current)}+`);
        } else if (end.includes('cm')) {
          setCount(`${current.toFixed(1)}cm`);
        } else {
          setCount(Math.floor(current));
        }
        
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-[#FFCC00] mb-2">
        {count}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-medium">
        {label}
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await requestDemo(email, 'hero');
    
    if (result.success) {
      toast.success('Demo request submitted! We\'ll contact you within 24 hours.');
      setDemoDialogOpen(false);
      setEmail('');
    } else {
      toast.error(result.error);
    }
    
    setLoading(false);
  };

  return (
    <>
      <section className="bg-white py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0A111A] mb-6 leading-tight"
            >
              {heroData.headline}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
            >
              {heroData.subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setDemoDialogOpen(true)}
                  className="bg-[#FFCC00] text-[#0A111A] hover:bg-[#FFD633] font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {heroData.primaryCTA}
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#0A111A] text-white hover:bg-[#1A2130] border-[#0A111A] font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {heroData.secondaryCTA}
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            >
              {statsData.map((stat, index) => (
                <AnimatedCounter
                  key={index}
                  end={stat.value}
                  label={stat.label}
                  duration={2}
                />
              ))}
            </motion.div>
          </div>

          {/* 3D Terrain Model Viewer */}
          <div className="max-w-6xl mx-auto mb-8">
            <TerrainViewer3D />
          </div>

          {/* Description under 3D model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-[#0A111A]">Real-Time 3D Terrain Visualization</span>
            </p>
            <p className="text-sm text-gray-500">
              Experience survey-grade 3D models with photorealistic textures captured by our LiDAR-equipped drones. 
              Every terrain feature mapped with 0.3cm precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Request Dialog */}
      <Dialog open={demoDialogOpen} onOpenChange={setDemoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0A111A]">Request a Demo</DialogTitle>
            <DialogDescription>
              Enter your email and we'll schedule an intelligence briefing with our team.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDemoRequest} className="space-y-4 mt-4">
            <Input
              type="email"
              placeholder="your.email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFCC00] text-[#0A111A] hover:bg-[#FFD633] font-semibold"
            >
              {loading ? 'Submitting...' : 'Request Demo'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
