import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../mock/mockData';
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
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
