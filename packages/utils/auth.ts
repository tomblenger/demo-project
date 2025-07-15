// Use dynamic import for JWT to avoid Edge Runtime issues
let jwt: any;
import { NextRequest, NextResponse } from "next/server";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "fallback-secret-key-for-development-only-change-in-production";

export interface JWTPayload {
  email: string;
  role: string;
  id: string;
}

// Generate JWT token
export async function generateToken(payload: JWTPayload): Promise<string> {
  if (!jwt) {
    jwt = await import("jsonwebtoken");
  }
  return jwt.default.sign(payload, TOKEN_SECRET, { expiresIn: "7d" });
}

// Verify JWT token for API routes
export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    if (!jwt) {
      jwt = await import("jsonwebtoken");
    }
    return jwt.default.verify(token, TOKEN_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

// Middleware helper for API routes
export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    try {
      const token = req.headers.get("authorization")?.split(" ")[1];
      
      if (!token) {
        return NextResponse.json(
          { status: "fail", error: "You are not logged in" },
          { status: 401 }
        );
      }

      const decoded = verifyToken(token);
      (req as any).user = decoded;

      return handler(req);
    } catch (error) {
      return NextResponse.json(
        { status: "fail", error: "Invalid token" },
        { status: 403 }
      );
    }
  };
}

// Authorization helper
export function withAuthorization(roles: string[]) {
  return (handler: Function) => {
    return async (req: NextRequest) => {
      const user = (req as any).user;
      
      if (!roles.includes(user?.role)) {
        return NextResponse.json(
          { status: "fail", error: "You are not authorized to access this" },
          { status: 403 }
        );
      }

      return handler(req);
    };
  };
}

export default verifyToken; 