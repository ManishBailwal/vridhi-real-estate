// src/app/services/page.jsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Banknote, 
  Building2, 
  Briefcase, 
  Monitor, 
  Home, 
  Car, 
  Wallet, 
  Landmark,
  CheckCircle2
} from 'lucide-react';

// SEO Metadata for Services Page
export const metadata = {
  title: "Financial Services",
  description: "Explore our comprehensive financial services including Home Loans, Business Loans, Construction Financing, Vehicle Loans, Working Capital Loans, and more.",
  keywords: [
    "home loan Dehradun",
    "business loan",
    "construction financing",
    "vehicle loan",
    "working capital loan",
    "loan against property",
    "PMAY loan",
    "affordable housing loan"
  ],
};

// Service data based on the image
const services = [
  {
    icon: Banknote,
    title: "Structured Products",
    titleHighlight: "Structured",
    items: [
      "Structured Investment",
      "Debt Syndication"
    ]
  },
  {
    icon: Building2,
    title: "Construction Financing",
    titleHighlight: "Construction",
    items: [
      "Construction Financing",
      "Construction Equipment Finance"
    ]
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    titleHighlight: "Business",
    items: [
      "Overdraft Loan",
      "Machinery Loan",
      "MSME Loan",
      "Small Business Loan"
    ]
  },
  {
    icon: Monitor,
    title: "Equipment Finance and Leasing",
    titleHighlight: "Equipment Finance",
    items: [
      "Equipment Finance"
    ]
  },
  {
    icon: Home,
    title: "Home Loan",
    titleHighlight: "Home",
    items: [
      "Home Extension Loan",
      "Affordable Housing Loan",
      "PMAY",
      "Overdraft Loan",
      "Quick Cash",
      "Plot and Construction Loan",
      "Balance Transfer",
      "Home Loan Top Up"
    ]
  },
  {
    icon: Car,
    title: "Vehicle Loan",
    titleHighlight: "Vehicle",
    items: [
      "Used Car Loan",
      "Overdraft Loan",
      "Loan On Used Car"
    ]
  },
  {
    icon: Wallet,
    title: "Working Capital Loan",
    titleHighlight: "Working Capital",
    items: [
      "Channel Financing",
      "Invoice Discounting",
      "Purchase Order Funding",
      "Working Capital Demand Loan",
      "Sub Dealer Loan"
    ]
  },
  {
    icon: Landmark,
    title: "Loan Against Property",
    titleHighlight: "Loan Against",
    items: [
      "Loan Against Property Overdraft Facility",
      "Term Loans"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="bg-blue-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-4 rounded-full shadow-lg">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Financial Services
          </h1>
          <p className="text-xl text-slate-300 mb-0">
            Comprehensive financial solutions tailored to meet your diverse needs. From home loans to business financing, we've got you covered.
          </p>
        </div>
      </div>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-slate-900">Explore Our</span>{" "}
              <span className="text-amber-500">Services</span>
            </h2>
            <div className="flex justify-center mb-6">
              <div className="h-1 w-32 bg-amber-500 rounded-full"></div>
            </div>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              We offer a wide range of financial products and services to help you achieve your goals. Choose from our comprehensive suite of loan and financing options.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-amber-500 hover:-translate-y-2"
                >
                  {/* Icon */}
                  <div className="mb-6 inline-block p-4 bg-slate-100 rounded-lg group-hover:bg-amber-500 transition-colors duration-500">
                    <Icon className="w-10 h-10 text-slate-500 group-hover:text-white transition-colors duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                    <span className="text-amber-500">{service.titleHighlight}</span>{" "}
                    <span className="text-slate-900">{service.title.replace(service.titleHighlight, '').trim()}</span>
                  </h3>

                  {/* Items List */}
                  <ul className="space-y-3 mb-6">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Apply Now Button */}
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help Choosing the Right Service?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg mb-8">
            Our expert team is here to guide you through the process and help you find the perfect financial solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-500 text-white hover:bg-amber-600"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
