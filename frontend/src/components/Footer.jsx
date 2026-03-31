import React from 'react';
import { footerSections, socialLinks, companyInfo } from '../mock/mockData';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const iconMap = {
  Linkedin: Linkedin,
  Twitter: Twitter,
  Facebook: Facebook,
  Instagram: Instagram
};

const Footer = () => {
  return (
    <footer className="bg-[#FFCC00] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-[#0A111A] font-bold text-lg mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-[#0A111A] hover:text-[#1A2130] transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#0A111A]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img 
                src={companyInfo.logo} 
                alt={companyInfo.name}
                className="h-12 mb-2"
              />
              <p className="text-[#0A111A] text-sm font-medium">
                {companyInfo.tagline}
              </p>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0A111A] text-white p-3 rounded-full hover:bg-[#1A2130] transition-colors duration-200"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#0A111A] text-sm">
              © 2026 {companyInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
