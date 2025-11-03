// components/AboutSection.jsx
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/constants';

export function AboutSection() {
  const features = [
    'Expert Consultation',
    'Legal Compliance',
    'Transparent Deals',
    'Market Insights',
    'Complete Documentation',
    'After-Sales Support',
  ];

  return (
    <section className="py-16 md:py-28 bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* CONTENT (left on large screens) */}
          <div className="lg:col-span-6">
            <div className="max-w-xl">
              <h3 className="text-sm font-medium uppercase tracking-widest text-amber-600 mb-3">Who we are</h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                Building trust, delivering value — <span className="text-amber-500">{SITE.title}</span>
              </h2>

              <p className="text-lg text-slate-600 mb-6">
                We're a premium real estate firm based in Dehradun focused on honest deals, thorough documentation and excellent after-sales care. We guide clients from search to ownership with clarity and professionalism.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex-1 min-w-[140px] bg-white/80 backdrop-blur rounded-xl p-4 shadow-md border border-slate-100">
                  <div className="text-2xl font-extrabold text-slate-900">1.2K+</div>
                  <div className="text-sm text-slate-500">Properties handled</div>
                </div>

                <div className="flex-1 min-w-[140px] bg-white/80 backdrop-blur rounded-xl p-4 shadow-md border border-slate-100">
                  <div className="text-2xl font-extrabold text-slate-900">98%</div>
                  <div className="text-sm text-slate-500">Client satisfaction</div>
                </div>

                <div className="flex-1 min-w-[140px] bg-white/80 backdrop-blur rounded-xl p-4 shadow-md border border-slate-100">
                  <div className="text-2xl font-extrabold text-slate-900">15 yrs</div>
                  <div className="text-sm text-slate-500">Market experience</div>
                </div>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-slate-100"
                  >
                    <div className="p-2 rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-medium text-slate-800">{f}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:-translate-y-0.5">
                  Get a Consultation
                </Link>

                <Link href="/listings" className="inline-flex items-center px-5 py-3 border border-slate-200 text-slate-700 rounded-lg bg-white hover:shadow-md">
                  View Listings
                </Link>
              </div>
            </div>
          </div>

          {/* VISUAL (right on large screens) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1400&h=1000&fit=crop"
                alt={`${SITE.title} - premium property`}
                className="w-full h-[520px] object-cover"
                width={1400}
                height={1000}
              />

              {/* soft gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

              {/* floating glass card */}
              <div className="absolute left-6 bottom-6 max-w-xs bg-white/70 backdrop-blur rounded-2xl p-4 shadow-2xl border border-white/60">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold shadow-md">VR</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Premium Support</div>
                    <div className="text-xs text-slate-600">Dedicated manager for every client</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-slate-700">From</div>
                  <div className="text-lg font-extrabold text-amber-500">₹ 45L+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}