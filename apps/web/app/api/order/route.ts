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

    // Get all orders
    const orders = await Order.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders,
      count: orders.length
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Get all orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const newOrder = new Order(body);
    await newOrder.save();
    
    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: newOrder
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500, headers: corsHeaders }
    );
  }
} 