// components/PopularLocalities.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const localities = [
  {
    id: 1,
    name: "Selakui, Dehradun",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    name: "Selaqui, Dehradun",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    name: "Pondha, Dehradun",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    name: "Prem Nagar, Dehradun",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    name: "Sahaspur, Dehradun",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    name: "Rajpur Road, Dehradun",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop"
  }
];

export function PopularLocalities() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const next = () => setCurrentIndex((prev) => (prev + itemsPerView >= localities.length ? 0 : prev + 1));
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? Math.max(localities.length - itemsPerView, 0) : prev - 1));

  const visible = localities.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-tr from-sky-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Popular Localities</h2>
            <div className="h-1 w-32 bg-amber-500 rounded-full mt-3"></div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={prev} aria-label="Previous" className="p-2 rounded-full bg-amber-500 hover:bg-amber-600 shadow transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={next} aria-label="Next" className="p-2 rounded-full bg-amber-500 hover:bg-amber-600 shadow transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((loc) => (
            <article key={loc.id} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{loc.name}</h3>
                  <p className="text-sm text-slate-200">Explore properties &amp; trends</p>
                </div>

                <Link href="/listings" className="bg-amber-500 hover:bg-amber-600 text-white rounded-md px-3 py-2 flex items-center gap-2 shadow hover:translate-x-1 transition-all">
                  Explore
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-amber-500 transition-all duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}