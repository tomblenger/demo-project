import { NextRequest, NextResponse } from 'next/server';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'usd' } = body;

    if (!amount) {
      return NextResponse.json({
        success: false,
        message: 'Amount is required'
      }, { status: 400, headers: corsHeaders });
    }

    // Mock payment intent creation
    // In production, you would integrate with Stripe or other payment processors
    const paymentIntent = {
      id: `pi_mock_${Date.now()}`,
      amount: amount,
      currency: currency,
      status: 'requires_payment_method',
      client_secret: `pi_mock_${Date.now()}_secret`,
      created: Math.floor(Date.now() / 1000)
    };

    return NextResponse.json({
      success: true,
      message: 'Payment intent created successfully',
      data: paymentIntent
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Create payment intent error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create payment intent' },
      { status: 500, headers: corsHeaders }
    );
  }
} 