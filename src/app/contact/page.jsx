// src/app/contact/page.js
"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(event.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        subject: formData.get('subject'),
        message: formData.get('message'),
        createdAt: new Date().toISOString(),
        status: 'unread'
      };

      await addDoc(collection(db, 'contacts'), data);
      
      setSubmitted(true);
      event.target.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 text-center px-4">
        <div className="container mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-amber-500 shadow-lg mb-4 ring-1 ring-amber-400/20">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-slate-900 md:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We would love to hear from you. Whether you have a question about a property, our services, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* 2. Content Section (Info + Form) */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Column 1: Contact Information */}
          <div className="space-y-8">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">
              Contact Information
            </h2>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-amber-500 mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Office Address</h3>
                {/* Updated Address based on constants.js */}
                <p className="text-slate-600">
                  {SITE.address}
                </p>
                {/* Add a placeholder for Map */}
                <div className="mt-4 text-sm text-amber-600 underline hover:text-amber-500 cursor-pointer">
                  View on Map (Integration required)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-amber-500 mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
                {/* Phone from constants.js */}
                <a href={`tel:${SITE.contactPhone}`} className="text-slate-600 hover:text-amber-500">
                  {SITE.contactPhone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-amber-500 mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Email</h3>
                 {/* Email from constants.js */}
                <a href={`mailto:${SITE.contactEmail}`} className="text-slate-600 hover:text-amber-500 break-all">
                  {SITE.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="bg-slate-50 p-8 rounded-lg shadow-md border border-slate-200">
             <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">
              Send Us a Message
            </h2>
            
            {/* Success Message */}
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">
                  Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-900">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="John Doe" required className="bg-white" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-900">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className="bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-900">Phone Number (Optional)</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 (XXX) XXX-XXXX" className="bg-white" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="subject" className="text-slate-900">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="Inquiry about property..." required className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-900">Message</Label>
                <Textarea id="message" name="message" placeholder="Please type your message here..." required rows={5} className="bg-white" />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-amber-500 text-white hover:bg-amber-600 cursor-pointer"
                disabled={submitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
