import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck, Award, FileText, Download } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '../utils/animations';

const DirectorsVision = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      <Navbar />
      <div className="h-24"></div>

      <section className="py-20 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#FFCC00]" />
            <span className="text-white font-bold uppercase tracking-wide text-xs">LEADERSHIP</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 font-heading drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Director&apos;s Vision
          </h1>
          <div className="h-1 w-24 bg-[#FFCC00] mx-auto rounded-full shadow-[0_0_15px_rgba(255,204,0,0.5)]"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 relative">
          <motion.div initial="hidden" animate="visible" variants={slideInLeft} className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative aspect-[4/5] max-w-md mx-auto lg:max-w-none lg:mx-0 bg-gray-900 group">
              <img src="/assets/director.png" alt="Er. Ashish Shantisagar Biradar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90" />
            </div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-[#FFCC00] rounded-full blur-3xl opacity-20" />
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={slideInRight} className="space-y-6 text-lg text-gray-300 font-sans leading-relaxed bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFCC00]/10 rounded-full blur-3xl" />
            <QuoteIcon />
            <p className="relative z-10 text-xl font-medium text-white italic">
              <span className="text-[#FFCC00]">"</span> At Byten Geomapping Technologies, our journey has been one of passion and growth. What started as a local land surveying firm has blossomed into a beacon of innovation and expertise. Our commitment to excellence drives us to harness the latest in GIS, Drone mapping, LiDAR, and Geotechnical engineering transforming the way we see and understand the world. Each project reflects our dedication and belief in making a meaningful impact. <span className="text-[#FFCC00]">"</span>
            </p>
            <div className="pt-8 border-t border-white/10 mt-8 relative z-10 flex justify-between items-center">
              <div>
                <h4 className="text-white font-bold font-heading text-2xl">Er. Ashish Shantisagar Biradar</h4>
                <p className="text-[#FFCC00] font-sans font-medium mt-1">Chairman &amp; Managing Director</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                <ShieldCheck className="text-white w-8 h-8 opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Pillars */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Innovation", icon: Zap, desc: "Leveraging state-of-the-art DGPS, LiDAR, and UAS platforms to push the boundaries of what's possible." },
            { title: "Precision", icon: Target, desc: "Delivering sub-centimeter accuracy because in engineering and infrastructure, every millimeter counts." },
            { title: "Reliability", icon: ShieldCheck, desc: "Building trust through consistent, verifiable results and unwavering commitment to project success." },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={i} variants={staggerItem} className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-[#FFCC00]/50 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#FFCC00] opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500" />
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFCC00]/20 to-transparent rounded-2xl flex items-center justify-center mb-8 border border-[#FFCC00]/20 group-hover:scale-110 transition-transform duration-500">
                  <Icon size={40} className="text-[#FFCC00]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-heading">{pillar.title}</h3>
                <p className="text-gray-400 font-sans text-lg leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Certifications & Recognition */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mt-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span className="text-white font-bold uppercase tracking-wide text-xs">OFFICIAL DOCUMENTS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading">Certifications &amp; Recognitions</h2>
            <div className="h-1 w-16 bg-[#FFCC00] mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

            {/* Certificate of Recognition - JPEG */}
            <div className="flex flex-col gap-4 group">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl transition-all duration-300 group-hover:border-[#FFCC00]/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFCC00] to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <Award size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">Certificate of Recognition</h3>
                  <p className="text-xs text-gray-400 font-sans">Official Operational Clearance</p>
                </div>
              </div>
              <div className="w-full rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-[#FFCC00]/30 transition-colors duration-300">
                <img src="/assets/certificate-of-recognition.jpeg" alt="Certificate of Recognition" className="w-full h-auto object-contain" />
              </div>
            </div>

            {/* Registration Letter - JPEG */}
            <div className="flex flex-col gap-4 group">
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl transition-all duration-300 group-hover:border-[#FFCC00]/30">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFCC00] to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <FileText size={24} className="text-gray-900" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">Registration Letter</h3>
                  <p className="text-xs text-gray-400 font-sans">Official Business Registration</p>
                </div>
              </div>
              <div className="w-full rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-[#FFCC00]/30 transition-colors duration-300">
                <img src="/assets/registration-letter.jpeg" alt="Registration Letter" className="w-full h-auto object-contain" />
              </div>
            </div>

            {/* Government Letter - PDF iframe (kept) */}
            <div className="flex flex-col gap-4 group">
              <div className="flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl transition-all duration-300 group-hover:border-[#FFCC00]/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFCC00] to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    <FileText size={24} className="text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">Government Letter</h3>
                    <p className="text-xs text-gray-400 font-sans">Official Mapping Authorization</p>
                  </div>
                </div>
                <a href="/assets/government_letter.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#FFCC00]/10 hover:bg-[#FFCC00] text-[#FFCC00] hover:text-gray-900 rounded-lg text-sm font-bold transition-colors border border-[#FFCC00]/20">
                  <Download size={16} /> Open
                </a>
              </div>
              <div className="w-full aspect-[1/1.3] bg-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative group-hover:border-[#FFCC00]/30 transition-colors duration-300">
                <iframe src="/assets/government_letter.pdf#toolbar=0&navpanes=0&scrollbar=0" title="Government Letter" className="w-full h-full border-none" />
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

const QuoteIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFCC00] opacity-30 mb-8 absolute -top-4 -left-4 z-0">
    <path d="M10 11H6C6 8.23858 8.23858 6 11 6V4C7.13401 4 4 7.13401 4 11V19H12V11H10ZM20 11H16C16 8.23858 18.23858 6 21 6V4C17.13401 4 14 7.13401 14 11V19H22V11H20Z" fill="currentColor"/>
  </svg>
);

export default DirectorsVision;
