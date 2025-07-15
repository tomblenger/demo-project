import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    return NextResponse.json({
      success: true,
      message: 'API routes are working',
      mongoUri: mongoUri ? 'MongoDB URI is set' : 'MongoDB URI is missing',
      env: {
        NODE_ENV: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI,
      }
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { success: false, error: 'Test API failed' },
      { status: 500 }
    );
  }
} 