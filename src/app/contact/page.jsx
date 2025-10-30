// src/app/contact/page.js
"use client"; // Needed for form state/handling in a real app

import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Import Label
import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Icons
import { SITE } from '@/lib/constants';

export default function ContactPage() {

  // Basic form submission handler (replace with actual logic)
  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app: collect form data, validate, send to backend/API
    console.log("Form submitted (placeholder)");
    // Replace alert with a better UI feedback mechanism
    // alert("Thank you for your message! We will get back to you soon.");
    event.target.reset(); // Clear the form
  };

  return (
    <div className="bg-background">
      {/* 1. Page Header */}
      <section className="bg-secondary py-16 text-center px-4">
        <div className="container mx-auto">
          <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
          <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We would love to hear from you. Whether you have a question about a property, our services, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* 2. Content Section (Info + Form) */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Column 1: Contact Information */}
          <div className="space-y-8">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">
              Contact Information
            </h2>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-primary">Office Address</h3>
                {/* Updated Address based on constants.js */}
                <p className="text-muted-foreground">
                  {SITE.address}
                </p>
                {/* Add a placeholder for Map */}
                <div className="mt-4 text-sm text-primary underline hover:text-accent cursor-pointer">
                  View on Map (Integration required)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-primary">Phone</h3>
                {/* Phone from constants.js */}
                <a href={`tel:${SITE.contactPhone}`} className="text-muted-foreground hover:text-primary">
                  {SITE.contactPhone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-primary">Email</h3>
                 {/* Email from constants.js */}
                <a href={`mailto:${SITE.contactEmail}`} className="text-muted-foreground hover:text-primary break-all">
                  {SITE.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="bg-secondary p-8 rounded-lg shadow-sm border">
             <h2 className="font-serif text-3xl font-bold text-primary mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required className="bg-background" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required className="bg-background" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" placeholder="+91 (XXX) XXX-XXXX" className="bg-background" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="subject" className="text-primary">Subject</Label>
                <Input id="subject" type="text" placeholder="Inquiry about property..." required className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-primary">Message</Label>
                <Textarea id="message" placeholder="Please type your message here..." required rows={5} className="bg-background" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent text-primary-foreground hover:bg-accent/90">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
