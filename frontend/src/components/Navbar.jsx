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
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDialogOpen, setDemoDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [demoForm, setDemoForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    industry: '',
    companySize: '',
    projectType: '',
    budget: '',
    timeline: '',
    specificRequirements: ''
  });

  const handleInputChange = (field, value) => {
    setDemoForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDemoRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Send detailed form data
    const result = await requestDemo(demoForm.email, 'navbar_detailed', demoForm);
    
    if (result.success) {
      toast.success('Demo request submitted! Our team will contact you within 24 hours.');
      setDemoDialogOpen(false);
      setDemoForm({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        industry: '',
        companySize: '',
        projectType: '',
        budget: '',
        timeline: '',
        specificRequirements: ''
      });
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

      {/* Enhanced Demo Request Dialog */}
      <Dialog open={demoDialogOpen} onOpenChange={setDemoDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0A111A]">
              Request an Intelligence Briefing
            </DialogTitle>
            <DialogDescription>
              Tell us about your project and we'll schedule a personalized demo with our geospatial architects.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleDemoRequest} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={demoForm.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Work Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={demoForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  placeholder="john@company.com"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={demoForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Company */}
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={demoForm.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                  placeholder="Acme Corp"
                />
              </div>

              {/* Job Title */}
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={demoForm.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="Infrastructure Manager"
                />
              </div>

              {/* Industry */}
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select onValueChange={(value) => handleInputChange('industry', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure & Civil</SelectItem>
                    <SelectItem value="energy">Energy & Power</SelectItem>
                    <SelectItem value="mining">Mining & Quarrying</SelectItem>
                    <SelectItem value="smart-city">Smart Cities</SelectItem>
                    <SelectItem value="oil-gas">Oil & Gas</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company Size */}
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Select onValueChange={(value) => handleInputChange('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Project Type */}
              <div>
                <Label htmlFor="projectType">Project Type *</Label>
                <Select onValueChange={(value) => handleInputChange('projectType', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="survey">Drone Survey & Mapping</SelectItem>
                    <SelectItem value="monitoring">Infrastructure Monitoring</SelectItem>
                    <SelectItem value="inspection">Industrial Inspection</SelectItem>
                    <SelectItem value="digital-twin">Digital Twin Platform</SelectItem>
                    <SelectItem value="predictive">Predictive Maintenance</SelectItem>
                    <SelectItem value="multiple">Multiple Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget Range */}
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Select onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                    <SelectItem value="50k-1L">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="1L-5L">₹1L - ₹5L</SelectItem>
                    <SelectItem value="5L-10L">₹5L - ₹10L</SelectItem>
                    <SelectItem value="10L-50L">₹10L - ₹50L</SelectItem>
                    <SelectItem value="50L+">₹50L+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Timeline */}
              <div>
                <Label htmlFor="timeline">Project Timeline</Label>
                <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When do you need it?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (within 1 week)</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="6+ months">6+ months</SelectItem>
                    <SelectItem value="exploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Specific Requirements */}
            <div>
              <Label htmlFor="requirements">Specific Requirements or Questions</Label>
              <Textarea
                id="requirements"
                value={demoForm.specificRequirements}
                onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
                placeholder="Tell us about your project area, specific challenges, or any questions you have..."
                rows={4}
              />
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFCC00] text-[#0A111A] hover:bg-[#FFD633] font-semibold py-6 text-lg"
            >
              {loading ? 'Submitting...' : 'Schedule Intelligence Briefing'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to our privacy policy. We'll contact you within 24 hours.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
