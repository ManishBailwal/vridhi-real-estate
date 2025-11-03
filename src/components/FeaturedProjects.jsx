// components/FeaturedProjects.jsx
"use client";

import { Home, MapPin, IndianRupee, Maximize2, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    title: "JP Supermarket",
    type: "Commercial Lands /Inst. Land",
    area: "150 - 3000 Sq. Yards",
    price: "₹90 Lac - 18 Cr.",
    location: "Selaqui, Dehradun"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    title: "Nanda Enclave",
    type: "Residential Plot",
    area: "100 Sq. Yards",
    price: "₹15 Lac",
    location: "Prem Nagar, Dehradun"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    title: "RV Estate Reyansh Green",
    type: "Residential Plot",
    area: "150 Sq. Yards",
    price: "₹43.50 Lac",
    location: "Pondha, Dehradun"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    title: "Garhwal Enclave",
    type: "Residential Plot",
    area: "100 Sq. Yards",
    price: "₹12.50 Lac",
    location: "Shimla Bypass, Dehradun"
  }
];

export function FeaturedProjects() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="p-3 bg-amber-500 rounded-lg shadow-lg ring-1 ring-amber-400/20">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-slate-900">Featured</span>{' '}
              <span className="text-amber-500">Projects</span>
            </h2>
            <div className="h-1 w-32 bg-amber-500 rounded-full mt-4 mx-auto md:mx-0"></div>
          </div>

          <div className="mt-6 md:mt-0">
            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold shadow hover:scale-[1.02] transition-all">
              View All Projects
            </button>
          </div>
        </div>

        {/* Projects Grid - cards styled like listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((p) => (
            <article key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-56 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-md font-semibold text-sm shadow-md">{p.type}</div>
                <div className="absolute top-4 right-4 bg-white/90 text-slate-900 px-3 py-1 rounded-md font-semibold text-sm">{p.price}</div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{p.title}</h3>

                <div className="text-sm text-slate-600 space-y-2 mb-4">
                  <p className="flex items-center gap-2"><Maximize2 className="w-4 h-4" /> <span className="font-semibold text-slate-900">Area:</span> {p.area}</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> <span className="font-semibold text-slate-900">Location:</span> {p.location}</p>
                </div>

                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary-foreground rounded-md font-medium hover:opacity-95">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-primary">Enquire</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}