"use client";

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminSidebar } from '@/components/AdminSidebar';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Edit2, Trash2, ArrowLeft, Upload, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AgentsManagementPage() {
  const router = useRouter();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch agents from Firestore
  const fetchAgents = async () => {
    try {
      const q = query(collection(db, 'agents'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const agentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAgents(agentsList);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
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
    const storageRef = ref(storage, `agents/${timestamp}_${file.name}`);
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

      const agentData = {
        ...formData,
        imageUrl,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        // Update existing agent
        await updateDoc(doc(db, 'agents', editingId), agentData);
      } else {
        // Add new agent
        await addDoc(collection(db, 'agents'), {
          ...agentData,
          createdAt: new Date().toISOString(),
        });
      }

      // Reset form
      setFormData({
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        imageUrl: '',
      });
      setImageFile(null);
      setImagePreview('');
      setEditingId(null);
      setShowForm(false);
      fetchAgents();
    } catch (error) {
      console.error('Error saving agent:', error);
      alert('Error saving agent. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Handle edit
  const handleEdit = (agent) => {
    setFormData({
      name: agent.name,
      title: agent.title,
      bio: agent.bio,
      email: agent.email,
      phone: agent.phone,
      imageUrl: agent.imageUrl,
    });
    setImagePreview(agent.imageUrl);
    setEditingId(agent.id);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      try {
        await deleteDoc(doc(db, 'agents', id));
        fetchAgents();
      } catch (error) {
        console.error('Error deleting agent:', error);
        alert('Error deleting agent. Please try again.');
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({
      name: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
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
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Manage Agents</h1>
                  <p className="text-sm text-slate-600">{agents.length} agents</p>
                </div>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-green-500 hover:bg-green-600 gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Agent
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : showForm ? (
            /* Form */
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {editingId ? 'Edit Agent' : 'Add New Agent'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Agent Photo</Label>
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-600">Click to upload photo</p>
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

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Agent Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Manish Bailwal"
                      required
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Senior Agent"
                      required
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Brief description about the agent..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="agent@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="123-456-7890"
                        required
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      {uploading ? 'Saving...' : editingId ? 'Update Agent' : 'Add Agent'}
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
            /* Agents List */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-500 to-green-600">
                    <img
                      src={agent.imageUrl}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{agent.name}</h3>
                    <p className="text-sm text-green-600 font-semibold mb-3">{agent.title}</p>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{agent.bio}</p>
                    <div className="space-y-1 text-sm text-slate-600 mb-4">
                      <p>📧 {agent.email}</p>
                      <p>📞 {agent.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(agent)}
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(agent.id)}
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

          {!loading && !showForm && agents.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-20 h-20 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No agents yet</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first agent</p>
              <Button onClick={() => setShowForm(true)} className="bg-green-500 hover:bg-green-600 gap-2">
                <Plus className="w-5 h-5" />
                Add Agent
              </Button>
            </div>
          )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
