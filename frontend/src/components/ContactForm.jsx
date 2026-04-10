import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, User, Building, MessageSquare, Send } from 'lucide-react';
import { companyInfo } from '../mock/mockData';
import { submitContactForm } from '../services/api';
import { fadeInUp, slideInLeft, slideInRight } from '../utils/animations';

const PremiumInput = ({ type, name, placeholder, value, onChange, required, isTextarea, Icon }) => {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-4 text-gray-500 peer-focus:text-[#FFCC00] transition-colors duration-300 z-10">
        {Icon && <Icon size={20} className={value ? "text-[#FFCC00]" : ""} />}
      </div>
      {isTextarea ? (
         <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={4}
            className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 pt-7 pb-3 text-gray-900 outline-none focus:border-[#FFCC00] focus:bg-gray-50 transition-all duration-300 peer placeholder-transparent resize-none shadow-sm font-sans"
            placeholder={placeholder}
         />
      ) : (
         <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 pt-7 pb-3 text-gray-900 outline-none focus:border-[#FFCC00] focus:bg-gray-50 transition-all duration-300 peer placeholder-transparent shadow-sm font-sans"
            placeholder={placeholder}
         />
      )}
      <label className={`absolute left-12 text-gray-500 text-sm transition-all duration-300 pointer-events-none font-sans
        peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-gray-900
        ${value ? '-translate-y-3 text-xs text-gray-700' : 'top-4.5'}
      `}>
         {placeholder}
      </label>
      
      {/* Subtle border glow on focus */}
      <div className="absolute inset-0 rounded-xl border border-[#FFCC00] opacity-0 peer-focus:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_15px_rgba(255,204,0,0.1)]" />
    </div>
  );
};

const ContactForm = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await submitContactForm(formData);

    if (result.success) {
      toast.success('Thank you! We will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  };

  // Modern input field data array
  const formFields = [
    { type: 'text', name: 'name', placeholder: 'Full Name *', required: true, Icon: User },
    { type: 'email', name: 'email', placeholder: 'Work Email *', required: true, Icon: Mail },
    { type: 'text', name: 'company', placeholder: 'Company Name *', required: true, Icon: Building },
    { type: 'tel', name: 'phone', placeholder: 'Phone Number', required: false, Icon: Phone },
  ];

  return (
    <section id="contact" className="py-32 bg-transparent relative overflow-hidden z-10" ref={ref}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-200/40 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Information */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInLeft}
            className="pr-0 md:pr-10"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-[#FFCC00]/20 text-white font-bold text-sm mb-6 border border-[#FFCC00]/50 font-sans tracking-wide">
              Get in Touch
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-sm font-heading">
              Ready to Transform Your <span className="text-[#FFCC00]">Operations?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg font-sans">
              Leverage drone intelligence, AI analytics, and precision mapping to accelerate your business outcomes.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, title: 'Email', text: companyInfo.email },
                { icon: MapPin, title: 'Headquarters', text: 'Pune, Maharashtra, India', subtext: 'Regional offices in Mumbai, Hyderabad, Bengaluru, Delhi' },
                { icon: Phone, title: 'Certifications', text: 'DGCA Licensed • ISO 9001:2015 • SOC 2 Type II • NDMA Empanelled' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                  className="flex items-start group"
                >
                  <div className="bg-white shadow-sm group-hover:shadow-md group-hover:bg-[#FFCC00] group-hover:-translate-y-1 transition-all duration-300 rounded-2xl p-4 mr-6 border border-gray-100 flex-shrink-0">
                    <item.icon className="text-[#FFCC00] group-hover:text-gray-900 transition-colors" size={28} />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-gray-900 text-lg mb-1 font-heading">{item.title}</p>
                    <p className="text-gray-600 text-[1.05rem] leading-snug font-sans">{item.text}</p>
                    {item.subtext && <p className="text-sm text-gray-500 mt-2 font-sans">{item.subtext}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInRight}
            className="relative w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto"
          >
            {/* Ambient Background Glows */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FFCC00] opacity-20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
              {/* Glassmorphism accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FFCC00] to-[#FFD633]" />
              
              <div className="mb-10 text-center">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-3 font-heading">
                  Request a Briefing
                </h3>
                <p className="text-gray-500 text-sm font-sans">
                  Connect with our experts to discuss your project requirements. We typically respond within 2 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.slice(0, 2).map((field, i) => (
                    <PremiumInput key={i} {...field} value={formData[field.name]} onChange={handleChange} />
                  ))}
                </div>
                
                {formFields.slice(2).map((field, i) => (
                  <PremiumInput key={i} {...field} value={formData[field.name]} onChange={handleChange} />
                ))}

                <PremiumInput 
                  isTextarea={true}
                  name="message" 
                  placeholder="Tell us about your infrastructure monitoring needs..." 
                  value={formData.message} 
                  onChange={handleChange} 
                  required={false}
                  Icon={MessageSquare}
                />

                <button 
                  type="submit"
                  disabled={loading}
                  className={`contact-submit button type1 ${loading ? 'is-loading' : ''}`}
                >
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

