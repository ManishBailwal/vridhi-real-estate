"use client";

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminSidebar } from '@/components/AdminSidebar';
import { useRouter } from 'next/navigation';
import { Building2, Users, MessageSquare, Star, TrendingUp, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProperties: 0,
    featuredProperties: 0,
    soldProperties: 0,
    totalAgents: 0,
    totalTestimonials: 0,
    totalBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch properties
        const propertiesSnapshot = await getDocs(collection(db, 'properties'));
        const properties = propertiesSnapshot.docs.map(doc => doc.data());
        const totalProperties = properties.length;
        const featuredProperties = properties.filter(p => p.featured).length;
        const soldProperties = properties.filter(p => p.sold).length;

        // Fetch agents
        const agentsSnapshot = await getDocs(collection(db, 'agents'));
        const totalAgents = agentsSnapshot.size;

        // Fetch testimonials
        const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'));
        const totalTestimonials = testimonialsSnapshot.size;

        // Fetch blogs
        const blogsSnapshot = await getDocs(collection(db, 'blogs'));
        const totalBlogs = blogsSnapshot.size;

        setStats({
          totalProperties,
          featuredProperties,
          soldProperties,
          totalAgents,
          totalTestimonials,
          totalBlogs,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const menuItems = [
    {
      title: 'Manage Properties',
      description: 'Add, edit, or remove property listings',
      icon: Building2,
      href: '/admin/properties',
      color: 'bg-blue-500',
    },
    {
      title: 'Manage Agents',
      description: 'Add, edit, or remove agent profiles',
      icon: Users,
      href: '/admin/agents',
      color: 'bg-green-500',
    },
    {
      title: 'Manage Testimonials',
      description: 'Add, edit, or remove client testimonials',
      icon: MessageSquare,
      href: '/admin/testimonials',
      color: 'bg-purple-500',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h2>
              <p className="text-slate-600">Manage your real estate portal from here</p>
            </div>

            {/* Menu Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-200 text-left group"
                  >
                    <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </button>
                );
              })}
            </div> */}

            {/* Statistics Dashboard */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overview Stats */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Overview Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <Building2 className="w-10 h-10 text-blue-600" />
                        <span className="text-3xl font-bold text-blue-600">{stats.totalProperties}</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">Total Properties</p>
                      <p className="text-sm text-slate-600 mt-1">All listings in database</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <Users className="w-10 h-10 text-green-600" />
                        <span className="text-3xl font-bold text-green-600">{stats.totalAgents}</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">Total Agents</p>
                      <p className="text-sm text-slate-600 mt-1">Active team members</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                      <div className="flex items-center justify-between mb-3">
                        <BookOpen className="w-10 h-10 text-orange-600" />
                        <span className="text-3xl font-bold text-orange-600">{stats.totalBlogs}</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">Total Blogs</p>
                      <p className="text-sm text-slate-600 mt-1">Published articles</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <MessageSquare className="w-10 h-10 text-purple-600" />
                        <span className="text-3xl font-bold text-purple-600">{stats.totalTestimonials}</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">Testimonials</p>
                      <p className="text-sm text-slate-600 mt-1">Client reviews</p>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Property Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                      <div className="flex items-center justify-between mb-3">
                        <Star className="w-10 h-10 text-amber-600" />
                        <span className="text-3xl font-bold text-amber-600">{stats.featuredProperties}</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">Featured Properties</p>
                      <p className="text-sm text-slate-600 mt-1">Showing on home page</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="w-10 h-10 text-slate-600" />
                        <span className="text-3xl font-bold text-slate-600">{stats.soldProperties}</span>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">Sold Properties</p>
                      <p className="text-sm text-slate-600 mt-1">Successfully closed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
