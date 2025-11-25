"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Home, Building2, MapPin } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/cloudinary';

export default function RequestListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'residential', // residential, commercial, plot
    address: '',
    city: '',
    state: '',
    pincode: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 5) {
      alert('You can upload a maximum of 5 images');
      return;
    }

    if (images.length + files.length < 1) {
      alert('You must upload at least 1 image');
      return;
    }

    setImages(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (images.length < 1) {
      alert('Please upload at least 1 image');
      return;
    }

    if (images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    setLoading(true);

    try {
      // Upload all images to Cloudinary
      const uploadPromises = images.map(file => uploadToCloudinary(file));
      const uploadedImages = await Promise.all(uploadPromises);
      
      const imageUrls = uploadedImages.map(img => img.url);
      const publicIds = uploadedImages.map(img => img.publicId);

      // Submit the listing request
      const response = await fetch('/api/listing-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls,
          publicIds: publicIds,
          price: parseFloat(formData.price),
          bedrooms: formData.propertyType === 'plot' ? 0 : parseInt(formData.bedrooms) || 0,
          bathrooms: formData.propertyType === 'plot' ? 0 : parseInt(formData.bathrooms) || 0,
          area: parseFloat(formData.area),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit listing request');
      }

      alert('Listing request submitted successfully! We will review it and get back to you soon.');
      router.push('/');
    } catch (error) {
      console.error('Error submitting listing request:', error);
      alert('Failed to submit listing request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="w-10 h-10 text-amber-500" />
              <h1 className="text-4xl font-bold text-slate-900">Request Property Listing</h1>
            </div>
            <p className="text-slate-600 text-lg">
              Submit your property details and we'll review it for listing on our platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {/* Property Type */}
            <div className="mb-6">
              <Label htmlFor="propertyType" className="text-base font-semibold text-slate-900 mb-2">
                Property Type *
              </Label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="residential">Residential (House/Apartment)</option>
                <option value="commercial">Commercial</option>
                <option value="plot">Plot/Land</option>
              </select>
            </div>

            {/* Property Title */}
            <div className="mb-6">
              <Label htmlFor="title" className="text-base font-semibold text-slate-900 mb-2">
                Property Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., 3 BHK Apartment in Sector 62"
                required
                className="h-12"
              />
            </div>

            {/* Address Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="address" className="text-base font-semibold text-slate-900 mb-2">
                  Street Address *
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-base font-semibold text-slate-900 mb-2">
                  City *
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="state" className="text-base font-semibold text-slate-900 mb-2">
                  State *
                </Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="pincode" className="text-base font-semibold text-slate-900 mb-2">
                  Pincode *
                </Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  required
                  className="h-12"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="price" className="text-base font-semibold text-slate-900 mb-2">
                  Price (₹) *
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 5000000"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="area" className="text-base font-semibold text-slate-900 mb-2">
                  Area (sq.ft) *
                </Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g., 1200"
                  required
                  className="h-12"
                />
              </div>
            </div>

            {/* Bedrooms & Bathrooms (hide for plots) */}
            {formData.propertyType !== 'plot' && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="bedrooms" className="text-base font-semibold text-slate-900 mb-2">
                    Bedrooms *
                  </Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="e.g., 3"
                    required={formData.propertyType !== 'plot'}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms" className="text-base font-semibold text-slate-900 mb-2">
                    Bathrooms *
                  </Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="e.g., 2"
                    required={formData.propertyType !== 'plot'}
                    className="h-12"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <Label htmlFor="description" className="text-base font-semibold text-slate-900 mb-2">
                Property Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property, key features, nearby amenities, etc."
                required
                rows={5}
                className="resize-none"
              />
            </div>

            {/* Owner Details */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="ownerName" className="text-base font-semibold text-slate-900 mb-2">
                    Your Name *
                  </Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerEmail" className="text-base font-semibold text-slate-900 mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="ownerPhone" className="text-base font-semibold text-slate-900 mb-2">
                  Phone Number *
                </Label>
                <Input
                  id="ownerPhone"
                  name="ownerPhone"
                  type="tel"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  required
                  className="h-12"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="border-t pt-6 mb-8">
              <Label className="text-base font-semibold text-slate-900 mb-2 block">
                Property Images * (Min: 1, Max: 5)
              </Label>
              <p className="text-sm text-slate-600 mb-4">
                Upload clear images of your property. First image will be used as the main image.
              </p>
              
              <div className="space-y-4">
                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg border-2 border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Main Image
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                {images.length < 5 && (
                  <div>
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <label
                      htmlFor="images"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-700 font-medium">
                        Click to upload images ({images.length}/5)
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/')}
                disabled={loading}
                className="flex-1 h-12 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || images.length < 1}
                className="flex-1 h-12 bg-amber-500 hover:bg-amber-600 cursor-pointer"
              >
                {loading ? 'Submitting...' : 'Submit Listing Request'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
