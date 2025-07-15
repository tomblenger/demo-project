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
    const { email, name, preferences = [] } = await request.json();
    
    // Validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400, headers: corsHeaders }
      );
    }

    // In a real application, you would:
    // 1. Save to newsletter database/service (like Mailchimp, SendGrid, etc.)
    // 2. Send welcome email
    // 3. Handle existing subscribers
    
    console.log('Newsletter subscription:', {
      email,
      name: name || 'Anonymous',
      preferences,
      timestamp: new Date().toISOString(),
      source: 'website'
    });

    // Simulate API call to newsletter service
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      subscriber: {
        email,
        name: name || null,
        subscribedAt: new Date().toISOString(),
        status: 'active'
      }
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again later.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET method to check subscription status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // In a real app, check if email is subscribed
    // For now, simulate response
    return NextResponse.json({
      success: true,
      subscribed: false, // Default to not subscribed
      email
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Newsletter check error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check subscription status' },
      { status: 500, headers: corsHeaders }
    );
  }
} 