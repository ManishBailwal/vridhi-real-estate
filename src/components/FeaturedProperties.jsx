// components/FeaturedProperties.jsx
"use client";

import { useState, useEffect } from 'react';
import { PropertyCard } from './PropertyCard';
import { Home } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch all properties and filter featured ones client-side to avoid index requirement
        const querySnapshot = await getDocs(collection(db, 'properties'));
        const allProperties = querySnapshot.docs.map(doc => ({
          id: doc.id,
          slug: doc.id,
          ...doc.data()
        }));
        
        // Filter and sort client-side - check both boolean true and string "true"
        const featuredProps = allProperties
          .filter(p => p.featured === true || p.featured === 'true')
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA; // Sort descending (newest first)
          })
          .slice(0, 6); // Limit to 6
        
        setProperties(featuredProps);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Don't render the section at all if there are no featured properties
  if (!loading && properties.length === 0) {
    return null;
  }

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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <a href="/listings" className="inline-block px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                View All Properties
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}