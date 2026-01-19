// app/page.jsx
import dynamic from 'next/dynamic';
import { HeroSection } from "@/components/Hero";

// Lazy load below-the-fold components for better LCP
// Remove ssr: false since we're in a Server Component
const FeaturedProperties = dynamic(() =>
  import("@/components/FeaturedProperties").then(mod => ({ default: mod.FeaturedProperties })),
  { loading: () => <SectionLoader /> }
);

const FeaturedProjects = dynamic(() =>
  import("@/components/FeaturedProjects").then(mod => ({ default: mod.FeaturedProjects })),
  { loading: () => <SectionLoader /> }
);

const PopularLocalities = dynamic(() =>
  import("@/components/PopularLocalities").then(mod => ({ default: mod.PopularLocalities })),
  { loading: () => <SectionLoader /> }
);

const ServicesSection = dynamic(() =>
  import("@/components/ServicesSection").then(mod => ({ default: mod.ServicesSection })),
  { loading: () => <SectionLoader /> }
);

const AboutSection = dynamic(() =>
  import("@/components/AboutSection").then(mod => ({ default: mod.AboutSection })),
  { loading: () => <SectionLoader /> }
);

const TestimonialsSection = dynamic(() =>
  import("@/components/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })),
  { loading: () => <SectionLoader /> }
);

// Minimal loading placeholder
function SectionLoader() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section - Critical, loaded immediately */}
      <HeroSection />

      {/* 2. Featured Properties Section - Lazy loaded */}
      <FeaturedProperties />

      {/* 3. Featured Projects Section - Lazy loaded */}
      <FeaturedProjects />

      {/* 4. Popular Localities Section - Lazy loaded */}
      <PopularLocalities />

      {/* 5. Services Section - Lazy loaded */}
      <ServicesSection />

      {/* 6. About Section - Lazy loaded */}
      <AboutSection />

      {/* 7. Testimonials Section - Lazy loaded */}
      <TestimonialsSection />
    </div>
  );
}