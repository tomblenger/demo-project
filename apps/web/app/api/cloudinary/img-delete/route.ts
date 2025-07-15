import { NextRequest, NextResponse } from 'next/server';

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder_name = searchParams.get('folder_name');
    const id = searchParams.get('id');

    if (!folder_name || !id) {
      return NextResponse.json({
        status: 'error',
        message: 'Folder name and image ID are required',
      }, { status: 400 });
    }

    // Construct the public_id for deletion
    const public_id = `${folder_name}/${id}`;

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok') {
      return NextResponse.json({
        status: 'success',
        message: 'Image deleted successfully',
        data: result,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to delete image from Cloudinary',
        data: result,
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Image deletion error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to delete image',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 