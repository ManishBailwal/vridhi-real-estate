// components/FeaturedProperties.jsx
import { PropertyCard } from './PropertyCard';
import { Home } from 'lucide-react';

const featuredProperties = [
  {
    slug: "agricultural-farm-land",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    title: "150 Sq. Yards Agricultural/Farm Land For Sale In Pondha, Dehradun",
    address: "Pondha, Dehradun",
    price: 4275000,
    area: 150,
  },
  {
    slug: "mdda-approved-plot",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    title: "MDDA APPROVED RESIDENTIAL PLOT",
    address: "Pondha, Dehradun",
    price: 5700000,
    area: 200,
  },
  {
    slug: "residential-plot-prem-nagar",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    title: "150 Sq. Yards Residential Plot For Sale In Prem Nagar, Dehradun",
    address: "Prem Nagar, Dehradun",
    price: 2250000,
    area: 150,
  },
  {
    slug: "villa-sahaspur",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    title: "Luxury Villa in Sahaspur",
    address: "Sahaspur, Dehradun",
    price: 8500000,
    area: 250,
  },
  {
    slug: "apartment-selaqui",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    title: "Modern Apartment Complex",
    address: "Selaqui, Dehradun",
    price: 6500000,
    area: 180,
  },
  {
    slug: "commercial-land",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    title: "Premium Commercial Land",
    address: "Rajpur Road, Dehradun",
    price: 12500000,
    area: 300,
  }
];

export function FeaturedProperties() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-500 rounded-lg shadow-lg ring-1 ring-amber-400/20">
              <Home className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Title with Underline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-900">Featured</span>{" "}
            <span className="text-amber-500">Properties</span>
          </h2>
          <div className="flex justify-center">
            <div className="h-1 w-32 bg-amber-500 rounded-full"></div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}