import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Category } from '@oakistni/db';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

// GET single category
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const category = await Category.findById(id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: category
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Category GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// UPDATE category
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await request.json();
    const category = await Category.findByIdAndUpdate(id, body, { new: true });
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      data: category
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Category PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE category
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('Category DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500, headers: corsHeaders }
    );
  }
} 