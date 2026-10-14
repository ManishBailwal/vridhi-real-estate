// components/PropertyCard.jsx
"use client";

import { useState } from "react";
import {
  Home,
  BedDouble,
  Bath,
  Maximize2,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop";

export function PropertyCard({ property, showPrice = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasBedrooms =
    property.bedrooms !== null &&
    property.bedrooms !== undefined &&
    property.bedrooms !== "" &&
    Number(property.bedrooms) > 0;

  const hasBathrooms =
    property.bathrooms !== null &&
    property.bathrooms !== undefined &&
    property.bathrooms !== "" &&
    Number(property.bathrooms) > 0;

  // Support multiple images and legacy single-image fields.
  const images = (
    Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : [property.image, property.imageUrl]
  ).filter(
    (image) => typeof image === "string" && image.trim() !== ""
  );

  const imageSrc = images[0] || FALLBACK_IMAGE;

  const hasArea =
    property.area !== null &&
    property.area !== undefined &&
    property.area !== "";

  const formattedPrice =
    property.price !== null &&
    property.price !== undefined &&
    property.price !== "" &&
    Number.isFinite(Number(property.price))
      ? Number(property.price).toLocaleString("en-IN")
      : null;

  const nextImage = (e) => {
    e.stopPropagation();

    if (images.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % images.length
      );
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

  const openModal = () => {
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  return (
    <>
      {/* Property Card */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
      >
        {/* Property Image */}
        <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-60">
          <img
            src={imageSrc}
            alt={property.title || "Property"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />

          {/* Image Count */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">
              {images.length} photos
            </div>
          )}

          {/* Sold Badge */}
          {property.sold && (
            <div className="absolute left-3 top-3 rounded bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-md">
              SOLD
            </div>
          )}

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute right-3 top-3 rounded bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow-md">
              FEATURED
            </div>
          )}

          {/* Hover Arrow */}
          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-amber-500 p-3 shadow-lg transition-all duration-300 ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
          >
            <ArrowRight className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white p-4">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 break-words text-base font-semibold text-slate-900">
            {property.title || "Untitled Property"}
          </h3>

          {/* Property Type and Price */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              {property.propertyType && (
                <span className="inline-block max-w-full truncate rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                  {property.propertyType}
                </span>
              )}
            </div>

            <div className="shrink-0">
              {showPrice && formattedPrice !== null ? (
                <span className="text-base font-bold text-blue-600">
                  ₹{formattedPrice}
                </span>
              ) : (
                <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
                  Contact for Price
                </span>
              )}
            </div>
          </div>

          {/* Address and Description */}
          {(property.address || property.description) && (
            <div className="mb-3 border-t border-slate-200 pt-3">
              {property.address && (
                <p className="mb-2 flex items-center gap-1.5 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 shrink-0 text-blue-500" />
                  <span className="truncate">
                    {property.address}
                  </span>
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
          {(hasBedrooms || hasBathrooms || hasArea) && (
            <div
              className={`grid gap-2 border-t border-slate-200 pt-3 ${
                hasBedrooms && hasBathrooms
                  ? "grid-cols-3"
                  : hasBedrooms || hasBathrooms
                    ? "grid-cols-2"
                    : "grid-cols-1"
              }`}
            >
              {hasBedrooms && (
                <div className="flex min-w-0 flex-col items-start">
                  <BedDouble className="mb-1 h-4 w-4 text-slate-500" />
                  <span className="text-xs font-medium text-slate-800">
                    {property.bedrooms} Bedrooms
                  </span>
                </div>
              )}

              {hasBathrooms && (
                <div className="flex min-w-0 flex-col items-start">
                  <Bath className="mb-1 h-4 w-4 text-slate-500" />
                  <span className="text-xs font-medium text-slate-800">
                    {property.bathrooms} Bathrooms
                  </span>
                </div>
              )}

              {hasArea && (
                <div className="flex min-w-0 flex-col items-start">
                  <Maximize2 className="mb-1 h-4 w-4 text-slate-500" />
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Close property details"
              className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
            >
              <X className="h-6 w-6 text-slate-900" />
            </button>

            {/* Main Property Image */}
            <div className="relative flex h-64 w-full items-center justify-center bg-slate-100 sm:h-96 md:h-[500px]">
              {images.length > 0 ? (
                <img
                  src={images[currentImageIndex] || FALLBACK_IMAGE}
                  alt={property.title || "Property"}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-slate-500">
                  <Home className="h-16 w-16" />
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
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
                  >
                    <ChevronLeft className="h-6 w-6 text-slate-900" />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-white"
                  >
                    <ChevronRight className="h-6 w-6 text-slate-900" />
                  </button>

                  <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}

              {/* Sold Badge */}
              {property.sold && (
                <div className="absolute left-4 top-4 rounded-lg bg-slate-900 px-5 py-2 text-base font-bold text-white shadow-lg">
                  SOLD
                </div>
              )}

              {/* Featured Badge */}
              {property.featured && (
                <div className="absolute left-4 top-16 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  FEATURED
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="border-b bg-slate-50 px-4 py-4 sm:px-8">
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      type="button"
                      key={`${img}-${idx}`}
                      onClick={() => setCurrentImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        idx === currentImageIndex
                          ? "scale-105 border-amber-500"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Property image ${idx + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="p-5 sm:p-8">
              {/* Title, Address and Price */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row">
                <div className="min-w-0">
                  <h2 className="mb-2 break-words text-2xl font-bold text-slate-900 sm:text-3xl">
                    {property.title || "Untitled Property"}
                  </h2>

                  {property.address && (
                    <p className="flex items-start gap-2 text-base text-slate-600 sm:text-lg">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-500" />
                      <span>{property.address}</span>
                    </p>
                  )}
                </div>

                <div className="shrink-0 sm:text-right">
                  <p className="mb-1 text-sm text-slate-600">Price</p>

                  {showPrice && formattedPrice !== null ? (
                    <p className="text-2xl font-bold text-blue-600 sm:text-3xl">
                      ₹{formattedPrice}
                    </p>
                  ) : (
                    <p className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800">
                      Contact for Price
                    </p>
                  )}
                </div>
              </div>

              {/* Property Type and Transaction Type */}
              {(property.propertyType || property.transactionType) && (
                <div className="mb-6 flex w-full flex-wrap items-center gap-3">
                  {property.propertyType && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-500">
                        Type:
                      </span>
                      <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800">
                        {property.propertyType}
                      </span>
                    </div>
                  )}

                  {property.transactionType && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-500">
                        Transaction:
                      </span>
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
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

                  <p className="mt-2 whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:text-base">
                    {property.description}
                  </p>
                </div>
              )}

              {/* Features Grid */}
              {(hasBedrooms || hasBathrooms || hasArea) && (
                <div
                  className={`mb-8 grid grid-cols-1 gap-4 sm:gap-6 ${
                    hasBedrooms && hasBathrooms
                      ? "sm:grid-cols-3"
                      : hasBedrooms || hasBathrooms
                        ? "sm:grid-cols-2"
                        : "sm:grid-cols-1"
                  }`}
                >
                  {hasBedrooms && (
                    <div className="rounded-xl bg-slate-50 p-5 text-center sm:p-6">
                      <BedDouble className="mx-auto mb-3 h-8 w-8 text-blue-500" />
                      <p className="mb-1 text-2xl font-bold text-slate-900">
                        {property.bedrooms}
                      </p>
                      <p className="text-sm text-slate-600">Bedrooms</p>
                    </div>
                  )}

                  {hasBathrooms && (
                    <div className="rounded-xl bg-slate-50 p-5 text-center sm:p-6">
                      <Bath className="mx-auto mb-3 h-8 w-8 text-blue-500" />
                      <p className="mb-1 text-2xl font-bold text-slate-900">
                        {property.bathrooms}
                      </p>
                      <p className="text-sm text-slate-600">Bathrooms</p>
                    </div>
                  )}

                  {hasArea && (
                    <div className="rounded-xl bg-slate-50 p-5 text-center sm:p-6">
                      <Maximize2 className="mx-auto mb-3 h-8 w-8 text-blue-500" />
                      <p className="mb-1 text-2xl font-bold text-slate-900">
                        {property.area}
                      </p>
                      <p className="text-sm text-slate-600">Area</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="/contact"
                  className="flex-1 rounded-xl bg-amber-500 px-6 py-4 text-center font-bold text-white transition-colors hover:bg-amber-600"
                >
                  Contact Us
                </a>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border-2 border-slate-300 px-6 py-4 font-semibold text-slate-700 transition-colors hover:border-slate-400"
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
}