import React from 'react';
import { Settings, Shield, Wrench, FileText } from 'lucide-react';

export default function ManagePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-blue-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-4 rounded-full shadow-lg">
              <Settings className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Property Management</h1>
          <p className="text-xl text-slate-300 mb-0">
            Let us handle the complexities of managing your property. We offer comprehensive property management services for owners.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Shield className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tenant Screening</h3>
              <p className="text-slate-600">We conduct thorough background checks to find reliable and responsible tenants for your property.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Wrench className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Maintenance</h3>
              <p className="text-slate-600">Our team coordinates all maintenance and repairs, ensuring your property remains in top condition.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FileText className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Financial Reporting</h3>
              <p className="text-slate-600">Receive detailed monthly financial reports to keep track of your property's performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
