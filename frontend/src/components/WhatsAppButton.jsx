import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '917517211917';
  const message = 'Hello! I\'m interested in learning more about Byten Geomapping services.';

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
      title="Chat on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-7 h-7"
        fill="currentColor"
      >
        <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.978 0-7.51 6.11-13.618 13.618-13.618s13.618 6.107 13.618 13.618-6.108 13.618-13.618 13.618zM21.423 18.582c-0.205-0.103-1.207-0.596-1.393-0.663-0.187-0.067-0.323-0.103-0.458 0.103s-0.526 0.663-0.645 0.798c-0.118 0.137-0.236 0.154-0.441 0.052-0.203-0.103-0.858-0.317-1.634-1.007-0.604-0.537-1.011-1.201-1.13-1.407s-0.013-0.317 0.090-0.42c0.093-0.092 0.205-0.24 0.308-0.36s0.137-0.205 0.205-0.342c0.067-0.137 0.034-0.257-0.017-0.36s-0.458-1.103-0.627-1.511c-0.164-0.397-0.331-0.343-0.458-0.349-0.118-0.006-0.253-0.007-0.389-0.007s-0.356 0.050-0.542 0.257c-0.187 0.205-0.713 0.697-0.713 1.699s0.729 1.969 0.831 2.104c0.103 0.137 1.432 2.185 3.47 3.063 0.485 0.209 0.863 0.333 1.158 0.426 0.487 0.155 0.93 0.133 1.28 0.081 0.39-0.058 1.207-0.494 1.377-0.97s0.170-0.886 0.119-0.97c-0.052-0.085-0.187-0.137-0.39-0.24z" />
      </svg>

      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat on WhatsApp
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </motion.button>
  );
};

export default WhatsAppButton;