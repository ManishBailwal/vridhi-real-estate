// app/page.jsx

import { HeroSection } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { PopularLocalities } from "@/components/PopularLocalities";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section with Carousel */}
      <HeroSection />

      {/* 2. Featured Properties Section */}
      <FeaturedProperties />

      {/* 3. Featured Projects Section */}
      <FeaturedProjects />

      {/* 4. Popular Localities Section */}
      <PopularLocalities />

      {/* 5. Services Section */}
      <ServicesSection />

      {/* 6. About Section */}
      <AboutSection />

      {/* 7. Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}