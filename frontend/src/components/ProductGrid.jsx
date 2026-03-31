import React from 'react';
import { products } from '../mock/mockData';
import { Building2, Zap, Map, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const iconMap = {
  Building2: Building2,
  Zap: Zap,
  Map: Map
};

const ProductGrid = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A111A] mb-4">
            Comprehensive Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            End-to-end geospatial intelligence platform designed for enterprise-scale operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const IconComponent = iconMap[product.icon];
            return (
              <Card 
                key={product.id}
                className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-none overflow-hidden group"
              >
                <div className="h-2 bg-gradient-to-r from-[#FFCC00] to-[#FFD633]"></div>
                <CardHeader>
                  <div className="bg-[#0A111A] text-white w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FFCC00] transition-colors duration-300">
                    <IconComponent size={32} className="group-hover:text-[#0A111A]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#0A111A] mb-2">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-[#FFCC00] mr-3 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
