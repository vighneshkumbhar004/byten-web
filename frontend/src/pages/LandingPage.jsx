import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FieldsWeWorkUnder from '../components/FieldsWeWorkUnder';
import FeaturesSection from '../components/FeaturesSection';
import ProductGrid from '../components/ProductGrid';
import ContactForm from '../components/ContactForm';
import TrustedBySection from '../components/LogoBanner';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FieldsWeWorkUnder />
      <FeaturesSection />
      <ProductGrid />
      <ContactForm />
      <TrustedBySection />
      <Footer />
      
      {/* WhatsApp Widget */}
      <WhatsAppButton />
    </div>
  );
};

export default LandingPage;
