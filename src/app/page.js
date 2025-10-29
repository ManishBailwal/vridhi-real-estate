// app/page.jsx

import { HeroSection } from "@/components/Hero"; // Import HeroSection (assuming Hero.jsx exists)
import { PropertyCard } from "@/components/PropertyCard";
import { TestimonialCard } from "@/components/TestimonialCard"; // Import TestimonialCard
import { ServicesSection } from "@/components/ServicesSection"; // Import ServicesSection
import { Button } from "@/components/ui/button"; // Keep Button import for "View All"
// Import Carousel components
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// --- Data ---

// Featured Properties Data
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

// Testimonials Data (Needed again for mapping)
const testimonials = [
  {
    quote: "Working with Premium Realty was seamless. They understood our needs perfectly and found us our ideal home faster than we expected.",
    name: "Sarah & Tom Jenkins",
    location: "Austin, TX"
  },
  {
    quote: "Their market knowledge is unparalleled. They secured an excellent price for our property with utmost professionalism.",
    name: "Michael Chen",
    location: "Investor"
  },
  {
    quote: "From start to finish, the experience was first-class. Highly recommend for anyone in the luxury market.",
    name: "Eleanor Vance",
    location: "Westlake Resident"
  },
  {
    quote: "The attention to detail and personalized service made all the difference. A truly premium experience.",
    name: "David Rodriguez",
    location: "Downtown Austin"
  }
];

// --- Component ---

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* Wrap sections in a main tag with spacing */}
      <main className="container mx-auto px-4 py-16 space-y-16 md:space-y-24">

        {/* 2. Featured Properties Section */}
        <section>
          <h2 className="mb-8 text-center text-3xl font-bold text-primary font-serif">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.slug} property={prop} />
            ))}
          </div>
          <div className="mt-8 text-center">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
                View All Listings
              </Button>
            </div>
        </section>

        {/* 3. Services Section - Using the component */}
        <ServicesSection />

        {/* 4. Testimonials Section - Using TestimonialCard */}
        <section>
          <h2 className="mb-10 text-center text-3xl font-bold text-primary font-serif">
            What Our Clients Say
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto" // Centered and limited width
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  {/* Use the TestimonialCard component */}
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-[-50px] hidden sm:flex" /> {/* Position controls outside */}
            <CarouselNext className="mr-[-50px] hidden sm:flex" />
          </Carousel>
        </section>

      </main>
    </>
  );
}

