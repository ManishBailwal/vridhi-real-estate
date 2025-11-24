import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'propertyType', 'address', 'city', 'state', 'pincode', 'price', 'area', 'description', 'ownerName', 'ownerEmail', 'ownerPhone', 'images'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate image count
    if (!Array.isArray(data.images) || data.images.length < 1 || data.images.length > 5) {
      return NextResponse.json(
        { error: 'Must provide between 1 and 5 images' },
        { status: 400 }
      );
    }

    // Create listing request document
    const listingRequest = {
      title: data.title,
      propertyType: data.propertyType,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      price: data.price,
      bedrooms: data.bedrooms || 0,
      bathrooms: data.bathrooms || 0,
      area: data.area,
      description: data.description,
      images: data.images,
      publicIds: data.publicIds || [],
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerPhone: data.ownerPhone,
      status: 'pending', // pending, approved, rejected
      createdAt: serverTimestamp(),
      reviewedAt: null,
      reviewedBy: null,
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'listingRequests'), listingRequest);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Listing request submitted successfully',
        id: docRef.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating listing request:', error);
    return NextResponse.json(
      { error: 'Failed to submit listing request' },
      { status: 500 }
    );
  }
}
