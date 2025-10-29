// components/HeroSection.jsx

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="relative flex h-[70vh] min-h-[500px] w-full items-center justify-center">
      {/* BACKGROUND IMAGE */}
      {/* Use next/image for better performance, or a <div> for a video */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url('/images/hero-main.jpg')`, // Add a large hero image to /public/images
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 text-center">
        {/* Headline */}
        <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-6xl">
          Your Key to Austin's Premier Properties
        </h1>
        <p className="mb-8 text-lg text-gray-200 md:text-xl">
          Find your next luxury home or investment.
        </p>

        {/* FILTER BAR */}
        <div className="mx-auto max-w-4xl rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
            {/* Location */}
            <div className="text-left">
              <label htmlFor="location" className="mb-1 block text-sm font-medium text-primary">
                Location
              </label>
              <Select id="location">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="westlake">Westlake</SelectItem>
                  <SelectItem value="barton-creek">Barton Creek</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="text-left">
              <label htmlFor="type" className="mb-1 block text-sm font-medium text-primary">
                Property Type
              </label>
              <Select id="type">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="text-left">
              <label htmlFor="budget" className="mb-1 block text-sm font-medium text-primary">
                Budget
              </label>
              <Select id="budget">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500k">$500,000+</SelectItem>
                  <SelectItem value="1m">$1,000,000+</SelectItem>
                  <SelectItem value="3m">$3,000,000+</SelectItem>
                  <SelectItem value="5m">$5,000,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <Button 
              type="submit" 
              className="w-full bg-[var(--accent)] text-primary-foreground hover:bg-[var(--accent)]/90"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}