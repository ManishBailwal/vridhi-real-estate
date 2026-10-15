"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  BedDouble,
  Bath,
  Maximize2,
  ArrowRight,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
    where,
} from "firebase/firestore";

import { Input } from "@/components/ui/input";

const PropertyCard = ({ property, showPrice = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasBedrooms =
    property.bedrooms !== null &&
    property.bedrooms !== undefined &&
    property.bedrooms > 0;

  const hasBathrooms =
    property.bathrooms !== null &&
    property.bathrooms !== undefined &&
    property.bathrooms > 0;

  // Support properties with either multiple images or a single image URL.
  const images =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images.filter(Boolean)
      : [property.image || property.imageUrl].filter(Boolean);

  const nextImage = (e) => {
    e.stopPropagation();

    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();

    if (images.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  const formattedPrice =
    property.price !== null &&
      property.price !== undefined &&
      property.price !== ""
      ? Number(property.price).toLocaleString("en-IN")
      : null;

  return (
    <>
      {/* Property Card */}
    <div
  className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer bg-white"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  onClick={() => {
    setCurrentImageIndex(0);
    setShowModal(true);
  }}
>
  {/* Property Image */}
  <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-100">
    {images.length > 0 ? (
      <img
        src={images[0]}
        alt={property.title || "Property"}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-slate-400">
        <Home className="w-12 h-12" />
      </div>
    )}

    {/* Image Count */}
    {images.length > 1 && (
      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-full text-xs">
        {images.length} photos
      </div>
    )}

    {/* Sold Badge */}
    {property.sold && (
      <div className="absolute top-3 left-3 bg-slate-900 text-white px-3 py-1 rounded text-xs font-semibold shadow-md">
        SOLD
      </div>
    )}

    {/* Featured Badge */}
    {property.featured && (
      <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-1 rounded text-xs font-semibold shadow-md">
        FEATURED
      </div>
    )}

    {/* Hover Arrow */}
    <div
      className={`absolute top-1/2 right-4 -translate-y-1/2 bg-amber-500 rounded-full p-3 shadow-lg transition-all duration-300 ${
        isHovered
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-4"
      }`}
    >
      <ArrowRight className="w-5 h-5 text-white" />
    </div>
  </div>

  {/* Property Details */}
  <div className="bg-white p-4">
    {/* Title */}
    <h3 className="w-full text-base font-semibold text-slate-900 break-words line-clamp-2 mb-2">
      {property.title || "Untitled Property"}
    </h3>

   {/* Property Type and Price */}
<div className="flex items-center justify-between gap-2 mb-3">
  {/* Property Type */}
  <div className="min-w-0">
    {property.propertyType && (
      <span className="inline-block max-w-full truncate rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-800">
        {property.propertyType}
      </span>
    )}
  </div>

  {/* Price */}
  <div className="shrink-0">
  {showPrice && formattedPrice ? (
    <span className="text-base font-bold text-blue-600">
      ₹{formattedPrice}
    </span>
  ) : (
    <span className="inline-block rounded-full bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-800">
      Contact for Price
    </span>
  )}
</div>
</div>

    {/* Address and Description */}
    {(property.address || property.description) && (
      <div className="border-t border-slate-200 pt-3 mb-3">
        {property.address && (
          <p className="flex items-center gap-1.5 text-sm text-slate-600 mb-2 line-clamp-1">
  <MapPin className="w-4 h-4 shrink-0 text-blue-500" />
  <span className="truncate">{property.address}</span>
</p>
        )}

        {property.description && (
          <p className="line-clamp-2 text-xs leading-5 text-slate-600">
            {property.description}
          </p>
        )}
      </div>
    )}

    {/* Property Features */}
    {(hasBedrooms ||
      hasBathrooms ||
      (property.area !== null &&
        property.area !== undefined &&
        property.area !== "")) && (
      <div
        className={`grid gap-2 pt-3 border-t border-slate-200 ${
          hasBedrooms && hasBathrooms
            ? "grid-cols-3"
            : hasBedrooms || hasBathrooms
              ? "grid-cols-2"
              : "grid-cols-1"
        }`}
      >
        {hasBedrooms && (
          <div className="flex flex-col items-start min-w-0">
            <BedDouble className="w-4 h-4 text-slate-500 mb-1" />
            <span className="text-xs font-medium text-slate-800">
              {property.bedrooms} Bedrooms
            </span>
          </div>
        )}

        {hasBathrooms && (
          <div className="flex flex-col items-start min-w-0">
            <Bath className="w-4 h-4 text-slate-500 mb-1" />
            <span className="text-xs font-medium text-slate-800">
              {property.bathrooms} Bathrooms
            </span>
          </div>
        )}

        {property.area !== null &&
          property.area !== undefined &&
          property.area !== "" && (
            <div className="flex flex-col items-start min-w-0">
              <Maximize2 className="w-4 h-4 text-slate-500 mb-1" />
              <span className="text-xs font-medium text-slate-800">
                {property.area} m²
              </span>
            </div>
          )}
      </div>
    )}
  </div>
</div>

      {/* Property Details Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Close property details"
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <X className="w-6 h-6 text-slate-900" />
            </button>

            {/* Main Property Image */}
            <div className="relative w-full h-64 sm:h-96 md:h-[500px] bg-slate-100 flex items-center justify-center">
              {images.length > 0 ? (
                <img
                  src={images[currentImageIndex]}
                  alt={property.title || "Property"}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-slate-500 flex flex-col items-center gap-3">
                  <Home className="w-16 h-16" />
                  <span>No image available</span>
                </div>
              )}

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-slate-900" />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                  >
                    <ChevronRight className="w-6 h-6 text-slate-900" />
                  </button>

                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}

              {/* Sold Badge */}
              {property.sold && (
                <div className="absolute top-4 left-4 bg-slate-900 text-white px-6 py-2 rounded-lg text-lg font-bold shadow-lg">
                  SOLD
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="px-4 sm:px-8 py-4 bg-slate-50 border-b">
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      type="button"
                      key={`${img}-${idx}`}
                      onClick={() => setCurrentImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex
                          ? "border-amber-500 scale-105"
                          : "border-slate-200 hover:border-slate-300"
                        }`}
                    >
                      <img
                        src={img}
                        alt={`Property image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="p-5 sm:p-8">
              {/* Title, Address and Price */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-200">
                <div className="min-w-0">
                  <h2 className="text-2xl sm:text-3xl  text-slate-900 mb-2 break-words">
                    {property.title || "Untitled Property"}
                  </h2>

                  {property.address && (
                    <p className="text-base sm:text-lg text-slate-600 flex items-start gap-2">
                      <Home className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span>{property.address}</span>
                    </p>
                  )}
                </div>

                <div className="sm:text-right flex-shrink-0">
                  <p className="text-sm text-slate-600 mb-1">
                    Price
                  </p>

                  {showPrice && formattedPrice ? (
                    <p className="text-2xl sm:text-3xl font-bold text-amber-500">
                      ₹{formattedPrice}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold text-slate-500">
                      Contact for Price
                    </p>
                  )}
                </div>
              </div>

              {/* Property Type and Transaction Type */}
{(property.propertyType || property.transactionType) && (
  <div className="flex  w-full flex-wrap items-center gap-3 mb-6">
    {property.propertyType && (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500">
          Type:
        </span>
        <span className="inline-flex rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-sm font-medium text-slate-800">
          {property.propertyType}
        </span>
      </div>
    )}

    {property.transactionType && (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500">
          Transaction:
        </span>
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
          {property.transactionType}
        </span>
      </div>
    )}
  </div>
)}

              {/* Property Description */}
              {property.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Property Description
                  </h3>

                  <p className="mt-2 whitespace-pre-line break-words text-sm sm:text-base leading-7 text-slate-600">
                    {property.description}
                  </p>
                </div>
              )}

             

              {/* Features Grid */}
              <div
                className={`grid grid-cols-1 gap-4 sm:gap-6 mb-8 ${hasBedrooms && hasBathrooms
                    ? "sm:grid-cols-3"
                    : hasBedrooms || hasBathrooms
                      ? "sm:grid-cols-2"
                      : "sm:grid-cols-1"
                  }`}
              >
                {/* Bedrooms */}
                {hasBedrooms && (
                  <div className="bg-slate-50 rounded-xl p-5 sm:p-6 text-center">
                    <BedDouble className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-slate-900 mb-1">
                      {property.bedrooms}
                    </p>
                    <p className="text-sm text-slate-600">Bedrooms</p>
                  </div>
                )}

                {/* Bathrooms */}
                {hasBathrooms && (
                  <div className="bg-slate-50 rounded-xl p-5 sm:p-6 text-center">
                    <Bath className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-slate-900 mb-1">
                      {property.bathrooms}
                    </p>
                    <p className="text-sm text-slate-600">Bathrooms</p>
                  </div>
                )}

                {/* Area */}
                {property.area !== null &&
                  property.area !== undefined &&
                  property.area !== "" && (
                    <div className="bg-slate-50 rounded-xl p-5 sm:p-6 text-center">
                      <Maximize2 className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-slate-900 mb-1">
                        {property.area}
                      </p>
                      <p className="text-sm text-slate-600">Area</p>
                    </div>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  Contact Us
                </a>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-4 border-2 border-slate-300 hover:border-slate-400 rounded-xl font-semibold text-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PropertyListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesQuery = query(
          collection(db, "properties"),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(propertiesQuery);

        const propertiesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
            // Support both imageUrl and images.
            image: data.imageUrl || data.image || data.images?.[0] || "",
          };
        });

        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Search by title, address, city, state, property type and description.
  const searchLower = searchTerm.trim().toLowerCase();

  const filteredProperties = properties.filter((property) => {
    if (!searchLower) return true;

    const searchableFields = [
      property.title,
      property.address,
      property.city,
      property.state,
      property.propertyType,
      property.description,
    ];

    return searchableFields.some((field) =>
      String(field ?? "").toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-500 p-4 rounded-full shadow-lg">
              <Home className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Inspiring Designed Homes
          </h1>

          <p className="text-xl text-slate-300 mb-8">
            Experience elegance and comfort with our exclusive luxury villas,
            designed for sophisticated living.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

              <Input
                type="text"
                placeholder="Search by title, location, property type, or description..."
                className="w-full pl-12 pr-4 py-6 text-lg rounded-full shadow-lg border-transparent focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Home className="w-12 h-12 text-slate-300 mx-auto mb-4" />

            <p className="text-slate-600 text-lg">
              {searchTerm
                ? "No properties found matching your search."
                : "No properties available at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingsPage;