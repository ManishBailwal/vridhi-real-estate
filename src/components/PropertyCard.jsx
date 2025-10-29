// components/PropertyCard.jsx

import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'

// Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Icons
import { BedDouble, Bath, Square } from 'lucide-react'

// Helper for formatting currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function PropertyCard({ property }) {
  // Fallback for missing property data
  if (!property) return null;
  
  const { 
    slug,
    imageUrl, 
    title, 
    address, 
    price, 
    bedrooms, 
    bathrooms, 
    area 
  } = property;

  return (
    <Card className="group w-full max-w-sm overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-xl">
      <Link href={`/properties/${slug}`} legacyBehavior>
        <a className="text-decoration-none">
          {/* IMAGE */}
          <div className="overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={250}
              className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>

          {/* CONTENT */}
          <CardContent className="p-4">
            {/* Title & Price */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">
                {title}
              </h3>
              <Badge 
                variant="default" 
                className="shrink-0 bg-[var(--accent)] text-primary-foreground hover:bg-[var(--accent)]/90"
              >
                {formatter.format(price)}
              </Badge>
            </div>

            {/* Address */}
            <p className="mt-1 text-sm text-muted-foreground">
              {address}
            </p>

            {/* Stats */}
            <div className="mt-4 flex space-x-4 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" />
                <span className="text-sm">{bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" />
                <span className="text-sm">{bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square className="h-4 w-4" />
                <span className="text-sm">{area}m²</span>
              </div>
            </div>
          </CardContent>
        </a>
      </Link>
    </Card>
  )
}

// PropTypes are a good practice in JavaScript to catch bugs
PropertyCard.propTypes = {
  property: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired,
  }).isRequired,
}