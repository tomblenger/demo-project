import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Product } from '@oakistni/db';

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

    // Get all products with populated categories and brands
    const products = await Product.find({})
      .populate('category', 'name parent')
      .populate('brand', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      products: products
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Get all products error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500, headers: corsHeaders }
    );
  }
} 