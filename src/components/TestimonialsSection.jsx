// components/TestimonialsSection.jsx
"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Quote } from 'lucide-react';
import { SITE } from '@/lib/constants';

const testimonials = [
  {
    quote: `Working with ${SITE.title} was seamless. They understood our needs perfectly and found us our ideal property faster than we expected.`,
    name: 'Rajesh Kumar',
    location: 'Prem Nagar, Dehradun',
  },
  {
    quote: 'Their market knowledge is unparalleled. They secured an excellent price for our property with utmost professionalism.',
    name: 'Priya Sharma',
    location: 'Property Investor',
  },
  {
    quote: 'From start to finish, the experience was first-class. Highly recommend for anyone looking for property in Dehradun.',
    name: 'Amit Verma',
    location: 'Selaqui Resident',
  },
  {
    quote: 'The attention to detail and personalized service made all the difference. A truly premium experience from start to finish.',
    name: 'Neha Singh',
    location: 'Sahaspur, Dehradun',
  },
  {
    quote: 'Excellent support throughout the buying process. They made what seemed complex very simple and straightforward.',
    name: 'Vikram Patel',
    location: 'Pondha, Dehradun',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // compute visible slice with wrap-around
  const visible = [];
  for (let i = 0; i < itemsPerView; i++) {
    visible.push(testimonials[(currentIndex + i) % testimonials.length]);
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 shadow-lg mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Hear from our <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">clients</span>
          </h2>

          <div className="h-1 w-36 mx-auto rounded-full bg-gradient-to-r from-red-600 to-orange-500 mb-4" />

          <p className="text-slate-600 text-lg">Real experiences from people we've helped — transparent, professional, and lasting relationships.</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-xl hover:scale-105 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-slate-800" />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonials"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-xl hover:scale-105 transition-transform"
          >
            <ChevronRight className="w-6 h-6 text-slate-800" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visible.map((t, i) => (
              <figure
                key={currentIndex + '-' + i}
                className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100"
              >
                <div className="absolute -top-4 right-6 bg-gradient-to-tr from-red-600 to-orange-500 text-white p-3 rounded-xl shadow-md">
                  <Quote className="w-5 h-5" />
                </div>

                <blockquote className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>

                <figcaption className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-100 text-slate-800 font-semibold">
                    {t.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.location}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 transition-all rounded-full ${
                  idx === currentIndex ? 'w-8 bg-red-600' : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}