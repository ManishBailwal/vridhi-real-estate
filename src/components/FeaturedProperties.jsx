// components/FeaturedProperties.jsx
"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "./PropertyCard";
import { Home, ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(false);

        const querySnapshot = await getDocs(
          collection(db, "properties")
        );

        const allProperties = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            slug: data.slug || doc.id,
            ...data,
            image:
              data.imageUrl ||
              data.image ||
              data.images?.[0] ||
              "",
          };
        });

        const featuredProperties = allProperties
          .filter((property) => {
            const isFeatured =
              property.featured === true ||
              property.featured === "true";

            const isSold =
              property.sold === true ||
              property.sold === "true";

            return isFeatured && !isSold;
          })
          .sort((a, b) => {
            const getTimestamp = (date) => {
              if (!date) return 0;

              // Handle Firestore Timestamp objects.
              if (typeof date.toMillis === "function") {
                return date.toMillis();
              }

              // Handle JavaScript Date objects and date strings.
              const timestamp = new Date(date).getTime();

              return Number.isNaN(timestamp) ? 0 : timestamp;
            };

            return (
              getTimestamp(b.createdAt) -
              getTimestamp(a.createdAt)
            );
          })
          .slice(0, 6);

        if (isMounted) {
          setProperties(featuredProperties);
        }
      } catch (err) {
        console.error(
          "Error fetching featured properties:",
          err
        );

        if (isMounted) {
          setError(true);
          setProperties([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  // Hide the section if there are no featured properties.
  if (!loading && properties.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-14 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 flex justify-center">
            <div className="rounded-xl bg-amber-500 p-3 shadow-md ring-1 ring-amber-400/20">
              <Home className="h-6 w-6 text-white" />
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            <span className="text-slate-900">Featured</span>{" "}
            <span className="text-amber-500">Properties</span>
          </h2>

          <div className="flex justify-center">
            <div className="h-1 w-24 rounded-full bg-amber-500" />
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Explore our handpicked properties selected for
            their style, location, and value.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div
            className="flex items-center justify-center py-16"
            role="status"
            aria-label="Loading featured properties"
          >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-slate-600">
              Featured properties are temporarily unavailable.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Properties Grid */}
            <div className="mb-10 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="w-full min-w-0 max-w-md"
                >
                  <PropertyCard
                    property={property}
                  />
                </div>
              ))}
            </div>

            {/* View All Properties */}
            <div className="text-center">
              <a
                href="/listings"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 sm:px-9 sm:text-base"
              >
                View All Properties
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}