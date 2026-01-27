// components/PropertyCard.jsx
"use client";

import { Home, BedDouble, Bath, Maximize2, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

export function PropertyCard({ property, showPrice = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const imageSrc = property.image || property.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';

  const hasBedrooms = property.bedrooms !== null && property.bedrooms !== undefined && property.bedrooms > 0;
  const hasBathrooms = property.bathrooms !== null && property.bathrooms !== undefined && property.bathrooms > 0;

  return (
    <>
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer max-w-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
      >
        {/* Property Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageSrc}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';
            }}
          />

          {/* Sold Badge */}
          {property.sold && (
            <div className="absolute top-4 left-4 bg-slate-900 text-white px-4 py-1 rounded text-sm font-semibold shadow-lg">
              SOLD
            </div>
          )}

          {/* Navigation Arrow - appears on hover */}
          <div
            className={`absolute top-1/2 right-6 -translate-y-1/2 bg-amber-500 rounded-full p-3 shadow-xl transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
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
            {showPrice && property.price ? (
              <span className="text-xl font-bold text-amber-500">₹{property.price?.toLocaleString?.() ?? property.price}</span>
            ) : (
              <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Contact for Price</span>
            )}
          </div>

          {/* Address */}
          <p className="text-slate-600 mb-6">{property.address}</p>

          {/* Property Features */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            {/* Bedrooms */}
            <div className="flex flex-col items-start">
              <BedDouble className="w-5 h-5 text-slate-600 mb-2" />
              <span className="text-sm font-semibold text-slate-900">
                {hasBedrooms ? `${property.bedrooms} Bedrooms` : '-'}
              </span>
            </div>

            {/* Bathrooms */}
            <div className="flex flex-col items-start">
              <Bath className="w-5 h-5 text-slate-600 mb-2" />
              <span className="text-sm font-semibold text-slate-900">
                {hasBathrooms ? `${property.bathrooms} Bathrooms` : '-'}
              </span>
            </div>

            {/* Area */}
            <div className="flex flex-col items-start">
              <Maximize2 className="w-5 h-5 text-slate-600 mb-2" />
              <span className="text-sm font-semibold text-slate-900">{property.area ?? '-'}m²</span>
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
                src={imageSrc}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';
                }}
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
                {showPrice && property.price ? (
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1">Price</p>
                    <p className="text-3xl font-bold text-amber-500">₹{property.price?.toLocaleString?.() ?? property.price}</p>
                  </div>
                ) : (
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1">Price</p>
                    <p className="text-lg font-semibold text-slate-500">Contact for Price</p>
                  </div>
                )}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <BedDouble className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900 mb-1">{hasBedrooms ? property.bedrooms : '-'}</p>
                  <p className="text-sm text-slate-600">Bedrooms</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <Bath className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900 mb-1">{hasBathrooms ? property.bathrooms : '-'}</p>
                  <p className="text-sm text-slate-600">Bathrooms</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <Maximize2 className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-slate-900 mb-1">{property.area ?? '-'}</p>
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
}