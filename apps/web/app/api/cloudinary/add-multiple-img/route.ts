import { NextRequest, NextResponse } from 'next/server';

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const images = formData.getAll('images') as File[];

    if (!images || images.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'At least one image is required',
      }, { status: 400 });
    }

    // Validate file count (max 10 images)
    if (images.length > 10) {
      return NextResponse.json({
        success: false,
        message: 'Maximum 10 images allowed',
      }, { status: 400 });
    }

    // Validate file types and sizes
    const maxSize = 10 * 1024 * 1024; // 10MB
    for (const image of images) {
      if (!image.type.startsWith('image/')) {
        return NextResponse.json({
          success: false,
          message: 'Please upload valid image files only',
        }, { status: 400 });
      }
      
      if (image.size > maxSize) {
        return NextResponse.json({
          success: false,
          message: 'Each image must be less than 10MB',
        }, { status: 400 });
      }
    }

    // Upload all images to Cloudinary
    const uploadPromises = images.map(async (image, index) => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'electronic-store/gallery',
            public_id: `gallery_${Date.now()}_${index}`,
            transformation: [
              { width: 800, height: 600, crop: 'limit' },
              { quality: 'auto' },
              { format: 'auto' }
            ]
          },
          (error: any, result: any) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                url: result.secure_url,
                id: result.public_id,
              });
            }
          }
        ).end(buffer);
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      message: 'Images uploaded successfully',
      data: uploadResults,
    }, { status: 200 });

  } catch (error) {
    console.error('Multiple image upload error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to upload images',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 