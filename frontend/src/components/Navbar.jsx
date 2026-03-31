import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { companyInfo, navLinks } from '../mock/mockData';
import { Button } from './ui/button';
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

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await requestDemo(email, 'navbar');
    
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
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center"
            >
              <img 
                src={companyInfo.logo} 
                alt={companyInfo.name}
                className="h-12 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden md:flex items-center space-x-8"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  className="text-[#0A111A] hover:text-[#FFCC00] font-medium transition-colors duration-200"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="hidden md:block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setDemoDialogOpen(true)}
                  className="bg-[#FFCC00] text-[#0A111A] hover:bg-[#FFD633] font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Request a Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#0A111A] p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden pb-4 overflow-hidden"
              >
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-[#0A111A] hover:text-[#FFCC00] font-medium transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button 
                    onClick={() => {
                      setDemoDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-[#FFCC00] text-[#0A111A] hover:bg-[#FFD633] font-semibold w-full rounded-xl"
                  >
                    Request a Demo
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

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

export default Navbar;
