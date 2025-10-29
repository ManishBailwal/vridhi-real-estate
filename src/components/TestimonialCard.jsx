import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardDescription } from "@/components/ui/card";
import { Quote } from 'lucide-react';

export function TestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  const { quote, name, location } = testimonial;

  return (
    <div className="p-1 h-full"> {/* Outer div for padding within CarouselItem */}
      <Card className="h-full flex flex-col justify-between p-6"> {/* Card takes full height */}
        <div> {/* Content wrapper */}
          <Quote className="h-6 w-6 text-muted-foreground mb-4" />
          <CardDescription className="mb-4 italic text-foreground">"{quote}"</CardDescription>
        </div>
        <div className="mt-auto pt-4 border-t"> {/* Footer pushed to bottom */}
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </Card>
    </div>
  );
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};
