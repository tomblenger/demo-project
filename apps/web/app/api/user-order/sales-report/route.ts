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

    // Get orders from the last 30 days
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdAt: {
        $gte: thirtyDaysAgo,
        $lte: today
      }
    }).sort({ createdAt: 1 });

    // Group orders by date
    const salesData: { [key: string]: { total: number; order: number } } = {};

    // Initialize last 30 days with zero values
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      salesData[dateStr] = { total: 0, order: 0 };
    }

    // Aggregate actual order data
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      if (salesData[orderDate]) {
        salesData[orderDate].total += order.totalAmount || 0;
        salesData[orderDate].order += 1;
      }
    });

    // Convert to array format for charts
    const salesReport = Object.keys(salesData).map(date => {
      const dateObj = new Date(date);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const formattedDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate().toString().padStart(2, '0')}`;
      
      return {
        date: formattedDate,
        total: salesData[date].total,
        order: salesData[date].order
      };
    });

    return NextResponse.json({
      success: true,
      salesReport
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Sales report error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch sales report' },
      { status: 500, headers: corsHeaders }
    );
  }
} 