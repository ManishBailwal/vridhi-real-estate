'use client'

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
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

// // SEO Metadata for Services Page
// export const metadata = {
//   title: "Financial Services",
//   description: "Explore our comprehensive financial services including Home Loans, Business Loans, Construction Financing, Vehicle Loans, Working Capital Loans, and more.",
//   keywords: [
//     "home loan Dehradun",
//     "business loan",
//     "construction financing",
//     "vehicle loan",
//     "working capital loan",
//     "loan against property",
//     "PMAY loan",
//     "affordable housing loan"
//   ],
// };

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

  const [expandedIndex, setExpandedIndex] = useState(null); 

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
        <p className="text-xl text-slate-300">
          Comprehensive financial solutions tailored to meet your diverse needs.
        </p>
      </div>
    </div>

    {/* Services Section */}
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-900">Explore Our</span>{" "}
            <span className="text-amber-500">Financial Services</span>
          </h2>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-32 bg-amber-500 rounded-full"></div>
          </div>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            Choose from our comprehensive suite of loan and financing options.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedIndex === index;

            const visibleItems = isExpanded
              ? service.items
              : service.items.slice(0, 3);

            return (
              <div
                key={index}
                className="group flex flex-col justify-between bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-amber-400 hover:-translate-y-2"
              >
                {/* TOP */}
                <div>
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-amber-500 transition-all duration-500">
                    <Icon className="w-7 h-7 text-blue-900 group-hover:text-white transition-colors duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4">
                    <span className="text-amber-500">{service.titleHighlight}</span>{" "}
                    <span className="text-slate-900">
                      {service.title.replace(service.titleHighlight, '').trim()}
                    </span>
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-[2px] bg-amber-500 mb-4"></div>

                  {/* Items */}
                  <ul className="space-y-3 mb-6">
                    {visibleItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BOTTOM */}
                <div>
                  {!isExpanded && service.items.length > 3 ? (
                    <button
                      onClick={() => setExpandedIndex(index)}
                      className="text-amber-500 font-semibold hover:underline"
                    >
                      Read More →
                    </button>
                  ) : (
                    <Button
                      asChild
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                    >
                      <Link href="/contact">Apply Now</Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Need Help Choosing the Right Service?
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg mb-8">
          Our expert team is here to guide you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-amber-500 text-white hover:bg-amber-600">
            <Link href="/contact">Contact Us</Link>
          </Button>

          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);
}
