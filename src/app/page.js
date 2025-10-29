// app/page.jsx

import { HeroSection } from "@/components/Hero"; // Corrected import name to match Hero.jsx
import { PropertyCard } from "@/components/PropertyCard";

// This data would normally come from your CMS or API
const featuredProperties = [
  {
    slug: "serenity-residential-home",
    imageUrl: "https://placehold.co/400x250/0D1B2A/ffffff?text=Luxury+Home", // Placeholder Image 1
    title: "Serenity Residential Home",
    address: "15 S Aurora Ave, Miami",
    price: 570000,
    bedrooms: 4,
    bathrooms: 3,
    area: 120,
  },
  {
    slug: "mountain-view-villa",
    imageUrl: "https://placehold.co/400x250/1B263B/ffffff?text=Mountain+Villa", // Placeholder Image 2
    title: "Mountain View Villa",
    address: "18 S Aurora Ave, Miami",
    price: 575000,
    bedrooms: 5,
    bathrooms: 2,
    area: 150,
  },
  {
    slug: "modern-luxe-apartment",
    imageUrl: "https://placehold.co/400x250/C0A062/0D1B2A?text=Luxe+Apt", // Placeholder Image 3
    title: "Modern Luxe Apartment",
    address: "20 S Aurora Ave, Miami",
    price: 580000,
    bedrooms: 3,
    bathrooms: 4,
    area: 180,
  },
  // Add more properties if needed
];


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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {/* Map through the properties and render a card for each */}
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.slug} property={prop} />
          ))}
        </div>
      </main>
    </>
  );
}

