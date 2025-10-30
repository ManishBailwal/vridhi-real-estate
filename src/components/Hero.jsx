// components/Hero.jsx
"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=800&fit=crop",
    title: "Residential Plot for Sale",
    subtitle: "in Prem Nagar, Dehradun",
    badge: "Premium Location"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=800&fit=crop",
    title: "Luxury Villa Estate",
    subtitle: "in Selaqui, Dehradun",
    badge: "Exclusive Property"
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=800&fit=crop",
    title: "Modern Apartment Complex",
    subtitle: "in Sahaspur, Dehradun",
    badge: "New Launch"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="inline-block mb-4 md:mb-6">
                  <span className="px-4 py-2 bg-red-600 text-white text-sm md:text-base font-semibold rounded-md">
                    {slide.badge}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-all transform hover:scale-105 shadow-lg">
                    View Details
                  </button>
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-md border-2 border-white/30 transition-all">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* City Skyline SVG Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
        <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
          <path fill="white" d="M0,50 L50,50 L50,20 L100,20 L100,50 L150,50 L150,10 L200,10 L200,50 L250,50 L250,30 L300,30 L300,50 L1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}