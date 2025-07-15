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

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('searchTerm') || '';

    if (!searchTerm) {
      return NextResponse.json({
        success: false,
        message: 'Search term is required'
      }, { status: 400, headers: corsHeaders });
    }

    // Search products by title, description, or tags
    const products = await Product.find({
      $and: [
        { status: 'active' },
        {
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { tags: { $in: [new RegExp(searchTerm, 'i')] } },
            { 'category.name': { $regex: searchTerm, $options: 'i' } },
            { 'brand.name': { $regex: searchTerm, $options: 'i' } }
          ]
        }
      ]
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: `Found ${products.length} products`,
      data: products,
      searchTerm,
      count: products.length
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Search products error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to search products' },
      { status: 500, headers: corsHeaders }
    );
  }
} 