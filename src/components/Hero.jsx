// components/Hero.jsx
"use client";

import { Search, MapPin, Home } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-64px)] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-block mb-6 animate-fade-in">
              <span className="px-6 py-2 backdrop-blur-sm text-white text-sm md:text-base font-semibold rounded-full shadow-xl">
                🏡 Premium Real Estate in Dehradun
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Find Your Dream
              <span className="block text-amber-400">Property Today</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto animate-slide-up-delay">
              Discover the perfect residential plots, villas, and apartments in Dehradun's most sought-after locations
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto animate-fade-in-delay">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-sm md:text-base text-slate-300">Properties</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">200+</div>
                <div className="text-sm md:text-base text-slate-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-sm md:text-base text-slate-300">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-white rounded-full"></div>
        </div>
      </div> */}

      {/* City Skyline SVG Decoration */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
        <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
          <path fill="white" d="M0,50 L50,50 L50,20 L100,20 L100,50 L150,50 L150,10 L200,10 L200,50 L250,50 L250,30 L300,30 L300,50 L1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div> */}
    </section>
  );
}