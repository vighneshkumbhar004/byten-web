import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { Check, Zap, FileText, Layers, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const serviceData = {
  "land-surveying": {
    title: "Precision Land Surveying",
    subtitle: "Using cutting-edge DGPS, Total Station, and drone-integrated methodologies.",
    hero: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200",
    overview: "We deliver precise land data for planning, legal, and infrastructure purposes. By integrating drones with DGPS and handheld sensors, we provide high-resolution imagery with accurate real coordinates.",
    capabilities: [
      "DGPS & Drone Integrated Surveys",
      "Topographic Mapping & DEMs",
      "Route Alignments & Transmissions",
      "Contour & Surface Models",
      "Private & Gov Boundary Surveys"
    ],
    deliverables: [
      "Topographic Maps (AutoCAD)",
      "Digital Elevation Models (DEM)",
      "Millimeter-level Static DGPS",
      "Partition Layout & Development Plans"
    ],
    useCases: [
      "Infrastructure Development",
      "Solar Project Analysis",
      "Land Record Digitization",
      "Legal Boundary Disputes"
    ],
    benefits: [
      "Millimeter precision",
      "Tailored site execution",
      "Highly accurate GPS tracking",
      "Seamless drone integration"
    ],
    cta: "Start Your Survey Project"
  },
  "uav-and-drone-services": {
    title: "UAV & Drone Photogrammetry",
    subtitle: "Cutting-edge drone technology for precise surveying and asset inspection.",
    hero: "/Inspection.jpg",
    overview: "Byten employs cutting-edge drone technology across Power, Energy, Mining, Rail, Infrastructure, and Oil & Gas sectors. From DGPS control point acquisition to high-resolution geospatial outputs, we optimize data workflows.",
    capabilities: [
      "Flight Route Planning & Execution",
      "Orthomosaic Mapping",
      "Thermal Solar Panel Inspection",
      "Power Line & Wind Turbine Tracking",
      "Smart City 3D Topographic Data"
    ],
    deliverables: [
      "Orthomosaic Maps (GeoTIFF)",
      "2D & 3D Point Clouds",
      "Digital Surface & Terrain Models",
      "Cross & Long Section Profiles"
    ],
    useCases: [
      "Renewable Energy & Solar",
      "Mining & Volumetric Analysis",
      "Power Transmission Corridors",
      "Railways & Infrastructure"
    ],
    benefits: [
      "Millimeter-level damage detection",
      "Real-time visual updates",
      "Rapid data processing",
      "Non-intrusive operations"
    ],
    cta: "Schedule an Aerial Survey"
  },
  "gis-and-remote-sensing": {
    title: "GIS & Remote Sensing Solutions",
    subtitle: "Transform raw data into actionable geospatial intelligence.",
    hero: "/Videography.jpg",
    overview: "We offer complete spatial data analysis, uncovering patterns through querying, buffering, and 3D terrain analysis. From transforming analog maps to digital coordinates, we align digital infrastructures to real-world dimensions.",
    capabilities: [
      "Cadastral & Parcel Mapping",
      "Dynamic Map Preparation",
      "LULC & Utility Mapping",
      "CAD & Digitization Works",
      "Geo-Referencing Automation"
    ],
    deliverables: [
      "Digitized Master Base Maps",
      "LULC Spatial Reports",
      "SVAMITVA Scheme Support Maps",
      "Forest LiDAR & Multispectral Inventory"
    ],
    useCases: [
      "Urban & Rural Governance",
      "Forest Department Planning",
      "Real Estate Parcel Mapping",
      "Utility Network Distribution"
    ],
    benefits: [
      "Accurate legal boundaries",
      "Interactive & customizable",
      "Seamless CAD integration",
      "Data-driven regional planning"
    ],
    cta: "Optimize Your Geospatial Data"
  },
  "geotechnical-engineering": {
    title: "Geotechnical Engineering",
    subtitle: "Comprehensive soil exploration and geophysical foundation studies.",
    hero: "/Digital-Twin.jpg",
    overview: "We specialize in geo-technical exploration and geophysical investigations for large infrastructure projects. Combining robust in-situ field testing with extensive laboratory analysis to ensure solid foundation capacities.",
    capabilities: [
      "Soil Boring & Core Drilling",
      "Standard Penetration Testing (SPT)",
      "Safe Bearing Capacity (SBC)",
      "Seismic Refraction",
      "Water Exploration & Resistivity"
    ],
    deliverables: [
      "Detailed Soil Investigation Reports",
      "Field Permeability Analysis",
      "Liquid & Plastic Limit Metrics",
      "Consolidation & Direct Shear Outputs"
    ],
    useCases: [
      "Bridge & Highway Construction",
      "Heavy Infrastructure Layouts",
      "Industrial Corridors",
      "Architectural Foundation Planning"
    ],
    benefits: [
      "NABL-compliant laboratory testing",
      "Extensive sub-surface clarity",
      "Risk mitigation for construction",
      "End-to-End exploration delivery"
    ],
    cta: "Request a Geotechnical Study"
  }
};

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const service = serviceData[serviceName];

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceName]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-[#FFCC00] text-white px-6 py-3 rounded-xl font-bold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent text-gray-100 min-h-screen w-full relative font-sans">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <Navbar />
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FFCC00] origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="flex flex-col w-full relative z-10 pt-20">

        {/* ── PANEL 1: Hero ── */}
        <section className="w-full min-h-[90vh] relative flex items-center border-b border-white/10">
          <div className="absolute inset-0">
            <img
              src={service.hero}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A111A] via-[transparent] to-[#0A111A]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A111A]/90 via-[#0A111A]/60 to-transparent" />
          </div>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
              <motion.button
                onClick={() => navigate('/')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group mb-10 shadow-lg hover:shadow-xl transition-shadow"
                type="button"
              >
                <div className="bg-[#FFCC00] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                    <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
                    <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
                  </svg>
                </div>
                <p className="translate-x-2 relative z-20 group-hover:text-black transition-colors duration-500">Go Back</p>
              </motion.button>

              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="inline-flex items-center gap-2 bg-[#FFCC00]/20 border border-[#FFCC00]/50 rounded-full px-4 py-1.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                  <span className="text-[#FFCC00] font-bold uppercase tracking-wide text-xs">Byten Services</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight font-heading max-w-4xl">
                  {service.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
                  {service.subtitle}
                </p>
                <div className="mt-10 flex items-center gap-3 text-gray-300 text-sm">
                  <span className="animate-pulse w-2 h-2 rounded-full bg-[#FFCC00] inline-block" />
                  Scroll to explore ↓
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PANEL 2: Overview ── */}
        <section className="w-full relative flex items-center py-32 border-b border-white/5">
          <div className="absolute inset-0 bg-transparent" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
              <p className="text-[#FFCC00] font-bold uppercase tracking-widest text-sm mb-4">01 — Overview</p>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-10 font-heading leading-tight">
                What We Do
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium border-l-4 border-[#FFCC00] pl-8 bg-white/5 p-8 rounded-r-3xl backdrop-blur-sm border-r border-[#FFCC00]/10">
                {service.overview}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 3: Capabilities ── */}
        <section className="w-full relative flex items-center py-32 border-b border-white/5 bg-gradient-to-b from-transparent to-black/30">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
              <p className="text-[#FFCC00] font-bold uppercase tracking-widest text-sm mb-4">02 — Capabilities</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 font-heading">
                What We Can Do
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {service.capabilities.map((cap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-start gap-4 hover:border-[#FFCC00]/50 hover:bg-white/15 transition-all duration-300 shadow-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Zap size={20} className="text-gray-900" />
                    </div>
                    <p className="text-white font-semibold text-lg leading-snug">{cap}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 4: Deliverables ── */}
        <section className="w-full relative flex items-center py-32 border-b border-white/5">
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
              <p className="text-[#FFCC00] font-bold uppercase tracking-widest text-sm mb-4">03 — Deliverables</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 font-heading">
                What You Receive
              </h2>
              <div className="space-y-4">
                {service.deliverables.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-[#FFCC00]/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFCC00]/20 border border-[#FFCC00]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFCC00] transition-colors duration-300">
                      <FileText size={18} className="text-[#FFCC00] group-hover:text-gray-900 transition-colors duration-300" />
                    </div>
                    <span className="text-white font-semibold text-xl">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 5: Use Cases ── */}
        <section className="w-full relative flex items-center py-32 border-b border-white/5 bg-gradient-to-t from-black/20 to-transparent">
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
              <p className="text-[#FFCC00] font-bold uppercase tracking-widest text-sm mb-4">04 — Use Cases</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 font-heading">
                Industries We Serve
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.useCases.map((useCase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:border-[#FFCC00]/50 hover:bg-white/15 transition-all duration-300 group shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FFCC00]/20 border border-[#FFCC00]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFCC00] transition-colors duration-300">
                        <Layers size={18} className="text-[#FFCC00] group-hover:text-gray-900 transition-colors duration-300" />
                      </div>
                      <span className="text-white font-bold text-xl">{useCase}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 6: Key Benefits ── */}
        <section className="w-full relative flex items-center py-32 border-b border-white/5">
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
              <p className="text-[#FFCC00] font-bold uppercase tracking-widest text-sm mb-4">05 — Key Benefits</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 font-heading">
                Why Choose Byten
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-[#FFCC00]/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Check size={22} className="text-gray-900" />
                    </div>
                    <span className="text-white font-semibold text-xl">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 7: CTA ── */}
        <section className="w-full relative flex items-center py-40 overflow-hidden">
          {/* Animated glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFCC00]/10 rounded-full blur-[120px] pointer-events-none"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#FFCC00] font-bold uppercase tracking-widest text-sm mb-6">06 — Get Started</p>
              <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-heading leading-tight">
                Ready to<br />
                <span className="text-[#FFCC00]">Transform</span> Your<br />
                Operations?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Leverage precision drone intelligence to accelerate your business outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/#contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-3 bg-[#FFCC00] text-gray-900 px-10 py-5 rounded-2xl font-extrabold text-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {service.cta}
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300"
                >
                  Back to Home
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetail;
