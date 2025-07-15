import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Order } from '@oakistni/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    // Find order by ID
    const order = await Order.findById(id).populate('user', 'name email');

    if (!order) {
      return NextResponse.json({
        success: false,
        message: 'Order not found',
      }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error('Get single order error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to get order',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;
    const body = await request.json();

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
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
      message: 'Order updated successfully',
      data: updatedOrder,
    }, { status: 200 });

  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update order',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 