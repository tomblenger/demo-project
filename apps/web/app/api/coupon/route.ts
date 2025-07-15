import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Coupon } from '@oakistni/db';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get all coupons
    const coupons = await Coupon.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: 'Coupons retrieved successfully',
      data: coupons
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Get all coupons error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch coupons' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST /api/coupon - Create new coupon (admin only)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.couponCode || !body.endTime || !body.discountPercentage || !body.minimumAmount || !body.productType) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          message: 'Please provide all required fields: title, couponCode, endTime, discountPercentage, minimumAmount, productType'
        },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Validate discount percentage
    const discountPercentage = Number(body.discountPercentage);
    if (isNaN(discountPercentage) || discountPercentage <= 0 || discountPercentage > 100) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid discount percentage',
          message: 'Discount percentage must be between 1 and 100'
        },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Validate minimum amount
    const minimumAmount = Number(body.minimumAmount);
    if (isNaN(minimumAmount) || minimumAmount < 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid minimum amount',
          message: 'Minimum amount must be a valid positive number'
        },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Validate end time
    const endTime = new Date(body.endTime);
    if (isNaN(endTime.getTime())) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid end time',
          message: 'Please provide a valid end time'
        },
        { status: 400, headers: corsHeaders }
      );
    }
    
    if (endTime <= new Date()) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid end time',
          message: 'End time must be in the future'
        },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ couponCode: body.couponCode.toUpperCase() });
    if (existingCoupon) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Duplicate coupon code',
          message: 'Coupon with this code already exists'
        },
        { status: 409, headers: corsHeaders }
      );
    }
    
    // Prepare coupon data with validation
    const couponData = {
      title: body.title.trim(),
      logo: body.logo || 'https://via.placeholder.com/150',
      couponCode: body.couponCode.trim().toUpperCase(),
      endTime: endTime,
      discountPercentage: discountPercentage,
      minimumAmount: minimumAmount,
      productType: body.productType.trim()
    };
    
    const newCoupon = new Coupon(couponData);
    await newCoupon.save();

    return NextResponse.json({
      success: true,
      message: 'Coupon added successfully',
      data: newCoupon,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('Coupon POST error:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          message: errors.join(', '),
          errorMessages: errors.map(msg => ({ message: msg }))
        },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Duplicate entry',
          message: 'Coupon with this code already exists'
        },
        { status: 409, headers: corsHeaders }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to add coupon. Please try again.'
      },
      { status: 500, headers: corsHeaders }
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