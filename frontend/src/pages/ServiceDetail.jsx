import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Check, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollSequence from '../components/ScrollSequence';

const serviceData = {
  surveying: {
    title: "Surveying",
    subtitle: "3D Land Mapping, Drones, DGPS",
    hero: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200",
    description: "Precision geospatial data capture through advanced 3D land mapping, drone technology, and DGPS control points. We deliver millimeter-accurate surveys for infrastructure projects, land development, and site planning with cutting-edge aerial and ground-based mapping solutions.",
    capabilities: [
      {
        title: "3D Land Mapping",
        description: "High-resolution 3D terrain models with centimeter-level accuracy for comprehensive site analysis and planning."
      },
      {
        title: "Drone Technology",
        description: "Advanced UAV fleet equipped with precision sensors for rapid data capture across large areas."
      },
      {
        title: "DGPS Control Points",
        description: "Differential GPS technology ensuring survey-grade precision and georeferencing accuracy."
      },
      {
        title: "Topographic Surveys",
        description: "Detailed elevation mapping and contour generation for engineering and construction projects."
      }
    ],
    features: [
      "0.3cm Survey Precision",
      "Rapid Deployment & Data Capture",
      "Large Area Coverage",
      "Real-Time Processing",
      "CAD-Ready Deliverables",
      "Multi-Sensor Integration"
    ],
    applications: [
      "Infrastructure Development",
      "Land Development Planning",
      "Mining Volume Calculation",
      "Construction Site Monitoring",
      "Agricultural Land Assessment"
    ]
  },
  inspection: {
    title: "Inspection",
    subtitle: "Thermal, Power Grid, Construction Sites, Factories",
    hero: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200",
    description: "Comprehensive inspection services including thermal imaging, power grid monitoring, construction site analysis, and factory assessments. Our advanced inspection technology identifies issues before they become critical, ensuring safety and operational efficiency across all industrial applications.",
    capabilities: [
      {
        title: "Thermal Imaging",
        description: "Advanced infrared cameras detect heat anomalies, electrical faults, and insulation issues invisible to the naked eye."
      },
      {
        title: "Power Grid Monitoring",
        description: "Continuous monitoring of transmission lines, substations, and electrical infrastructure for preventive maintenance."
      },
      {
        title: "Construction Site Analysis",
        description: "Progress tracking, safety inspections, and quality assurance throughout the construction lifecycle."
      },
      {
        title: "Factory Assessments",
        description: "Comprehensive facility inspections including equipment health, structural integrity, and compliance verification."
      }
    ],
    features: [
      "Thermal Detection",
      "High-Resolution Imagery",
      "Automated Anomaly Detection",
      "Predictive Maintenance Insights",
      "Compliance Reporting",
      "24/7 Monitoring Capability"
    ],
    applications: [
      "Power Grid Maintenance",
      "Solar Farm Inspections",
      "Industrial Equipment Health",
      "Building Envelope Analysis",
      "Pipeline Integrity Checks"
    ]
  },
  videography: {
    title: "Videography",
    subtitle: "Infrastructure Mapping, Site Security",
    hero: "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=1200",
    description: "Professional aerial and ground videography for infrastructure mapping, site security monitoring, and project documentation. Our high-resolution video capture provides real-time surveillance and comprehensive visual records for construction progress tracking and security applications.",
    capabilities: [
      {
        title: "Infrastructure Mapping",
        description: "Dynamic video documentation of roads, bridges, utilities, and urban infrastructure for asset management."
      },
      {
        title: "Site Security",
        description: "Real-time aerial surveillance and perimeter monitoring for enhanced security and incident response."
      },
      {
        title: "Progress Documentation",
        description: "Time-lapse and periodic video capture tracking construction milestones and project evolution."
      },
      {
        title: "4K/8K Video Production",
        description: "Ultra-high-resolution video capture for detailed analysis and professional presentations."
      }
    ],
    features: [
      "4K/8K Resolution",
      "Real-Time Streaming",
      "360° Panoramic Video",
      "Time-Lapse Sequences",
      "Night Vision Capability",
      "Multi-Angle Coverage"
    ],
    applications: [
      "Construction Progress Tracking",
      "Site Security Monitoring",
      "Marketing & Promotional Content",
      "Incident Documentation",
      "Infrastructure Assessment"
    ]
  },
  "digital-twin-creation": {
    title: "Digital Twin Creation",
    subtitle: "LiDAR 3D Building Scanning",
    hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    description: "Advanced LiDAR 3D building scanning technology that creates precise digital replicas of your infrastructure. Used extensively in construction monitoring and maintenance, our digital twin solutions enable real-time 3D visualization, predictive analytics, and lifecycle management of physical assets.",
    capabilities: [
      {
        title: "LiDAR 3D Scanning",
        description: "Laser-based scanning technology capturing millions of points per second for ultra-precise 3D models."
      },
      {
        title: "Construction Monitoring",
        description: "Track construction progress against BIM models with automated clash detection and variance analysis."
      },
      {
        title: "Maintenance Planning",
        description: "Digital asset registers with condition assessment data for predictive maintenance strategies."
      },
      {
        title: "As-Built Documentation",
        description: "Accurate as-built models for facility management, renovations, and future planning."
      }
    ],
    features: [
      "Millimeter Accuracy",
      "Point Cloud Processing",
      "BIM Integration",
      "Real-Time Visualization",
      "Cloud-Based Access",
      "Version Control & History"
    ],
    applications: [
      "Smart Building Management",
      "Infrastructure Asset Management",
      "Historical Preservation",
      "Renovation Planning",
      "Facility Operations"
    ]
  }
};

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const service = serviceData[serviceName];

  const containerRef = useRef(null);
  
  // Create native horizontal scroll tracking
  const { scrollXProgress } = useScroll({ container: containerRef });

  useEffect(() => {
    // Reset window scroll
    window.scrollTo(0, 0);

    // Map vertical mouse wheel events to horizontal scrolling
    const element = containerRef.current;
    
    const handleWheel = (e) => {
      if (element && e.deltaY !== 0) {
        // Prevent default vertical scrolling of the body
        e.preventDefault();
        // Scroll horizontally by the delta length
        element.scrollLeft += e.deltaY;
      }
    };

    if (element) {
      // Must use passive: false to allow preventDefault
      element.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
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
      {/* Fixed Navbar so it stays on top while we scroll "horizontally" */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <Navbar />
      </div>

      {/* The Native Horizontal Scroll Container */}
      <div 
        ref={containerRef} 
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        
        {/* Panel 1: Hero Section */}
        <section className="w-screen h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center pt-20 snap-center">
          <div className="absolute inset-0">
            <img 
              src={service.hero} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A111A]/80 to-[#0A111A]/40" />
          </div>
          
          <div className="relative z-10 w-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.button
                onClick={() => navigate('/')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group mb-8 shadow-lg hover:shadow-xl transition-shadow"
                type="button"
              >
                <div
                  className="bg-[#FFCC00] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    height="25px"
                    width="25px"
                  >
                    <path
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                      fill="#000000"
                    ></path>
                    <path
                      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                      fill="#000000"
                    ></path>
                  </svg>
                </div>
                <p className="translate-x-2 relative z-20 group-hover:text-black transition-colors duration-500">Go Back</p>
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                  {service.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
                  {service.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Panel 2: Description Section */}
        <section className="w-screen h-screen flex-shrink-0 bg-transparent backdrop-blur-md flex items-center justify-center overflow-y-auto pt-20 snap-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
              Overview
            </h2>
            <p className="text-2xl text-white leading-relaxed max-w-4xl font-medium drop-shadow-sm">
              {service.description}
            </p>
          </div>
        </section>

        {/* Panel 3: Capabilities */}
        <section className="w-screen h-screen flex-shrink-0 bg-transparent backdrop-blur-md border-x border-white/20 flex items-center justify-center overflow-y-auto pt-20 snap-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-sm">
              Core Capabilities
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {service.capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="bg-black/20 backdrop-blur-lg border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center flex-shrink-0">
                      <Zap size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {capability.title}
                      </h3>
                      <p className="text-gray-200 leading-relaxed font-medium">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Panel 4: Features & Applications */}
        <section className="w-screen h-screen flex-shrink-0 bg-transparent backdrop-blur-sm flex items-center justify-center overflow-y-auto pt-20 snap-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Features */}
              <div>
                <h3 className="text-4xl font-bold text-white mb-8 drop-shadow-sm">
                  Key Features
                </h3>
                <div className="space-y-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 bg-black/30 p-4 rounded-xl shadow-sm border border-white/40">
                      <div className="w-8 h-8 rounded-full bg-[#FFCC00] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Check size={18} className="text-white" />
                      </div>
                      <span className="text-xl text-white font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h3 className="text-4xl font-bold text-white mb-8 drop-shadow-sm">
                  Applications
                </h3>
                <div className="space-y-6">
                  {service.applications.map((application, index) => (
                    <div key={index} className="flex items-center gap-4 bg-black/30 p-4 rounded-xl shadow-sm border border-white/40">
                      <div className="w-8 h-8 rounded-full bg-[#0A111A] flex items-center justify-center flex-shrink-0 shadow-md">
                        <Check size={18} className="text-[#FFCC00]" />
                      </div>
                      <span className="text-xl text-white font-semibold">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 5: CTA Section */}
        <section className="w-screen h-screen flex-shrink-0 bg-gradient-to-r from-[#0A111A]/90 to-[#1A2130]/90 backdrop-blur-md flex items-center justify-center pt-20 snap-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Let's discuss how our {service.title.toLowerCase()} services can benefit your project
            </p>
            <motion.button
              onClick={() => navigate('/#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FFCC00] text-white px-12 py-5 rounded-2xl font-bold text-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Request a Consultation
            </motion.button>
          </div>
        </section>

        {/* Panel 6: Footer Section */}
        <section className="w-screen h-screen flex-shrink-0 bg-black/10 backdrop-blur-md flex flex-col justify-end snap-center">
          <div className="w-full relative z-10 w-full overflow-y-auto">
            {/* Center the footer content visually by adding padding or margin if needed */}
            <div className="h-full flex flex-col justify-center">
               <Footer />
            </div>
          </div>
        </section>

      </div>

      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetail;
