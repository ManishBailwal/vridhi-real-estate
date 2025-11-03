// components/PropertyCard.jsx
"use client";

import { Home, BedDouble, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function PropertyCard({ property }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageSrc = property.image || property.imageUrl || property.imageUrl;

  return (
    <div 
      className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer max-w-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Sold Badge */}
        {property.sold && (
          <div className="absolute top-4 left-4 bg-slate-900 text-white px-4 py-1 rounded text-sm font-semibold shadow-lg">
            SOLD
          </div>
        )}

        {/* Navigation Arrow - appears on hover */}
        <div 
          className={`absolute top-1/2 right-6 -translate-y-1/2 bg-amber-500 rounded-full p-3 shadow-xl transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white p-6">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
          <span className="text-xl font-bold text-amber-500">₹{property.price?.toLocaleString?.() ?? property.price}</span>
        </div>

        {/* Address */}
        <p className="text-slate-600 mb-6">{property.address}</p>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          {/* Bedrooms */}
          <div className="flex flex-col items-start">
            <BedDouble className="w-5 h-5 text-slate-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">{property.bedrooms ?? '-'} Bedrooms</span>
          </div>

          {/* Bathrooms */}
          <div className="flex flex-col items-start">
            <Bath className="w-5 h-5 text-slate-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">{property.bathrooms ?? '-'} Bathrooms</span>
          </div>

          {/* Area */}
          <div className="flex flex-col items-start">
            <Maximize2 className="w-5 h-5 text-slate-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">{property.area ?? '-'}m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}