import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GeomappingAnimation from '../components/GeomappingAnimation';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LogoBanner from '../components/LogoBanner';
import FeaturesSection from '../components/FeaturesSection';
import ProductGrid from '../components/ProductGrid';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import FloatingChatbot from '../components/FloatingChatbot';
import WhatsAppButton from '../components/WhatsAppButton';

const LandingPage = () => {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <>
      {/* 3D Geomapping Animation */}
      {showLanding && (
        <GeomappingAnimation onComplete={() => setShowLanding(false)} />
      )}

      {/* Main Content */}
      <AnimatePresence>
        {!showLanding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white"
          >
            <Navbar />
            <HeroSection />
            <LogoBanner />
            <FeaturesSection />
            <ProductGrid />
            <ContactForm />
            <Footer />
            
            {/* Floating Widgets */}
            <FloatingChatbot />
            <WhatsAppButton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPage;
