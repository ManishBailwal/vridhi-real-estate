"use client";

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminSidebar } from '@/components/AdminSidebar';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Edit2, Trash2, ArrowLeft, Upload, X, Building2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function PropertiesManagementPage() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    imageUrl: '',
    sold: false,
    featured: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch properties from Firestore
  const fetchProperties = async () => {
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const props = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(props);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file) => {
    const timestamp = Date.now();
    const storageRef = ref(storage, `properties/${timestamp}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.imageUrl;

      // Upload image if a new file is selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseFloat(formData.area),
        imageUrl,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        // Update existing property
        await updateDoc(doc(db, 'properties', editingId), propertyData);
      } else {
        // Add new property
        await addDoc(collection(db, 'properties'), {
          ...propertyData,
          createdAt: new Date().toISOString(),
        });
      }

      // Reset form
      setFormData({
        title: '',
        address: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        imageUrl: '',
        sold: false,
        featured: false,
      });
      setImageFile(null);
      setImagePreview('');
      setEditingId(null);
      setShowForm(false);
      fetchProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Handle edit
  const handleEdit = (property) => {
    setFormData({
      title: property.title,
      address: property.address,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      imageUrl: property.imageUrl,
      sold: property.sold || false,
      featured: property.featured || false,
    });
    setImagePreview(property.imageUrl);
    setEditingId(property.id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteDoc(doc(db, 'properties', id));
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Error deleting property. Please try again.');
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({
      title: '',
      address: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      imageUrl: '',
      sold: false,
      featured: false,
    });
    setImageFile(null);
    setImagePreview('');
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
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Manage Properties</h1>
                  <p className="text-sm text-slate-600">{properties.length} properties</p>
                </div>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 hover:bg-blue-600 gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Property
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : showForm ? (
            /* Form */
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {editingId ? 'Edit Property' : 'Add New Property'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Property Image</Label>
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">Click to upload image</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                          </label>
                        </div>
                        <Input
                          type="text"
                          placeholder="Or paste image URL"
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      {(imagePreview || formData.imageUrl) && (
                        <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-slate-200">
                          <img
                            src={imagePreview || formData.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview('');
                              setFormData({ ...formData, imageUrl: '' });
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Luxury Villa in Sahaspur"
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g., Sahaspur, Dehradun"
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g., 5700000"
                      required
                    />
                  </div>

                  {/* Grid for Bedrooms, Bathrooms, Area */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms *</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        placeholder="e.g., 3"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms *</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        placeholder="e.g., 2"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (Sq. Yards) *</Label>
                      <Input
                        id="area"
                        type="number"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="e.g., 150"
                        required
                      />
                    </div>
                  </div>

                  {/* Sold Status */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="sold"
                      checked={formData.sold}
                      onChange={(e) => setFormData({ ...formData, sold: e.target.checked })}
                      className="w-4 h-4 text-blue-500 rounded"
                    />
                    <Label htmlFor="sold" className="cursor-pointer">Mark as Sold</Label>
                  </div>

                  {/* Featured Status */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded"
                    />
                    <Label htmlFor="featured" className="cursor-pointer flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      Mark as Featured (will show on home page)
                    </Label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                    >
                      {uploading ? 'Saving...' : editingId ? 'Update Property' : 'Add Property'}
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
            /* Properties List */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {property.sold && (
                      <div className="absolute top-3 left-3 bg-slate-900 text-white px-3 py-1 rounded text-xs font-semibold">
                        SOLD
                      </div>
                    )}
                    {property.featured && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{property.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{property.address}</p>
                    <p className="text-xl font-bold text-blue-500 mb-4">₹{property.price.toLocaleString()}</p>
                    <div className="flex gap-2 text-xs text-slate-600 mb-4">
                      <span>{property.bedrooms} BD</span>
                      <span>•</span>
                      <span>{property.bathrooms} BA</span>
                      <span>•</span>
                      <span>{property.area} Sq.Yd</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(property)}
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(property.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !showForm && properties.length === 0 && (
            <div className="text-center py-20">
              <Building2 className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No properties yet</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first property</p>
              <Button onClick={() => setShowForm(true)} className="bg-blue-500 hover:bg-blue-600 gap-2">
                <Plus className="w-5 h-5" />
                Add Property
              </Button>
            </div>
          )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
