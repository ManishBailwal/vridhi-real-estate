// app/page.jsx
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/Hero";
import Slider from "@/components/Slider";

// Lazy-load below-the-fold sections.
const FeaturedProperties = dynamic(
  () =>
    import("@/components/FeaturedProperties").then(
      (mod) => mod.FeaturedProperties
    ),
  { loading: () => <SectionLoader /> }
);

const PopularLocalities = dynamic(
  () =>
    import("@/components/PopularLocalities").then(
      (mod) => mod.PopularLocalities
    ),
  { loading: () => <SectionLoader /> }
);

const ServicesSection = dynamic(
  () =>
    import("@/components/ServicesSection").then(
      (mod) => mod.ServicesSection
    ),
  { loading: () => <SectionLoader /> }
);

const AboutSection = dynamic(
  () =>
    import("@/components/AboutSection").then(
      (mod) => mod.AboutSection
    ),
  { loading: () => <SectionLoader /> }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection
    ),
  { loading: () => <SectionLoader /> }
);

function SectionLoader() {
  return (
    <div
      className="flex items-center justify-center py-20"
      aria-label="Loading section"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Critical content */}
      <HeroSection />
      <Slider />

      {/* Property listings */}
      <FeaturedProperties />

      {/* Below-the-fold sections */}
      <PopularLocalities />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
    </main>
  );
}