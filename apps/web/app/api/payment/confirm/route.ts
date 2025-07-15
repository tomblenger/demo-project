import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Order } from '@oakistni/db';

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
    const { paymentIntentId } = body;

    if (!paymentIntentId) {
      return NextResponse.json({
        success: false,
        message: 'Payment intent ID is required'
      }, { status: 400, headers: corsHeaders });
    }

    // Mock payment confirmation
    // In production, you would integrate with Stripe or other payment processors
    const paymentConfirmation = {
      id: paymentIntentId,
      status: 'succeeded',
      amount_received: 1000, // Mock amount
      currency: 'usd',
      payment_method: {
        type: 'card',
        card: {
          last4: '4242',
          brand: 'visa'
        }
      },
      created: Math.floor(Date.now() / 1000)
    };

    return NextResponse.json({
      success: true,
      message: 'Payment confirmed successfully',
      data: paymentConfirmation
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Confirm payment error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to confirm payment' },
      { status: 500, headers: corsHeaders }
    );
  }
} 