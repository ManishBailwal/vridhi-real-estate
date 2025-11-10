"use client";
import React, { useState, useEffect } from 'react';
import { Home, BedDouble, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

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
          <div className="absolute top-4 left-4 bg-slate-900 text-white px-4 py-1 rounded text-sm font-semibold shadow-lg">
            SOLD
          </div>
        )}

        {/* Navigation Arrow - appears on hover */}
        <div 
          className={`absolute top-1/2 right-6 -translate-y-1/2 bg-amber-500 rounded-full p-4 shadow-xl transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white p-6">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900">{property.title}</h3>
          <span className="text-xl font-bold text-amber-500">₹{property.price.toLocaleString()}</span>
        </div>

        {/* Address */}
        <p className="text-slate-600 mb-6">{property.address}</p>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          {/* Bedrooms */}
          <div className="flex flex-col items-start">
            <BedDouble className="w-5 h-5 text-slate-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">{property.bedrooms} Bedrooms</span>
          </div>

          {/* Bathrooms */}
          <div className="flex flex-col items-start">
            <Bath className="w-5 h-5 text-slate-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">{property.bathrooms} Bathrooms</span>
          </div>

          {/* Area */}
          <div className="flex flex-col items-start">
            <Maximize2 className="w-5 h-5 text-slate-600 mb-2" />
            <span className="text-sm font-semibold text-slate-900">{property.area}m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const propertiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          image: doc.data().imageUrl,
          ...doc.data()
        }));
        setProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-amber-500 rounded-lg p-3 shadow-lg ring-1 ring-amber-400/20">
              <Home className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-slate-600 font-medium">Properties</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Discover inspiring designed homes.
          </h1>

          {/* Subheading */}
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.
          </p>
        </div>
      </div>

      {/* Property Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">No properties available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingsPage;