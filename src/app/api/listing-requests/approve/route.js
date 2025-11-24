import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { requestId } = await request.json();

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      );
    }

    // Get the listing request
    const requestRef = doc(db, 'listingRequests', requestId);
    const requestSnap = await getDoc(requestRef);

    if (!requestSnap.exists()) {
      return NextResponse.json(
        { error: 'Listing request not found' },
        { status: 404 }
      );
    }

    const requestData = requestSnap.data();

    // Create property in properties collection
    const propertyData = {
      title: requestData.title,
      address: `${requestData.address}, ${requestData.city}, ${requestData.state} - ${requestData.pincode}`,
      price: requestData.price,
      bedrooms: requestData.bedrooms || 0,
      bathrooms: requestData.bathrooms || 0,
      area: requestData.area,
      imageUrl: requestData.images[0], // Main image
      images: requestData.images, // All images
      publicIds: requestData.publicIds || [],
      sold: false,
      featured: false,
      propertyType: requestData.propertyType,
      description: requestData.description,
      ownerName: requestData.ownerName,
      ownerEmail: requestData.ownerEmail,
      ownerPhone: requestData.ownerPhone,
      createdAt: serverTimestamp(),
      approvedFrom: requestId,
    };

    const propertyRef = await addDoc(collection(db, 'properties'), propertyData);

    // Update listing request status
    await updateDoc(requestRef, {
      status: 'approved',
      reviewedAt: serverTimestamp(),
      propertyId: propertyRef.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Listing approved successfully',
        propertyId: propertyRef.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error approving listing:', error);
    return NextResponse.json(
      { error: 'Failed to approve listing' },
      { status: 500 }
    );
  }
}
