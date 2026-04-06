import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../mock/mockData';
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
      <section className="hero-section relative overflow-hidden py-32 bg-transparent font-sans">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/assets/herosectionvid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-[1] pointer-events-none bg-black/40" />
        <div className="hero-section-overlay-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          {/* Hero Content */}
          <div className="hero-content text-center mb-16 px-4 lg:px-0 mt-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-6xl md:text-8xl font-extrabold text-[#FFCC00] mb-6 tracking-tight leading-[1.05] font-heading"
            >
              {heroData.headline}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12 font-sans"
            >
              {heroData.subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => setDemoDialogOpen(true)}
                  className="animated-demo-button font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>{heroData.primaryCTA}</span>
                </button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                  className="animated-learn-more-btn font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {heroData.secondaryCTA}
                </button>
              </motion.div>
            </motion.div>
          </div>
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
            <button 
              type="submit"
              disabled={loading}
              className="animated-submit-button w-full bg-[#FFCC00] text-[#0A111A] hover:bg-[#FFD633] font-semibold py-3 rounded-lg"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <div className="button">
                  <div className="box">S</div>
                  <div className="box">U</div>
                  <div className="box">B</div>
                  <div className="box">M</div>
                  <div className="box">I</div>
                  <div className="box">T</div>
                </div>
              )}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
