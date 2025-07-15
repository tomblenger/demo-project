import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Category } from '@oakistni/db';

// GET /api/category - Get all categories
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const show = searchParams.get('show');
    
    let query = {};
    if (show === 'true') {
      query = { status: 'Show' };
    }

    const categories = await Category.find(query).populate('products');
    
    return NextResponse.json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    console.error('Categories GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/category - Create new category (admin only)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Provide default parent if not provided
    const categoryData = {
      ...body,
      parent: body.parent || 'Main Category'
    };
    
    const newCategory = new Category(categoryData);
    await newCategory.save();

    return NextResponse.json({
      success: true,
      message: 'Category added successfully',
      data: newCategory,
    });
  } catch (error) {
    console.error('Category POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add category' },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
} 