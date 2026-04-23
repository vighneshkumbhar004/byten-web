import React from 'react';
import { Zap, Camera, Brain, CheckCircle2 } from 'lucide-react';

const TechSection = () => {
  return (
    <section id="technology" className="py-24 bg-transparent relative overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24 items-center">

          {/* Top Left: Title Block */}
          <div className="pr-4 lg:pr-12">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span className="text-black font-bold uppercase tracking-wide text-xs">
                TECHNOLOGY EXCELLENCE
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1] font-heading">
              Premium Technology. <br />
              <span className="text-[#FFCC00]">Professional Results.</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-sans">
              Military-grade hardware meets enterprise-grade software.
              We deliver high-precision aerial intelligence built for industries that demand accuracy, speed, and reliability.
            </p>
          </div>

          {/* Top Right: Advanced UAVs */}
          <div className="flex flex-col sm:flex-row gap-8 items-center lg:items-start justify-end">
            <div className="flex-1 max-w-sm mt-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 font-heading">Drone-Based Survey & Mapping</h3>
              <p className="text-gray-300 mb-2 leading-relaxed font-sans">
                High-accuracy aerial surveys using drone-integrated DGPS systems. Capture large-scale terrain data, infrastructure layouts, and topographic details with speed and precision.
              </p>
              <ul className="space-y-3 mb-4">
                {['DGPS Integrated Mapping', 'High-Resolution Aerial Imaging', 'Large Area Coverage', 'Accurate Georeferenced Data'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-200 font-medium font-sans">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <p className="text-[#FFCC00] text-sm font-bold mt-4 font-sans italic">PRECISION AERIAL SURVEYING</p>
            </div>
            <div className="relative shrink-0 perspective-1000">
              <div className="w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative bg-blue-900">
                <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80" alt="Drone" className="w-full h-full object-cover opacity-90 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl shadow-black/10 border border-gray-100 font-sans">
                <div className="text-2xl font-bold text-gray-900 mb-1">50km <span className="text-sm font-normal text-gray-500">| RANGE</span></div>
                <div className="text-xs text-gray-600">Long-Range Operations – Autonomous Navigation</div>
              </div>
            </div>
          </div>

          {/* Bottom Left: LiDAR */}
          <div className="flex flex-col-reverse sm:flex-row gap-8 items-center lg:items-start">
            <div className="relative shrink-0">
              <div className="w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative shadow-pink-500/20 bg-pink-900">
                <img src="/LiDAR-Thermal.jpg" alt="LiDAR Thermal" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl shadow-black/10 border border-gray-100 font-sans">
                <div className="text-2xl font-bold text-gray-900 mb-1">0.3cm <span className="text-sm font-normal text-gray-500">| PRECISION</span></div>
                <div className="text-xs text-gray-600">Industrial-grade sensing</div>
              </div>
            </div>
            <div className="flex-1 max-w-sm mt-4 sm:ml-8">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 font-heading">LiDAR & Thermal Survey Solutions</h3>
              <p className="text-gray-300 mb-2 leading-relaxed font-sans">
                Capture terrain, structures, and hidden anomalies using LiDAR and thermal imaging. Generate accurate 3D models, detect faults, and analyze surface conditions efficiently.
              </p>
              <ul className="grid grid-cols-2 gap-3 mb-4">
                {['3D Point Cloud Generation', 'Thermal Inspection Analysis', 'Digital Surface & Terrain Models', 'High-Precision Data Capture'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-200 font-medium font-sans whitespace-nowrap">
                    <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#FFCC00] text-sm font-bold mt-4 font-sans italic">ADVANCED MAPPING TECHNOLOGY</p>
            </div>
          </div>

          {/* Bottom Right: AI Analytics */}
          <div className="flex flex-col sm:flex-row gap-8 items-center lg:items-start justify-end mt-12 lg:mt-0">
            <div className="flex-1 max-w-sm mt-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 font-heading">GIS & Data Analysis</h3>
              <p className="text-gray-300 mb-2 leading-relaxed font-sans">
                Transform raw survey data into actionable insights using GIS and spatial analysis. From mapping to decision support, we deliver structured, usable geospatial intelligence.
              </p>
              <ul className="grid grid-cols-2 gap-3 mb-4">
                {['Spatial Data Analysis', 'Mapping & Visualization', 'Data Processing & Integration', 'Decision Support Systems'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-200 font-medium font-sans whitespace-nowrap">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#FFCC00] text-sm font-bold mt-4 font-sans italic">GEOSPATIAL DATA PROCESSING</p>
            </div>
            <div className="relative shrink-0">
              <div className="w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative bg-orange-900">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" alt="Planet Earth Analytics" className="w-full h-full object-cover mix-blend-overlay opacity-90" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl shadow-black/10 border border-gray-100 font-sans">
                <div className="text-2xl font-bold text-gray-900 mb-1">99.7% <span className="text-sm font-normal text-gray-500">| ACCURACY</span></div>
                <div className="text-xs text-gray-600">Intelligent analytics</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechSection;
