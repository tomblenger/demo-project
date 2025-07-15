import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Category } from '@oakistni/db';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const categories = await Category.find({ status: 'Show' });
    
    return NextResponse.json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    console.error('Category show GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 