"use client";

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminSidebar } from '@/components/AdminSidebar';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Mail, Trash2, CheckCircle, Clock, Phone, Calendar, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QueriesPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch contacts from Firestore
  const fetchContacts = async () => {
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Mark as read/unread
  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'read' ? 'unread' : 'read';
      await updateDoc(doc(db, 'contacts', id), { status: newStatus });
      fetchContacts();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Delete contact
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
        fetchContacts();
        setSelectedContact(null);
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting message. Please try again.');
      }
    }
  };

  const unreadCount = contacts.filter(c => c.status === 'unread').length;

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
                <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Queries</h1>
                  <p className="text-sm text-slate-600">
                    {contacts.length} total messages
                    {unreadCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-semibold">
                        {unreadCount} unread
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading messages...</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <Mail className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Messages Yet</h3>
                <p className="text-slate-600">Contact form submissions will appear here</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 ${
                      contact.status === 'unread' ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      {/* Contact Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-slate-900">{contact.name}</h3>
                          {contact.status === 'unread' && (
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-semibold">
                              New
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${contact.email}`} className="hover:text-indigo-600">
                              {contact.email}
                            </a>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${contact.phone}`} className="hover:text-indigo-600">
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(contact.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-slate-500 mb-1">Subject:</p>
                          <p className="font-semibold text-slate-900">{contact.subject}</p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-500 mb-1">Message:</p>
                          <p className="text-slate-700 whitespace-pre-wrap">{contact.message}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => toggleReadStatus(contact.id, contact.status)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          title={contact.status === 'read' ? 'Mark as unread' : 'Mark as read'}
                        >
                          {contact.status === 'read' ? (
                            <>
                              <EyeOff className="w-4 h-4" />
                              Unread
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4" />
                              Read
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleDelete(contact.id)}
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
