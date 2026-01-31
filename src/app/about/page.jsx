// src/app/about/page.js
import React from 'react';
import { SITE } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Landmark, Target, Award, Users, TrendingUp, Handshake } from 'lucide-react'; // Icons for values

// SEO Metadata for About Page
export const metadata = {
  title: "About Us",
  description: "Learn about Vṛddhi Real Estate - Dehradun's trusted property consultants. 15+ years of experience in residential, commercial properties, plots & villas.",
  keywords: ["about Vṛddhi Real Estate", "Dehradun real estate company", "property consultants Dehradun", "trusted property dealers"],
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* 1. Hero Section */}
      <div className="bg-blue-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-4 rounded-full shadow-lg">
              <Landmark className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About {SITE.title}
          </h1>
          <p className="text-xl text-slate-300 mb-0">
            Defining Luxury Real Estate in Dehradun
          </p>
        </div>
      </div>

      {/* 2. Our Story & Mission Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://placehold.co/600x400/F8F9FA/1B263B?text=Our+Story" // Placeholder image related to company history/location
              alt={`${SITE.title} Office or Cityscape`}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Text Column */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-2 block">Our Journey</span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
              Forging a Path in Premier Real Estate
            </h2>
            <div className="space-y-4 text-slate-600">
              <p>
                Founded on the principles of integrity, expertise, and unparalleled client service, {SITE.title} emerged with a clear vision: to redefine the luxury real estate experience in Austin. We saw a need for a brokerage that not only possessed deep market knowledge but also operated with the discretion and dedication required by discerning clients.
              </p>
              <p>
                Our journey began over a decade ago, navigating the dynamic Austin market, from serene lakeside estates to sophisticated downtown penthouses. We have built our reputation not just on transactions, but on lasting relationships grounded in trust and exceptional results.
              </p>
              <h3 className="font-serif text-2xl font-semibold text-slate-900 pt-4 pb-2">
                Our Mission
              </h3>
              <p>
                <Target className="inline-block h-5 w-5 mr-2 text-amber-500" />
                To provide our clients with expert guidance, exclusive access, and a seamless experience in acquiring or selling the finest properties Austin has to offer. We strive to be more than agents; we aim to be trusted advisors, facilitating significant life investments with precision and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-200 hover:border-amber-500 transition-all hover:shadow-xl">
              <div className="inline-block p-3 bg-amber-500 rounded-lg shadow-md mb-4 ring-1 ring-amber-400/20">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Excellence</h3>
              <p className="text-slate-600 text-sm">
                We pursue the highest standards in every aspect of our service, from market analysis to negotiation and closing.
              </p>
            </div>
            {/* Value Card 2 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-200 hover:border-amber-500 transition-all hover:shadow-xl">
              <div className="inline-block p-3 bg-amber-500 rounded-lg shadow-md mb-4 ring-1 ring-amber-400/20">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Integrity</h3>
              <p className="text-slate-600 text-sm">
                Honesty and transparency are the foundations of our client relationships. We operate with unwavering ethical standards.
              </p>
            </div>
            {/* Value Card 3 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-slate-200 hover:border-amber-500 transition-all hover:shadow-xl">
              <div className="inline-block p-3 bg-amber-500 rounded-lg shadow-md mb-4 ring-1 ring-amber-400/20">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Expertise</h3>
              <p className="text-slate-600 text-sm">
                Our deep understanding of the Austin luxury market ensures informed decisions and optimal outcomes for our clients.
              </p>
            </div>
            {/* Add more value cards if needed */}
          </div>
        </div>
      </section>

      {/* 4. Meet the Team Teaser (Optional) */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-amber-500 shadow-lg mb-4 ring-1 ring-amber-400/20">
          <Users className="h-6 w-6 text-white" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
          Meet Our Experts
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-8">
          Our team comprises seasoned professionals dedicated to the Austin luxury market. Get to know the advisors committed to your success.
        </p>
        <Button asChild size="lg" className="bg-amber-500 text-white hover:bg-amber-600">
          <Link href="/agents">View Our Agents</Link>
        </Button>
      </section>

    </div>
  );
}
