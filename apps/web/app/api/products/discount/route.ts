import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Product } from '@oakistni/db';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get products with discount > 0
    const products = await Product.find({ 
      status: 'active',
      discount: { $gt: 0 }
    }).limit(20);
    
    return NextResponse.json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error('Products discount GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discount products' },
      { status: 500 }
    );
  }
} 