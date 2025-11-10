// src/components/AgentCard.jsx
"use client"; // Mark this as a Client Component because it uses an event handler (onError)

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from '@/components/ui/button'; // Uncomment if using the button
import { Mail, Phone, Briefcase } from 'lucide-react'; // Icons

export default function AgentCard({ agent }) {
  if (!agent) return null;

  // Provide a fallback image URL if imageUrl is missing or invalid
  const imageUrl = agent.imageUrl || `https://placehold.co/400x400/1B263B/ffffff?text=${encodeURIComponent(agent.name || 'Agent')}`;

  return (
    <Card key={agent.id} className="w-full max-w-sm overflow-hidden border border-slate-200 shadow-md transition-all hover:shadow-xl hover:border-amber-500">
      <CardHeader className="p-0"> {/* Remove default padding */}
         <img
            src={imageUrl}
            alt={`${agent.name} headshot`}
            className="w-full h-auto object-cover aspect-square" // Ensure image covers the area
            // onError handler is allowed here in a Client Component
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop if placeholder fails
              e.target.src="https://placehold.co/400x400/cccccc/ffffff?text=Image+Error";
            }}
          />
      </CardHeader>
      <CardContent className="p-6 text-center"> {/* Center text */}
        <CardTitle className="text-xl font-semibold text-slate-900 font-serif mb-1">{agent.name}</CardTitle>
        <CardDescription className="text-amber-600 font-medium mb-3 flex items-center justify-center gap-1.5">
           <Briefcase className="h-4 w-4" /> {agent.title}
        </CardDescription>
        <p className="text-slate-600 text-sm mb-4">{agent.bio}</p>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <a href={`mailto:${agent.email}`} title={`Email ${agent.name}`} className="text-slate-600 hover:text-amber-500 transition-colors">
            <Mail className="h-5 w-5" />
          </a>
          <a href={`tel:${agent.phone.replace(/\s/g, '')}`} title={`Call ${agent.name}`} className="text-slate-600 hover:text-amber-500 transition-colors">
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

// Prop validation
AgentCard.propTypes = {
  agent: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
