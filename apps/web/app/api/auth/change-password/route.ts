import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, User } from '@oakistni/db';
import * as bcrypt from 'bcryptjs';
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

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect();
    
    const authorization = request.headers.get('Authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401, headers: corsHeaders }
      );
    }

    const token = authorization.split(' ')[1];
    const { currentPassword, newPassword } = await request.json();
    
    // Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Current password and new password are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 6 characters long' },
        { status: 400, headers: corsHeaders }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
      
      // Find user
      const user = await User.findById(decoded.id);
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404, headers: corsHeaders }
        );
      }

      // Check current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { success: false, message: 'Current password is incorrect' },
          { status: 400, headers: corsHeaders }
        );
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      
      // Update password
      await User.findByIdAndUpdate(decoded.id, { password: hashedNewPassword });

      return NextResponse.json({
        success: true,
        message: 'Password changed successfully'
      }, { headers: corsHeaders });

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401, headers: corsHeaders }
      );
    }

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
} 