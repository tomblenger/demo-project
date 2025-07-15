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

// Simple in-memory rate limiting (in production, use Redis)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier);
  
  if (!attempts) {
    return false;
  }
  
  // Reset if lockout period has passed
  if (now - attempts.lastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(identifier);
    return false;
  }
  
  return attempts.count >= MAX_ATTEMPTS;
}

function recordLoginAttempt(identifier: string, success: boolean): void {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier) || { count: 0, lastAttempt: now };
  
  if (success) {
    // Reset on successful login
    loginAttempts.delete(identifier);
  } else {
    // Increment failed attempts
    attempts.count += 1;
    attempts.lastAttempt = now;
    loginAttempts.set(identifier, attempts);
  }
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();
    
    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Rate limiting check
    const identifier = email.toLowerCase();
    if (isRateLimited(identifier)) {
      return NextResponse.json(
        { success: false, message: 'Too many login attempts. Please try again later.' },
        { status: 429, headers: corsHeaders }
      );
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      recordLoginAttempt(identifier, false);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check password using User model's comparePassword method
    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      recordLoginAttempt(identifier, false);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check if user is active
    if (user.status !== 'active') {
      recordLoginAttempt(identifier, false);
      return NextResponse.json(
        { success: false, message: 'Account is not active' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Record successful login
    recordLoginAttempt(identifier, true);

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Return user data (excluding password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
} 