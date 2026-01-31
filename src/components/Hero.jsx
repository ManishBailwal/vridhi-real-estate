// components/Hero.jsx
"use client";

import { useState, useEffect, useRef } from 'react';

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef(null);

  // Defer video loading until after initial render to improve LCP
  useEffect(() => {
    // Load video after a short delay to prioritize content rendering
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Placeholder Background - Shows immediately while video loads */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        aria-hidden="true"
      />

      {/* Background Video - Lazy loaded */}
      {shouldLoadVideo && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onLoadedData={handleVideoLoaded}
          >
            <source src="/hero_1.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Content - Always visible immediately */}
      <div className="relative h-full flex items-center pt-24 md:pt-16">
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
              Find premium flats, villas, plots, and commercial properties across Dehradun's most desirable locations. At Vṛddhi Real Estate, we help you discover homes and investments that truly match your lifestyle.
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