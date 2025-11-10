"use client";

import { useState, useEffect } from 'react';
import AgentCard from '@/components/AgentCard';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const q = query(collection(db, 'agents'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const agentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
          slug: doc.id,
          ...doc.data()
        }));
        setAgents(agentsData);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-amber-500">Agents</span>
          </h1>
          <div className="h-1 w-32 bg-amber-500 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our experienced team of real estate professionals dedicated to helping you find your dream property.
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : agents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">No agents available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  )

  }
