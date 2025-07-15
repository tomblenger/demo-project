import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Order } from '@oakistni/db';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get all orders with populated user data
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('cart.productId', 'title image price')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Get all orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders', data: [] },
      { status: 500, headers: corsHeaders }
    );
  }
} 