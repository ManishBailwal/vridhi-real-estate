// src/app/about/page.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Landmark, Target, Award, Users, TrendingUp, Handshake } from 'lucide-react'; // Icons for values

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* 1. Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center text-center px-4">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url('https://placehold.co/1920x500/0D1B2A/ffffff?text=Our+Team')`, // Placeholder Office/Team Image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" /> {/* Dark Overlay */}
        </div>
        <div className="container mx-auto">
          <Landmark className="h-8 w-8 text-accent mx-auto mb-2" />
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
            About Premium Realty
          </h1>
          <p className="mt-4 text-lg text-gray-200 md:text-xl">
            Defining Luxury Real Estate in Austin
          </p>
        </div>
      </section>

      {/* 2. Our Story & Mission Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="overflow-hidden rounded-lg shadow-lg">
             <Image
                src="https://placehold.co/600x400/F8F9FA/1B263B?text=Our+Story" // Placeholder image related to company history/location
                alt="Premium Realty Office or Cityscape"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
          </div>
          {/* Text Column */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-2 block">Our Journey</span>
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              Forging a Path in Premier Real Estate
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded on the principles of integrity, expertise, and unparalleled client service, Premium Realty emerged with a clear vision: to redefine the luxury real estate experience in Austin. We saw a need for a brokerage that not only possessed deep market knowledge but also operated with the discretion and dedication required by discerning clients.
              </p>
              <p>
                Our journey began over a decade ago, navigating the dynamic Austin market, from serene lakeside estates to sophisticated downtown penthouses. We've built our reputation not just on transactions, but on lasting relationships grounded in trust and exceptional results.
              </p>
              <h3 className="font-serif text-2xl font-semibold text-primary pt-4 pb-2">
                Our Mission
              </h3>
              <p>
                <Target className="inline-block h-5 w-5 mr-2 text-accent" />
                To provide our clients with expert guidance, exclusive access, and a seamless experience in acquiring or selling the finest properties Austin has to offer. We strive to be more than agents; we aim to be trusted advisors, facilitating significant life investments with precision and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <Award className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Excellence</h3>
              <p className="text-muted-foreground text-sm">
                We pursue the highest standards in every aspect of our service, from market analysis to negotiation and closing.
              </p>
            </div>
            {/* Value Card 2 */}
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <Handshake className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Integrity</h3>
              <p className="text-muted-foreground text-sm">
                Honesty and transparency are the foundations of our client relationships. We operate with unwavering ethical standards.
              </p>
            </div>
            {/* Value Card 3 */}
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <TrendingUp className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Expertise</h3>
              <p className="text-muted-foreground text-sm">
                Our deep understanding of the Austin luxury market ensures informed decisions and optimal outcomes for our clients.
              </p>
            </div>
            {/* Add more value cards if needed */}
          </div>
        </div>
      </section>

       {/* 4. Meet the Team Teaser (Optional) */}
       <section className="container mx-auto px-4 py-16 md:py-24 text-center">
         <Users className="h-8 w-8 text-accent mx-auto mb-2" />
         <h2 className="font-serif text-3xl font-bold text-primary mb-4">
           Meet Our Experts
         </h2>
         <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
           Our team comprises seasoned professionals dedicated to Austin's luxury market. Get to know the advisors committed to your success.
         </p>
         <Button asChild size="lg" className="bg-accent text-primary-foreground hover:bg-accent/90">
           <Link href="/agents">View Our Agents</Link>
         </Button>
       </section>

    </div>
  );
}
