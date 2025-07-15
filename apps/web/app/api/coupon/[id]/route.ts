import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Coupon } from '@oakistni/db';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

// GET single coupon
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const coupon = await Coupon.findById(id);
    
    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: coupon
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Coupon GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupon' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// UPDATE coupon
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await request.json();
    const coupon = await Coupon.findByIdAndUpdate(id, body, { new: true });
    
    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Coupon updated successfully',
      data: coupon
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Coupon PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update coupon' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE coupon
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    
    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Coupon deleted successfully'
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Coupon DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete coupon' },
      { status: 500, headers: corsHeaders }
    );
  }
} 