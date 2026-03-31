import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';
import { companyInfo } from '../mock/mockData';
import { submitContactForm } from '../services/api';
import { fadeInUp, slideInLeft, slideInRight } from '../utils/animations';

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

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Information */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInLeft}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A111A] mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Schedule an intelligence briefing with our geospatial architects. 
              We'll assess your infrastructure, understand your challenges, and 
              demonstrate how our AI-powered platform delivers measurable ROI.
            </p>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-start"
              >
                <div className="bg-[#FFCC00] rounded-lg p-3 mr-4">
                  <Mail className="text-[#0A111A]" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-[#0A111A] mb-1">Email</p>
                  <p className="text-gray-600">{companyInfo.email}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-start"
              >
                <div className="bg-[#FFCC00] rounded-lg p-3 mr-4">
                  <MapPin className="text-[#0A111A]" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-[#0A111A] mb-1">Headquarters</p>
                  <p className="text-gray-600">Pune, Maharashtra, India</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Regional offices in Mumbai, Hyderabad, Bengaluru, Delhi
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-start"
              >
                <div className="bg-[#FFCC00] rounded-lg p-3 mr-4">
                  <Phone className="text-[#0A111A]" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-[#0A111A] mb-1">Certifications</p>
                  <p className="text-gray-600 text-sm">
                    DGCA Licensed • ISO 9001:2015 • SOC 2 Type II • NDMA Empanelled
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInRight}
            className="bg-[#0A111A] rounded-xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Request an Intelligence Briefing
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white border-none rounded-lg py-6 text-[#0A111A] placeholder:text-gray-400"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Work Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white border-none rounded-lg py-6 text-[#0A111A] placeholder:text-gray-400"
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="company"
                  placeholder="Company Name *"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="bg-white border-none rounded-lg py-6 text-[#0A111A] placeholder:text-gray-400"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white border-none rounded-lg py-6 text-[#0A111A] placeholder:text-gray-400"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your infrastructure monitoring needs..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-white border-none rounded-lg text-[#0A111A] placeholder:text-gray-400 resize-none"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FFCC00] text-[#0A111A] hover:bg-[#FFD633] font-bold py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? 'Submitting...' : 'Schedule Briefing'}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
