import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Order } from '@oakistni/db';

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
    const userId = searchParams.get('userId');

    let query = {};
    if (userId) {
      query = { userId: userId };
    }

    // Get user orders
    const orders = await Order.find(query)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: 'User orders retrieved successfully',
      data: orders,
      count: orders.length
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Get user orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user orders' },
      { status: 500, headers: corsHeaders }
    );
  }
} 