import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Brand } from '@oakistni/db';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

// GET single brand
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const brand = await Brand.findById(id);
    
    if (!brand) {
      return NextResponse.json(
        { success: false, message: 'Brand not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: brand
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Brand GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brand' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// UPDATE brand
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await request.json();
    const brand = await Brand.findByIdAndUpdate(id, body, { new: true });
    
    if (!brand) {
      return NextResponse.json(
        { success: false, message: 'Brand not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Brand updated successfully',
      data: brand
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Brand PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update brand' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE brand
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const brand = await Brand.findByIdAndDelete(id);
    
    if (!brand) {
      return NextResponse.json(
        { success: false, message: 'Brand not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Brand deleted successfully'
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Brand DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete brand' },
      { status: 500, headers: corsHeaders }
    );
  }
} 