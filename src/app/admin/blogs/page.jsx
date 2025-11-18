"use client";

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminSidebar } from '@/components/AdminSidebar';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '@/lib/cloudinary';
import { Plus, Edit2, Trash2, Upload, X, BookOpen, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function BlogsManagementPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch blogs from Firestore
  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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

  // Upload image to Cloudinary
  const uploadImage = async (file) => {
    const result = await uploadToCloudinary(file);
    return result.url;
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

      const blogData = {
        ...formData,
        imageUrl,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        // Update existing blog
        await updateDoc(doc(db, 'blogs', editingId), blogData);
      } else {
        // Add new blog
        await addDoc(collection(db, 'blogs'), {
          ...blogData,
          createdAt: new Date().toISOString(),
        });
      }

      // Reset form
      setFormData({
        heading: '',
        content: '',
        imageUrl: '',
      });
      setImageFile(null);
      setImagePreview('');
      setEditingId(null);
      setShowForm(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Handle edit
  const handleEdit = (blog) => {
    setFormData({
      heading: blog.heading,
      content: blog.content,
      imageUrl: blog.imageUrl,
    });
    setImagePreview(blog.imageUrl);
    setEditingId(blog.id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        // Find the blog to get its image URL
        const blog = blogs.find(b => b.id === id);
        
        // Delete from Firestore
        await deleteDoc(doc(db, 'blogs', id));
        
        // Delete image from Cloudinary if it exists
        if (blog?.imageUrl) {
          const publicId = getPublicIdFromUrl(blog.imageUrl);
          if (publicId) {
            await deleteFromCloudinary(publicId);
          }
        }
        
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Error deleting blog. Please try again.');
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({
      heading: '',
      content: '',
      imageUrl: '',
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
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Manage Blogs</h1>
                  <p className="text-sm text-slate-600">{blogs.length} blogs</p>
                </div>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-purple-500 hover:bg-purple-600 gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Blog
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">
                      {editingId ? 'Edit Blog' : 'Add New Blog'}
                    </h2>
                    <button
                      onClick={handleCancel}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Heading */}
                    <div>
                      <Label htmlFor="heading" className="text-slate-700 font-medium mb-2">
                        Blog Heading *
                      </Label>
                      <Input
                        id="heading"
                        value={formData.heading}
                        onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                        placeholder="Enter blog heading"
                        required
                        className="mt-1"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <Label htmlFor="content" className="text-slate-700 font-medium mb-2">
                        Blog Content *
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your blog content here..."
                        required
                        rows={10}
                        className="mt-1"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <Label className="text-slate-700 font-medium mb-2">
                        Header Image *
                      </Label>
                      <div className="mt-2 space-y-4">
                        {/* Image Preview */}
                        {imagePreview && (
                          <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-slate-200">
                            <img
                              src={imagePreview}
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
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* File Input */}
                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="flex-1"
                          />
                          <Upload className="w-5 h-5 text-slate-400" />
                        </div>

                        {/* Or Image URL */}
                        <div>
                          <Label htmlFor="imageUrl" className="text-sm text-slate-600">
                            Or paste image URL
                          </Label>
                          <Input
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={(e) => {
                              setFormData({ ...formData, imageUrl: e.target.value });
                              setImagePreview(e.target.value);
                            }}
                            placeholder="https://example.com/image.jpg"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                      <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={uploading}
                        className="flex-1 bg-purple-500 hover:bg-purple-600"
                      >
                        {uploading ? 'Saving...' : editingId ? 'Update Blog' : 'Add Blog'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Blogs List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Blogs Yet</h3>
                <p className="text-slate-600 mb-6">Start by adding your first blog post</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Blog
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex gap-6">
                      {/* Blog Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={blog.imageUrl || 'https://placehold.co/300x200/e2e8f0/64748b?text=Blog'}
                          alt={blog.heading}
                          className="w-48 h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/300x200/e2e8f0/64748b?text=Blog';
                          }}
                        />
                      </div>

                      {/* Blog Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">
                          {blog.heading}
                        </h3>
                        <p className="text-slate-600 mb-3 line-clamp-2">
                          {blog.content}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 flex flex-col gap-2">
                        <Button
                          onClick={() => handleEdit(blog)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(blog.id)}
                          variant="outline"
                          size="sm"
                          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
