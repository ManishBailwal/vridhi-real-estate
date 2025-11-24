import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const { requestId, reason } = await request.json();

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

    // Delete images from Cloudinary
    if (requestData.publicIds && requestData.publicIds.length > 0) {
      try {
        await Promise.all(
          requestData.publicIds.map(publicId => deleteFromCloudinary(publicId))
        );
      } catch (error) {
        console.error('Error deleting images from Cloudinary:', error);
        // Continue even if image deletion fails
      }
    }

    // Update listing request status
    await updateDoc(requestRef, {
      status: 'rejected',
      reviewedAt: serverTimestamp(),
      rejectionReason: reason || 'No reason provided',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Listing rejected successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error rejecting listing:', error);
    return NextResponse.json(
      { error: 'Failed to reject listing' },
      { status: 500 }
    );
  }
}
