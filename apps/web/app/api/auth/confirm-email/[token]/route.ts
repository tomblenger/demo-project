import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, User } from '@oakistni/db';
import * as jwt from 'jsonwebtoken';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function GET(request: NextRequest, context: { params: Promise<{ token: string }> }) {
  try {
    await dbConnect();
    
    const { token } = await context.params;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Verification token is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    try {
      // Verify the confirmation token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
      
      // Find user
      const user = await User.findById(decoded.id);
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404, headers: corsHeaders }
        );
      }

      // Update user verification status
      await User.findByIdAndUpdate(decoded.id, { 
        isEmailVerified: true,
        status: 'active'
      });

      // Generate new login token
      const loginToken = jwt.sign(
        { 
          id: user._id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        success: true,
        message: 'Email verified successfully',
        token: loginToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: 'active'
        }
      }, { headers: corsHeaders });

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification token' },
        { status: 400, headers: corsHeaders }
      );
    }

  } catch (error) {
    console.error('Confirm email error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
} 