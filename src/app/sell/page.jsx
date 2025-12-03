import React from 'react';
import { DollarSign, TrendingUp, Users, Camera } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SellPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-4 rounded-full shadow-lg">
              <DollarSign className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Sell Your Property</h1>
          <p className="text-xl text-slate-300 mb-0">
            Get the best value for your property. List with us and reach thousands of potential buyers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8 text-left mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <TrendingUp className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Market Analysis</h3>
              <p className="text-slate-600">We provide accurate market analysis to help you price your property competitively.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Camera className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Professional Marketing</h3>
              <p className="text-slate-600">Showcase your property with high-quality photos and targeted marketing campaigns.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Users className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Negotiation</h3>
              <p className="text-slate-600">Our experienced agents will handle negotiations to ensure you get the best deal.</p>
            </div>
          </div>

          <Link href="/request-listing">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg">
              List Your Property Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
