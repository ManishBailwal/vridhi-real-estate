import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Home, BriefcaseBusiness } from 'lucide-react'; // Icons for Services

// Services Data (Can be passed as props or defined here)
const services = [
  {
    icon: Home,
    title: "Buying Properties",
    description: "Find your dream luxury home with our exclusive listings and expert guidance.",
  },
  {
    icon: Handshake,
    title: "Selling Properties",
    description: "Maximize your property's value with our strategic marketing and negotiation skills.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Investment Advisory",
    description: "Navigate the premium real estate market with data-driven investment advice.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-12 bg-secondary rounded-lg"> {/* Added background and padding */}
      <div className="container mx-auto px-4">
         <h2 className="mb-10 text-center text-3xl font-bold text-primary font-serif">
           Our Expertise
         </h2>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
           {services.map((service, index) => (
             <Card key={index} className="text-center bg-background border-none shadow-none p-6"> {/* Simplified card style */}
               <CardHeader className="items-center pb-4">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                     <service.icon className="h-8 w-8" />
                  </div>
                 <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-muted-foreground">{service.description}</p>
               </CardContent>
             </Card>
           ))}
         </div>
      </div>
    </section>
  );
}
