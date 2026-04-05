import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0A111A] mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-[#FFCC00] text-[#0A111A] px-6 py-3 rounded-xl font-bold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={service.hero} 
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A111A]/80 to-[#0A111A]/40" />
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.button
              onClick={() => navigate('/')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
              className="inline-flex items-center gap-2 text-white mb-8 hover:text-[#FFCC00] transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
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

      {/* Description */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 leading-relaxed max-w-4xl"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0A111A] mb-12 text-center"
          >
            Core Capabilities
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {service.capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center flex-shrink-0">
                    <Zap size={24} className="text-[#0A111A]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A111A] mb-3">
                      {capability.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-[#0A111A] mb-8">
                Key Features
              </h3>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FFCC00] flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-[#0A111A]" />
                    </div>
                    <span className="text-lg text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-[#0A111A] mb-8">
                Applications
              </h3>
              <div className="space-y-4">
                {service.applications.map((application, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0A111A] flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-[#FFCC00]" />
                    </div>
                    <span className="text-lg text-gray-700">{application}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0A111A] to-[#1A2130]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our {service.title.toLowerCase()} services can benefit your project
            </p>
            <motion.button
              onClick={() => navigate('/#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FFCC00] text-[#0A111A] px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Request a Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetail;
