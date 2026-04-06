import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FieldsWeWorkUnder from '../components/FieldsWeWorkUnder';
import TechSection from '../components/TechSection';
import FeaturesSection from '../components/FeaturesSection';
import ProductGrid from '../components/ProductGrid';
import ContactForm from '../components/ContactForm';
import TrustedBySection from '../components/LogoBanner';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollSequence from '../components/ScrollSequence';

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden relative">
        <Navbar />
        <HeroSection />
        <FieldsWeWorkUnder />
        <TechSection />
        <FeaturesSection />
        <ProductGrid />
        <TrustedBySection />
        <ContactForm />
        <Footer />
      {/* WhatsApp Widget */}
      <WhatsAppButton />
    </div>
  );
};

export default LandingPage;
