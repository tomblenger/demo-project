import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Product } from '@oakistni/db';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const products = await Product.find({ status: 'active' }).limit(20);
    
    return NextResponse.json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error('Products show GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 