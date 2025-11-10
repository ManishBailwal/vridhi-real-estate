"use client";

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminSidebar } from '@/components/AdminSidebar';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { Plus, Edit2, Trash2, ArrowLeft, MessageSquare, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function TestimonialsManagementPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    quote: '',
  });

  // Fetch testimonials from Firestore
  const fetchTestimonials = async () => {
    try {
      const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const testimonialsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonials(testimonialsList);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const testimonialData = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        // Update existing testimonial
        await updateDoc(doc(db, 'testimonials', editingId), testimonialData);
      } else {
        // Add new testimonial
        await addDoc(collection(db, 'testimonials'), {
          ...testimonialData,
          createdAt: new Date().toISOString(),
        });
      }

      // Reset form
      setFormData({
        name: '',
        location: '',
        quote: '',
      });
      setEditingId(null);
      setShowForm(false);
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Handle edit
  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      location: testimonial.location,
      quote: testimonial.quote,
    });
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteDoc(doc(db, 'testimonials', id));
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Error deleting testimonial. Please try again.');
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({
      name: '',
      location: '',
      quote: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
            <div className="px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Manage Testimonials</h1>
                  <p className="text-sm text-slate-600">{testimonials.length} testimonials</p>
                </div>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-purple-500 hover:bg-purple-600 gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Testimonial
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : showForm ? (
            /* Form */
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Client Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Rajesh Kumar"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location / Title *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Prem Nagar, Dehradun"
                      required
                    />
                  </div>

                  {/* Quote */}
                  <div className="space-y-2">
                    <Label htmlFor="quote">Testimonial *</Label>
                    <Textarea
                      id="quote"
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      placeholder="Enter the testimonial text..."
                      rows={6}
                      required
                    />
                    <p className="text-xs text-slate-500">
                      Write what the client said about your services
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-purple-500 hover:bg-purple-600"
                    >
                      {saving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Add Testimonial'}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Testimonials List */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-6 relative">
                  <div className="absolute -top-3 right-6 bg-purple-500 text-white p-2 rounded-xl shadow-md">
                    <Quote className="w-5 h-5" />
                  </div>
                  <blockquote className="text-slate-700 mb-4 line-clamp-4 min-h-[6rem]">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="pt-4 border-t border-slate-200">
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.location}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleEdit(testimonial)}
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(testimonial.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !showForm && testimonials.length === 0 && (
            <div className="text-center py-20">
              <MessageSquare className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No testimonials yet</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first testimonial</p>
              <Button onClick={() => setShowForm(true)} className="bg-purple-500 hover:bg-purple-600 gap-2">
                <Plus className="w-5 h-5" />
                Add Testimonial
              </Button>
            </div>
          )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
