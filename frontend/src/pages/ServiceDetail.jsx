import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { Check, Zap, FileText, Layers, Target, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const serviceData = {
  surveying: {
    title: "Precision Drone Surveying & Mapping",
    subtitle: "Delivering survey-grade geospatial data with centimeter-level accuracy using UAVs, LiDAR, and RTK systems.",
    hero: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200",
    overview: "Delivering survey-grade geospatial data using UAV photogrammetry, RTK/PPK positioning, and DGPS control points. Our workflows ensure accurate terrain modeling, measurement, and site intelligence for infrastructure, land development, and engineering projects.",
    capabilities: [
      "Orthomosaic Mapping",
      "DSM / DEM Generation",
      "Contour & Elevation Mapping",
      "Volume Calculation",
      "Ground Control Point Integration"
    ],
    deliverables: [
      "Orthomosaic Maps (2D)",
      "Digital Elevation Models (DEM/DTM)",
      "Contour Maps & Topographic Data",
      "3D Terrain Models",
      "GIS & CAD Ready Files"
    ],
    useCases: [
      "Land Acquisition & Planning",
      "Highway & Railway Projects",
      "Mining Volume Analysis",
      "Smart City Development"
    ],
    benefits: [
      "5x Faster than traditional surveys",
      "Millimeter-level precision",
      "Reduced manpower & cost",
      "Real-time data processing"
    ],
    cta: "Start Your Survey Project"
  },
  inspection: {
    title: "Advanced Drone Inspection Solutions",
    subtitle: "AI-powered aerial inspections for energy, infrastructure, and industrial assets.",
    hero: "/Inspection.jpg",
    overview: "Delivering high-precision UAV-based inspections for solar plants, power lines, industrial facilities, and construction sites. Our workflows enable safe, fast, and accurate assessment of critical assets without operational disruption.",
    capabilities: [
      "Thermal Inspection for Solar Panels (Hotspot Detection)",
      "Power Line & Transmission Monitoring",
      "Industrial Equipment Inspection",
      "Construction Site Progress & Safety Monitoring",
      "Fault Detection & Preventive Maintenance"
    ],
    deliverables: [
      "Thermal Heatmaps & Reports",
      "Defect Detection Reports",
      "Geo-tagged Issue Mapping",
      "Predictive Maintenance Insights"
    ],
    useCases: [
      "Solar Plant Optimization",
      "Power Grid Maintenance",
      "Factory Safety Monitoring",
      "Infrastructure Health Assessment"
    ],
    benefits: [
      "Early fault detection",
      "Reduced downtime",
      "Improved safety compliance",
      "Cost-efficient maintenance"
    ],
    cta: "Schedule an Inspection"
  },
  videography: {
    title: "Aerial Videography & Visual Intelligence",
    subtitle: "Cinematic drone visuals combined with technical insights for enterprises and government.",
    hero: "/Videography.jpg",
    overview: "Delivering high-resolution aerial and ground videography for infrastructure monitoring, project documentation, security surveillance, and official reporting. Designed for organisations that require clear, reliable, and scalable visual insights.",
    capabilities: [
      "Infrastructure & Construction Progress Monitoring",
      "Government Project Documentation",
      "Site Surveillance & Security Monitoring",
      "Corporate & Industrial Coverage",
      "Time-Lapse & Periodic Project Tracking"
    ],
    deliverables: [
      "Promotional Videos",
      "Project Walkthroughs",
      "Progress Monitoring Footage",
      "Interactive Virtual Tours"
    ],
    useCases: [
      "Real Estate Marketing",
      "Corporate Branding",
      "Government Projects",
      "Construction Progress Tracking"
    ],
    benefits: [
      "High-impact visual storytelling",
      "Remote project visibility",
      "Marketing-ready content",
      "Enhanced stakeholder communication"
    ],
    cta: "Create Your Aerial Story"
  },
  "digital-twin-creation": {
    title: "Digital Twin & 3D Modeling Solutions",
    subtitle: "Transform real-world assets into intelligent, interactive digital environments.",
    hero: "/Digital-Twin.jpg",
    overview: "Creating accurate digital replicas of physical assets using LiDAR, photogrammetry, and high-precision sensor data. Our digital twin solutions enable detailed visualisation, measurement, and monitoring of infrastructure across its lifecycle. Using advanced sensors and UAV-based data capture, we generate high-fidelity 3D models that support planning, inspection, and maintenance workflows for complex environments.",
    capabilities: [
      "LiDAR-Based 3D Scanning",
      "High-Density Point Cloud Generation",
      "3D Mesh & Model Creation",
      "As-Built Documentation",
      "Infrastructure Lifecycle Monitoring"
    ],
    deliverables: [
      "Dense Point Clouds (LAS/LAZ)",
      "3D Mesh Models",
      "BIM-Compatible Files",
      "Interactive Digital Twins"
    ],
    useCases: [
      "Smart Cities",
      "Infrastructure Management",
      "Industrial Plants",
      "Construction Lifecycle Tracking"
    ],
    benefits: [
      "Real-time asset monitoring",
      "Improved planning & simulation",
      "Reduced operational risks",
      "Data-driven decision making"
    ],
    cta: "Build Your Digital Twin"
  }
};

// Panel indicator dots
const PanelIndicator = ({ total, current }) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === current ? 'bg-[#FFCC00] w-6' : 'bg-white/40'
        }`}
      />
    ))}
  </div>
);

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const service = serviceData[serviceName];
  const containerRef = useRef(null);
  const [currentPanel, setCurrentPanel] = React.useState(0);
  const totalPanels = 7; // Hero, Overview, Capabilities, Deliverables, Use Cases, Benefits, CTA

  const { scrollXProgress } = useScroll({ container: containerRef });

  useEffect(() => {
    window.scrollTo(0, 0);
    const element = containerRef.current;

    const handleWheel = (e) => {
      if (element && e.deltaY !== 0) {
        e.preventDefault();
        element.scrollLeft += e.deltaY;
      }
    };

    const handleScroll = () => {
      if (element) {
        const panel = Math.round(element.scrollLeft / window.innerWidth);
        setCurrentPanel(panel);
      }
    };

    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      element.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
    <div className="bg-transparent text-gray-100 h-screen w-screen overflow-hidden relative font-sans">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <Navbar />
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FFCC00] origin-left z-[60]"
        style={{ scaleX: scrollXProgress }}
      />

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >

        {/* ── PANEL 1: Hero ── */}
        <section className="w-screen h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center pt-20 snap-center">
          <div className="absolute inset-0">
            <img
              src={service.hero}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A111A]/85 via-[#0A111A]/60 to-transparent" />
          </div>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              {/* Back button */}
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
                  Scroll to explore →
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PANEL 2: Overview ── */}
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center pt-20 snap-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A111A]/70 to-[#1a2233]/80 backdrop-blur-sm" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[#FFCC00] font-bold uppercase tracking-widest text-sm mb-4">01 — Overview</p>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-10 font-heading leading-tight">
                What We Do
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium border-l-4 border-[#FFCC00] pl-8">
                {service.overview}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 3: Capabilities ── */}
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center pt-20 snap-center overflow-y-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A111A]/75 to-[#111827]/80 backdrop-blur-sm" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-start gap-4 hover:border-[#FFCC00]/50 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Zap size={20} className="text-white" />
                    </div>
                    <p className="text-white font-semibold text-lg leading-snug">{cap}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 4: Deliverables ── */}
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center pt-20 snap-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/80 to-[#0A111A]/75 backdrop-blur-sm" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:border-[#FFCC00]/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFCC00]/20 border border-[#FFCC00]/50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFCC00] transition-colors duration-300">
                      <FileText size={18} className="text-[#FFCC00] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-white font-semibold text-xl">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 5: Use Cases ── */}
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center pt-20 snap-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A111A]/80 to-[#1a2233]/75 backdrop-blur-sm" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:border-[#FFCC00]/50 hover:bg-white/15 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FFCC00]/20 border border-[#FFCC00]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFCC00] transition-colors duration-300">
                        <Layers size={18} className="text-[#FFCC00] group-hover:text-white transition-colors duration-300" />
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
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center pt-20 snap-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/80 to-[#0A111A]/80 backdrop-blur-sm" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:border-[#FFCC00]/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Check size={22} className="text-white" />
                    </div>
                    <span className="text-white font-semibold text-xl">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PANEL 7: CTA ── */}
        <section className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center pt-20 snap-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A111A]/90 to-[#1a2233]/90 backdrop-blur-md" />
          {/* Animated glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFCC00]/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                  className="inline-flex items-center gap-3 bg-[#FFCC00] text-gray-900 px-10 py-5 rounded-2xl font-extrabold text-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {service.cta}
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white/10 border border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300"
                >
                  Back to Home
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>

      {/* Panel indicator */}
      <PanelIndicator total={totalPanels} current={currentPanel} />

      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetail;
