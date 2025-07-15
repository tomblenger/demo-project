import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Product } from '@oakistni/db';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags');
    
    if (!tags) {
      return NextResponse.json({
        success: false,
        error: 'Tags parameter is required'
      }, { status: 400 });
    }
    
    const tagArray = tags.split(',');
    
    // Get products with matching tags
    const products = await Product.find({ 
      status: 'active',
      tags: { $in: tagArray }
    }).limit(10);
    
    return NextResponse.json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error('Related products GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch related products' },
      { status: 500 }
    );
  }
} 