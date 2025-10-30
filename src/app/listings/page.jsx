"use client";
import React, { useState } from 'react';
import { Home, BedDouble, Bath, Maximize2, ArrowRight } from 'lucide-react';

const PropertyCard = ({ property, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property Image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Sold Badge */}
        {property.sold && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded text-sm font-semibold">
            SOLD
          </div>
        )}

        {/* Navigation Arrow - appears on hover */}
        <div 
          className={`absolute top-1/2 right-6 -translate-y-1/2 bg-white rounded-full p-4 shadow-xl transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <ArrowRight className="w-6 h-6 text-gray-800" />
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white p-6">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
          <span className="text-xl font-bold text-teal-500">₹{property.price.toLocaleString()}</span>
        </div>

        {/* Address */}
        <p className="text-gray-500 mb-6">{property.address}</p>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          {/* Bedrooms */}
          <div className="flex flex-col items-start">
            <BedDouble className="w-5 h-5 text-gray-600 mb-2" />
            <span className="text-sm font-semibold text-gray-900">{property.bedrooms} Bedrooms</span>
          </div>

          {/* Bathrooms */}
          <div className="flex flex-col items-start">
            <Bath className="w-5 h-5 text-gray-600 mb-2" />
            <span className="text-sm font-semibold text-gray-900">{property.bathrooms} Bathrooms</span>
          </div>

          {/* Area */}
          <div className="flex flex-col items-start">
            <Maximize2 className="w-5 h-5 text-gray-600 mb-2" />
            <span className="text-sm font-semibold text-gray-900">{property.area}m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyListingsPage = () => {
  const properties = [
    {
      id: 1,
      title: 'Serenity Residential Home',
      address: '15 S Aurora Ave, Miami',
      price: 570000,
      bedrooms: 4,
      bathrooms: 3,
      area: 120,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
      sold: true
    },
    {
      id: 2,
      title: 'Mountain View Villa',
      address: '18 S Aurora Ave, Miami',
      price: 575000,
      bedrooms: 5,
      bathrooms: 2,
      area: 150,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
      sold: false
    },
    {
      id: 3,
      title: 'Modern Luxe Apartment',
      address: '20 S Aurora Ave, Miami',
      price: 580000,
      bedrooms: 3,
      bathrooms: 4,
      area: 180,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      sold: false
    },
    {
      id: 4,
      title: 'Contemporary Villa',
      address: '22 S Aurora Ave, Miami',
      price: 620000,
      bedrooms: 4,
      bathrooms: 3,
      area: 140,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      sold: false
    },
    {
      id: 5,
      title: 'Elegant Estate',
      address: '25 S Aurora Ave, Miami',
      price: 750000,
      bedrooms: 6,
      bathrooms: 5,
      area: 220,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      sold: false
    },
    {
      id: 6,
      title: 'Urban Penthouse',
      address: '30 S Aurora Ave, Miami',
      price: 890000,
      bedrooms: 3,
      bathrooms: 3,
      area: 160,
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=800&fit=crop',
      sold: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-teal-500 rounded-lg p-3">
              <Home className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span className="text-gray-600 font-medium">Properties</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover inspiring designed homes.
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.
          </p>
        </div>
      </div>

      {/* Property Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingsPage;