import { NextRequest, NextResponse } from 'next/server';

let cloudinary: any;

try {
  cloudinary = require('cloudinary').v2;
  
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.error('Failed to load cloudinary:', error);
}

export async function POST(request: NextRequest) {
  console.log('🔍 API Route Called: /api/cloudinary/add-img');
  
  try {
    // Check if cloudinary is loaded
    if (!cloudinary) {
      console.error('❌ Cloudinary not loaded');
      return NextResponse.json({
        success: false,
        message: 'Cloudinary service not available',
      }, { status: 500 });
    }

    console.log('📋 Environment Check:');
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing');
    console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing');
    console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing');

    const formData = await request.formData();
    console.log('📁 FormData received, entries:', Array.from(formData.keys()));
    
    const image = formData.get('image') as File;
    console.log('🖼️ Image file:', image ? `${image.name} (${image.size} bytes)` : 'No image found');

    if (!image) {
      console.log('❌ No image provided in request');
      return NextResponse.json({
        success: false,
        message: 'Image data is required',
      }, { status: 400 });
    }

    // Validate file type
    console.log('🔍 File type:', image.type);
    if (!image.type.startsWith('image/')) {
      console.log('❌ Invalid file type:', image.type);
      return NextResponse.json({
        success: false,
        message: 'Please upload a valid image file',
      }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    console.log('📏 File size:', image.size, 'bytes, max allowed:', maxSize);
    if (image.size > maxSize) {
      console.log('❌ File too large:', image.size);
      return NextResponse.json({
        success: false,
        message: 'Image size must be less than 10MB',
      }, { status: 400 });
    }

    // Convert file to buffer
    console.log('🔄 Converting file to buffer...');
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('✅ Buffer created, size:', buffer.length);

    // Check Cloudinary config
    console.log('☁️ Cloudinary config:', {
      cloud_name: cloudinary.config().cloud_name || 'NOT_SET',
      api_key: cloudinary.config().api_key ? 'SET' : 'NOT_SET',
      api_secret: cloudinary.config().api_secret ? 'SET' : 'NOT_SET'
    });

    // Upload to Cloudinary
    console.log('⬆️ Starting Cloudinary upload...');
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'electronic-store',
          public_id: `img_${Date.now()}`,
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' },
            { format: 'auto' }
          ]
        },
        (error: any, result: any) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary upload success:', result.public_id);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    const result = uploadResult as any;

    console.log('🎉 Upload complete, returning success response');
    return NextResponse.json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        id: result.public_id,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('💥 API Route Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json({
      success: false,
      message: 'Failed to upload image',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 