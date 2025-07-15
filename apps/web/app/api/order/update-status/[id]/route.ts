import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Order } from '@oakistni/db';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid status. Valid statuses are: ' + validStatuses.join(', '),
      }, { status: 400 });
    }

    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('user', 'name email');

    if (!updatedOrder) {
      return NextResponse.json({
        success: false,
        message: 'Order not found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder,
    }, { status: 200 });

  } catch (error) {
    console.error('Update order status error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update order status',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 