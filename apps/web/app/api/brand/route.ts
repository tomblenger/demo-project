import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Brand } from '@oakistni/db';

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
    
    const brands = await Brand.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: brands
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Brands GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brands' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST /api/brand - Create new brand (admin only)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Provide default name if not provided
    const brandData = {
      ...body,
      name: body.name || `Brand-${Date.now()}`
    };
    
    // Check if brand with same name already exists
    const existingBrand = await Brand.findOne({ name: brandData.name });
    if (existingBrand) {
      return NextResponse.json(
        { success: false, error: 'Brand with this name already exists' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    const newBrand = new Brand(brandData);
    await newBrand.save();

    return NextResponse.json({
      success: true,
      message: 'Brand added successfully',
      data: newBrand,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Brand POST error:', error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Brand with this name already exists' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to add brand' },
      { status: 500, headers: corsHeaders }
    );
  }
} 

// Handle unsupported HTTP methods
export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405, headers: corsHeaders }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405, headers: corsHeaders }
  );
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405, headers: corsHeaders }
  );
} 