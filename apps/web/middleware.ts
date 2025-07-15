import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Handle CORS for all API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'true',
        },
      });
    }

    // Add CORS headers to all API responses
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    
    return response;
  }

  // Handle /admin root redirect - check if user is authenticated first
  if (request.nextUrl.pathname === '/admin') {
    const adminInfo = request.cookies.get('adminInfo');
    
    if (!adminInfo?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const adminData = JSON.parse(adminInfo.value);
      if (adminData.user && adminData.user.role === 'Admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Only run authentication on admin routes (but not login/register)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow login and register pages
    if (
      request.nextUrl.pathname === '/admin/login' ||
      request.nextUrl.pathname === '/admin/register' ||
      request.nextUrl.pathname.startsWith('/admin/forgot-password')
    ) {
      return NextResponse.next();
    }

    // Check for authentication cookie
    const adminInfo = request.cookies.get('adminInfo');
    
    if (!adminInfo?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Parse the cookie value which should be JSON
      const adminData = JSON.parse(adminInfo.value);
      
      // Check if user exists and has Admin role
      if (!adminData.user || adminData.user.role !== 'Admin') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      // If everything is valid, continue
      return NextResponse.next();
    } catch (error) {
      // If parsing fails, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
}; 