import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollFrameAnimation from '../components/ScrollFrameAnimation';
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
  return (
    <div className="relative min-h-screen">
      {/* Scroll-triggered Drone Frame Animation Background */}
      <ScrollFrameAnimation />
      
      {/* Content Layer */}
      <div className="relative z-10">
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
      </div>
    </div>
  );
};

export default LandingPage;
