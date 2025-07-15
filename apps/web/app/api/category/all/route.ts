import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Category } from '@oakistni/db';

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

    // Get all categories
    const categories = await Category.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: categories
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Get all categories error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories' },
      { status: 500, headers: corsHeaders }
    );
  }
} 