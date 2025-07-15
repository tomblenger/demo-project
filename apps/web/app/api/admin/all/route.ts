import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Admin } from '@oakistni/db';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get all admin users (excluding password)
    const admins = await Admin.find({}, { password: 0 })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: 'Admin users retrieved successfully',
      data: admins
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Get all admins error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch admin users' },
      { status: 500, headers: corsHeaders }
    );
  }
} 