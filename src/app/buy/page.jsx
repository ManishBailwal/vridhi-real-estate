import React from 'react';
import { Building2, Search, Home, Key } from 'lucide-react';

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-blue-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-4 rounded-full shadow-lg">
              <Home className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Buy Your Dream Home</h1>
          <p className="text-xl text-slate-300 mb-0">
            Find the perfect property that matches your lifestyle and budget. We have a wide range of residential and commercial properties available for sale.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Search className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Search Properties</h3>
              <p className="text-slate-600">Browse through our extensive collection of properties using our advanced search filters.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Building2 className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Schedule Visits</h3>
              <p className="text-slate-600">Book appointments to visit properties that interest you at your convenience.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Key className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Close the Deal</h3>
              <p className="text-slate-600">Our experts will guide you through the paperwork and legal processes to secure your new home.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
