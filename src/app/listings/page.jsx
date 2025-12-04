"use client";
import React, { useState, useEffect } from 'react';
import { Home, BedDouble, Bath, Maximize2, ArrowRight, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const PropertyCard = ({ property, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
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

      {/* Property Detail Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <X className="w-6 h-6 text-slate-900" />
            </button>

            {/* Property Image */}
            <div className="relative h-96">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.sold && (
                <div className="absolute top-4 left-4 bg-slate-900 text-white px-6 py-2 rounded-lg text-lg font-bold shadow-lg">
                  SOLD
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="p-8">
              {/* Title and Price */}
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-200">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h2>
                  <p className="text-lg text-slate-600 flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    {property.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 mb-1">Price</p>
                  <p className="text-3xl font-bold text-amber-500">₹{property.price.toLocaleString()}</p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <BedDouble className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900 mb-1">{property.bedrooms}</p>
                  <p className="text-sm text-slate-600">Bedrooms</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <Bath className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900 mb-1">{property.bathrooms}</p>
                  <p className="text-sm text-slate-600">Bathrooms</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <Maximize2 className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900 mb-1">{property.area}</p>
                  <p className="text-sm text-slate-600">Sq. Yards</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a 
                  href="/contact" 
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  Contact Us
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-4 border-2 border-slate-300 hover:border-slate-400 rounded-xl font-semibold text-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
      <div className="bg-blue-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-4 rounded-full shadow-lg">
              <Home className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Discover Inspiring Designed Homes</h1>
          <p className="text-xl text-slate-300 mb-0">
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