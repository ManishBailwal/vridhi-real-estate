// components/Hero.jsx
"use client";

import { Search, MapPin, Home } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero_1.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-block mb-6 animate-fade-in">
              <span className="px-6 py-2 bg-white/90 backdrop-blur-sm text-slate-800 text-sm md:text-base font-semibold rounded-full shadow-xl">
                🏡 Premium Real Estate in Dehradun
              </span>
            </div>

            {/* Main Heading - SEO Optimized H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Your Trusted Real Estate
              <span className="block text-amber-400">Partner in Dehradun</span>
            </h1>

            {/* Subtitle - SEO Optimized */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-100 mb-12 max-w-3xl mx-auto animate-slide-up-delay">
              Find premium flats, villas, plots, and commercial properties across Dehradun's most desirable locations. At Vrddhi Real Estate, we help you discover homes and investments that truly match your lifestyle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up-delay">
              <a
                href="/listings"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Explore Properties
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-all"
              >
                Schedule a Site Visit
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 max-w-2xl mx-auto animate-fade-in-delay">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-sm md:text-base text-slate-200">Properties</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">200+</div>
                <div className="text-sm md:text-base text-slate-200">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-sm md:text-base text-slate-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}