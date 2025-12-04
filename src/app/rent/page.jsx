import React from 'react';
import { Key, Calendar, CheckCircle, Home } from 'lucide-react';

export default function RentPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-blue-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-4 rounded-full shadow-lg">
              <Key className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Rent a Property</h1>
          <p className="text-xl text-slate-300 mb-0">
            Looking for a place to rent? We offer a variety of rental properties including apartments, houses, and commercial spaces.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Home className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Find Rentals</h3>
              <p className="text-slate-600">Explore our rental listings to find a property that suits your needs and budget.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Calendar className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Flexible Terms</h3>
              <p className="text-slate-600">We offer flexible lease terms to accommodate your specific requirements.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <CheckCircle className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Listings</h3>
              <p className="text-slate-600">All our rental properties are verified to ensure quality and safety for our tenants.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
