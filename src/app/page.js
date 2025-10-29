// app/page.jsx

import { HeroSection } from "@/components/HeroSection";
import { PropertyCard } from "@/components/PropertyCard";

// ... (Your featuredProperties array) ...

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Properties Section */}
      <main className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-primary font-serif">
          Featured Properties
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* ... (Your .map() for PropertyCards) ... */}
        </div>
      </main>
    </>
  );
}