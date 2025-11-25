"use client";

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminSidebar } from '@/components/AdminSidebar';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { CheckCircle, XCircle, Eye, Clock, Home, Building2, MapPin, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ListingRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [filter, setFilter] = useState('pending'); // pending, approved, rejected, all
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    all: 0,
  });


  // Fetch listing requests
  const fetchRequests = async () => {
    try {
      setLoading(true);

      const q = query(collection(db, 'listingRequests'));
      const querySnapshot = await getDocs(q);

      let reqs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        reviewedAt: doc.data().reviewedAt?.toDate(),
      }));

      // 🔥 Count status totals
      const pendingCount = reqs.filter(r => r.status?.toLowerCase() === 'pending').length;
      const approvedCount = reqs.filter(r => r.status?.toLowerCase() === 'approved').length;
      const rejectedCount = reqs.filter(r => r.status?.toLowerCase() === 'rejected').length;
      const allCount = reqs.length;


      setCounts({
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
        all: allCount,
      });

      // Filter by status if not 'all'
      if (filter !== 'all') {
        reqs = reqs.filter(req => req.status === filter);
      }

      // Sort by createdAt descending (newest first)
      reqs.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return b.createdAt - a.createdAt;
      });

      setRequests(reqs);
    } catch (error) {
      console.error('Error fetching listing requests:', error);
      alert('Failed to fetch listing requests');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const handleApprove = async (request) => {
    if (!confirm('Are you sure you want to approve this listing?')) return;

    setProcessing(true);
    try {
      const response = await fetch('/api/listing-requests/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: request.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve listing');
      }

      alert('Listing approved successfully!');
      setShowModal(false);
      setSelectedRequest(null);
      fetchRequests();
    } catch (error) {
      console.error('Error approving listing:', error);
      alert('Failed to approve listing');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (request) => {
    const reason = prompt('Enter rejection reason (optional):');
    if (reason === null) return; // User cancelled

    setProcessing(true);
    try {
      const response = await fetch('/api/listing-requests/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: request.id, reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject listing');
      }

      alert('Listing rejected successfully!');
      setShowModal(false);
      setSelectedRequest(null);
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting listing:', error);
      alert('Failed to reject listing');
    } finally {
      setProcessing(false);
    }
  };

  const viewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getPropertyTypeIcon = (type) => {
    if (type === 'plot') return <MapPin className="w-5 h-5" />;
    if (type === 'commercial') return <Building2 className="w-5 h-5" />;
    return <Home className="w-5 h-5" />;
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />

        <div className="flex-1 ml-64">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Listing Requests</h1>
              <p className="text-slate-600">Review and manage property listing requests from users</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilter('pending')}
                className={filter === 'pending' ? 'bg-amber-500 hover:bg-amber-600 cursor-pointer' : 'cursor-pointer'}
              >
                <Clock className="w-4 h-4 mr-2" />
                Pending ({counts.pending})
              </Button>

              <Button
                variant={filter === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilter('approved')}
                className={filter === 'approved' ? 'bg-amber-500 hover:bg-amber-600 cursor-pointer ' : 'cursor-pointer'}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approved ({counts.approved})
              </Button>

              <Button
                variant={filter === 'rejected' ? 'default' : 'outline'}
                onClick={() => setFilter('rejected')}
                className={filter === 'rejected' ? 'bg-amber-500 hover:bg-amber-600 cursor-pointer ' : 'cursor-pointer'}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Rejected ({counts.rejected})
              </Button>

              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-amber-500 hover:bg-amber-600 cursor-pointer ' : 'cursor-pointer'}
              >
                All ({counts.all})
              </Button>

            </div>

            {/* Requests List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
                <p className="text-slate-600 mt-4">Loading requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">No listing requests found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {requests.map((request) => (
                  <div key={request.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <div className="flex gap-6">
                      {/* Main Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={request.images[0]}
                          alt={request.title}
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                        {request.images.length > 1 && (
                          <p className="text-xs text-slate-500 mt-1 text-center">
                            +{request.images.length - 1} more
                          </p>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {getPropertyTypeIcon(request.propertyType)}
                              <h3 className="text-xl font-bold text-slate-900">{request.title}</h3>
                            </div>
                            <p className="text-slate-600 text-sm">
                              {request.address}, {request.city}, {request.state} - {request.pincode}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-slate-500">Price</p>
                            <p className="text-sm font-semibold text-slate-900">₹{request.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Area</p>
                            <p className="text-sm font-semibold text-slate-900">{request.area} sq.ft</p>
                          </div>
                          {request.propertyType !== 'plot' && (
                            <>
                              <div>
                                <p className="text-xs text-slate-500">Bedrooms</p>
                                <p className="text-sm font-semibold text-slate-900">{request.bedrooms}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Bathrooms</p>
                                <p className="text-sm font-semibold text-slate-900">{request.bathrooms}</p>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {request.ownerName}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {request.ownerEmail}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {request.ownerPhone}
                          </div>
                        </div>

                        <p className="text-sm text-slate-500 mb-3">
                          Submitted: {request.createdAt?.toLocaleDateString()} at {request.createdAt?.toLocaleTimeString()}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewDetails(request)}
                            className="cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          {request.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(request)}
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 cursor-pointer"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(request)}
                                disabled={processing}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details Modal */}
        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedRequest.title}</h2>
                    <p className="text-slate-600">
                      {selectedRequest.address}, {selectedRequest.city}, {selectedRequest.state} - {selectedRequest.pincode}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* Images */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedRequest.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Property ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Property Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Property Type</p>
                      <p className="font-semibold capitalize">{selectedRequest.propertyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Price</p>
                      <p className="font-semibold">₹{selectedRequest.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Area</p>
                      <p className="font-semibold">{selectedRequest.area} sq.ft</p>
                    </div>
                    {selectedRequest.propertyType !== 'plot' && (
                      <>
                        <div>
                          <p className="text-sm text-slate-500">Bedrooms</p>
                          <p className="font-semibold">{selectedRequest.bedrooms}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Bathrooms</p>
                          <p className="font-semibold">{selectedRequest.bathrooms}</p>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="text-sm text-slate-500">Status</p>
                      <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${getStatusBadge(selectedRequest.status)}`}>
                        {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
                  <p className="text-slate-700 whitespace-pre-wrap">{selectedRequest.description}</p>
                </div>

                {/* Owner Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Owner Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Name</p>
                      <p className="font-semibold">{selectedRequest.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-semibold">{selectedRequest.ownerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-semibold">{selectedRequest.ownerPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {selectedRequest.status === 'pending' && (
                  <div className="flex gap-3 pt-6 border-t">
                    <Button
                      onClick={() => handleApprove(selectedRequest)}
                      disabled={processing}
                      className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {processing ? 'Processing...' : 'Approve Listing'}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedRequest)}
                      disabled={processing}
                      className="flex-1"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      {processing ? 'Processing...' : 'Reject Listing'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
