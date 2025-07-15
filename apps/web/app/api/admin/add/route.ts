import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Admin } from '@oakistni/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password, role = 'Admin', status = 'Active' } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and password are required',
      }, { status: 400 });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Admin with this email already exists',
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role,
      status,
      joiningDate: new Date(),
    });

    await newAdmin.save();

    // Remove password from response
    const adminResponse = newAdmin.toObject();
    delete adminResponse.password;

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      data: adminResponse,
    }, { status: 201 });

  } catch (error) {
    console.error('Add admin error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create admin',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 