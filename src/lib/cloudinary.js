// Cloudinary configuration and utility functions

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME 
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET 

/**
 * Upload an image to Cloudinary
 * @param {File} file - The image file to upload
 * @returns {Promise<Object>} - Returns object with url and publicId
 */
export async function uploadToCloudinary(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'vridhi-real-estate'); // Organize uploads in a folder

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

/**
 * Delete an image from Cloudinary
 * Note: Deletion requires authentication. For unsigned uploads, you need to:
 * 1. Set up a serverless function/API route with your API secret
 * 2. Or enable "Auto-delete" in Cloudinary settings
 * 
 * This function makes a request to a Next.js API route that handles the deletion
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<void>}
 */
export async function deleteFromCloudinary(publicId) {
  try {
    // We'll create an API route to handle deletion with authentication
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      console.error('Failed to delete image from Cloudinary');
      // Don't throw error - allow property/agent deletion to continue even if image deletion fails
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    // Don't throw error - allow property/agent deletion to continue
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - The Cloudinary URL
 * @returns {string|null} - The public ID or null if not a Cloudinary URL
 */
export function getPublicIdFromUrl(url) {
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }

  try {
    // URL format: https://res.cloudinary.com/cloud-name/image/upload/v123456/folder/image-name.jpg
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    
    if (uploadIndex === -1) {
      return null;
    }

    // Get everything after 'upload/vXXXXXX/' and remove file extension
    const pathParts = parts.slice(uploadIndex + 2); // Skip 'upload' and version
    const publicId = pathParts.join('/').split('.')[0];
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
}
