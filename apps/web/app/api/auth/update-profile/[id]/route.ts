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

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
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
    const { name, email, phone, address } = await request.json();
    const { id } = await context.params;
    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
      
      // Check if user is updating their own profile or has admin privileges
      if (decoded.id !== id && decoded.role !== 'admin') {
        return NextResponse.json(
          { success: false, message: 'Unauthorized to update this profile' },
          { status: 403, headers: corsHeaders }
        );
      }
      
      // Find user
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404, headers: corsHeaders }
        );
      }

      // Check if email is already taken by another user
      if (email !== user.email) {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
          return NextResponse.json(
            { success: false, message: 'Email is already taken' },
            { status: 400, headers: corsHeaders }
          );
        }
      }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          name,
          email: email.toLowerCase(),
          phone,
          address
        },
        { new: true }
      ).select('-password');

      // Generate new token with updated user info
      const newToken = jwt.sign(
        { 
          id: updatedUser._id, 
          email: updatedUser.email, 
          role: updatedUser.role 
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully',
        token: newToken,
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          status: updatedUser.status,
          phone: updatedUser.phone,
          address: updatedUser.address
        }
      }, { headers: corsHeaders });

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401, headers: corsHeaders }
      );
    }

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
} 