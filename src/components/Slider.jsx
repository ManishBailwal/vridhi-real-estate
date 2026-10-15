"use client";

import React from 'react';

const Slider = () => {
  const images = [
   
    '/slider/2.jpeg',
    '/slider/3.jpeg',
  ];

  return (
    <div className="relative overflow-hidden bg-gray-100 py-12">
      <div className="flex animate-marquee">
        {/* First set of images */}
        {images.map((src, index) => (
          <div key={`first-${index}`} className="flex-shrink-0 mx-4">
            <img
              src={src}
              alt={`Slider image ${index + 1}`}
              className="h-64 w-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((src, index) => (
          <div key={`second-${index}`} className="flex-shrink-0 mx-4">
            <img
              src={src}
              alt={`Slider image ${index + 1}`}
              className="h-64 w-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Slider;
