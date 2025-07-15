import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Order, User } from '@oakistni/db';

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

    // Get recent orders (last 10)
    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    // If no orders, create sample data
    if (recentOrders.length === 0) {
      const sampleOrders = [
        {
          _id: 'sample1',
          invoice: 'INV-001',
          user: { name: 'John Doe', email: 'john@example.com' },
          totalAmount: 299.99,
          status: 'pending',
          createdAt: new Date(),
          orderStatus: 'Processing'
        },
        {
          _id: 'sample2',
          invoice: 'INV-002',
          user: { name: 'Jane Smith', email: 'jane@example.com' },
          totalAmount: 599.99,
          status: 'completed',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          orderStatus: 'Delivered'
        }
      ];

      return NextResponse.json({
        success: true,
        orders: sampleOrders
      }, { headers: corsHeaders });
    }

    // Format orders for dashboard
    const formattedOrders = recentOrders.map(order => ({
      _id: order._id,
      invoice: order.invoice || `INV-${order._id.toString().slice(-6)}`,
      user: {
        name: order.user?.name || 'Unknown User',
        email: order.user?.email || 'unknown@example.com'
      },
      totalAmount: order.totalAmount || 0,
      status: order.status || 'pending',
      orderStatus: order.orderStatus || order.status || 'Processing',
      createdAt: order.createdAt
    }));

    return NextResponse.json({
      success: true,
      orders: formattedOrders
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Recent orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch recent orders' },
      { status: 500, headers: corsHeaders }
    );
  }
} 