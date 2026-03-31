import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LogoBanner from '../components/LogoBanner';
import FeaturesSection from '../components/FeaturesSection';
import ProductGrid from '../components/ProductGrid';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <LogoBanner />
      <FeaturesSection />
      <ProductGrid />
      <ContactForm />
      <Footer />
      
      {/* WhatsApp Widget */}
      <WhatsAppButton />
    </div>
  );
};

export default LandingPage;
