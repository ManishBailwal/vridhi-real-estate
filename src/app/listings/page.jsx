// src/app/listings/page.js
// Removed "use client" as filters/sorting/pagination are removed for now

import React from 'react';
import { PropertyCard } from "@/components/PropertyCard";
// Removed imports for Button, Input, Checkbox, Slider, Accordion, Pagination, DropdownMenu, icons

// --- Placeholder Data ---
// In a real app, this would come from an API/CMS
const allProperties = [
  // Keeping the sample data
  { slug: "serenity-residential-home", imageUrl: "https://placehold.co/400x250/0D1B2A/ffffff?text=Luxury+Home+1", title: "Serenity Residential Home", address: "15 S Aurora Ave, Miami", price: 570000, bedrooms: 4, bathrooms: 3, area: 120, type: 'Residential' },
  { slug: "mountain-view-villa", imageUrl: "https://placehold.co/400x250/1B263B/ffffff?text=Mountain+Villa", title: "Mountain View Villa", address: "18 S Aurora Ave, Miami", price: 575000, bedrooms: 5, bathrooms: 2, area: 150, type: 'Residential' },
  { slug: "modern-luxe-apartment", imageUrl: "https://placehold.co/400x250/C0A062/0D1B2A?text=Luxe+Apt+3", title: "Modern Luxe Apartment", address: "20 S Aurora Ave, Miami", price: 580000, bedrooms: 3, bathrooms: 4, area: 180, type: 'Residential' },
  { slug: "skyline-luxe-apartment", imageUrl: "https://placehold.co/400x250/cccccc/ffffff?text=Skyline+Apt", title: "Skyline Luxe Apartment", address: "55 Bayview Drive, San Francisco", price: 610000, bedrooms: 2, bathrooms: 2, area: 100, type: 'Residential' },
  { slug: "royal-orchid-villa", imageUrl: "https://placehold.co/400x250/eeeeee/ffffff?text=Orchid+Villa", title: "Royal Orchid Villa", address: "12 Emerald Heights, Los Angeles", price: 590000, bedrooms: 6, bathrooms: 3, area: 200, type: 'Residential' },
  { slug: "grand-vista-office", imageUrl: "https://placehold.co/400x250/dddddd/ffffff?text=Grand+Office", title: "Grand Vista Office", address: "25 Skyline Boulevard, San Diego", price: 710000, bedrooms: 2, bathrooms: 1, area: 90, type: 'Commercial' },
  { slug: "coastal-plot", imageUrl: "https://placehold.co/400x250/bbbbbb/ffffff?text=Coastal+Plot", title: "Coastal View Plot", address: "Seaside Ln, Malibu", price: 1200000, bedrooms: 0, bathrooms: 0, area: 500, type: 'Plot' },
  // Add more...
];

// Removed pagination state and logic

export default function ListingsPage() {

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header - Matches screenshot */}
      <div className="mb-10 text-center">
        {/* Optional: Add small icon above 'Properties' if desired */}
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">Properties</span>
        <h1 className="mt-2 font-serif text-4xl font-bold text-primary md:text-5xl">
          Discover inspiring designed homes. {/* Adjusted text slightly */}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Experience elegance and comfort with our exclusive luxury listings.
        </p>
      </div>

      {/* Simplified Layout - Just the Grid */}
      <div> {/* Removed the flex container for sidebar */}
        {/* Property Listings Grid */}
        <div> {/* Removed width constraints */}
          {/* Removed Sorting Dropdown */}

          {/* Grid - Adjusted grid columns for better match to screenshot density */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {/* Display all properties for now, pagination removed */}
            {allProperties.map((prop) => (
              <PropertyCard key={prop.slug} property={prop} />
            ))}
          </div>

          {/* Removed Pagination */}
        </div>
      </div>
    </div>
  );
}
