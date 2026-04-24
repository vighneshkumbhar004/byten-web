import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { fadeInUp } from "../utils/animations";

const fields = [
  { id: 1, name: "Infrastructure", description: "Roads, bridges, urban corridors, and large-scale construction projects.", image: "/assets/infrastructure.png" },
  { id: 2, name: "Oil & Gas", description: "Pipeline route surveys, corridor mapping, and safety zone delineation.", image: "/assets/oil-and-gas.png" },
  { id: 3, name: "Mining & Quarrying", description: "Open-pit mapping, volumetric analysis, and site topography for mining operations.", image: "/assets/mining.png" },
  { id: 4, name: "Defence", description: "Restricted area mapping and terrain analysis for strategic planning.", image: "/assets/defence.png" },
  { id: 5, name: "Transportation", description: "Railway surveys, road alignment studies, and transportation infrastructure mapping.", image: "/assets/transportation.png" },
  { id: 6, name: "Power Transmission", description: "High-voltage transmission line routing, inspection, and corridor surveys.", image: "https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?w=800" },
  { id: 7, name: "Renewable Energy", description: "Solar farm surveys, wind turbine inspections, and energy corridor mapping.", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800" },
  { id: 8, name: "Forest & Environment", description: "Multispectral forest inventory, canopy density, and vegetation health analysis.", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800" },
  { id: 9, name: "Aviation", description: "Airport area surveys, obstacle mapping, and airspace analysis.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800" },
  { id: 10, name: "Urban Development", description: "Smart city mapping, urban growth analysis, and municipal planning.", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800" },
  { id: 11, name: "Rural Governance", description: "Village boundary surveys, SVAMITVA, MGNREGA, and land record digitization.", image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800" }
];

const FieldsWeWorkUnder = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const duplicatedFields = [...fields, ...fields, ...fields];

  return (
    <section id="industries" className="py-20 bg-transparent overflow-hidden relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-sm font-heading">Industries We Serve</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-sans">Delivering survey-grade geospatial solutions across infrastructure, energy, and industrial sectors.</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />
          <div className="flex animate-infinite-scroll hover:pause-animation">
            {duplicatedFields.map((field, index) => (
              <motion.div key={`${field.id}-${index}`} whileHover={{ scale: 1.05, y: -5 }} className="relative flex-shrink-0 w-56 h-36 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group mx-3">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundImage: `url(${field.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="font-bold text-sm md:text-base text-white text-center drop-shadow-lg mb-1">{field.name}</h3>
                  {field.description && (<p className="text-white/80 text-[10px] text-center leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">{field.description}</p>)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FieldsWeWorkUnder;
