import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  // If we have a connection and it's ready, return it
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  // If we have a pending promise, wait for it
  if (cached.promise) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (error) {
      cached.promise = null;
      throw error;
    }
  }

  // Create new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };

    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    
    // Check if we're already connected to the same URI
    if (cached.conn && cached.conn.readyState === 1) {
      return cached.conn;
    }

    console.log('Connecting to MongoDB with URI:', MONGODB_URI);
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Export all models
export { default as Admin } from "./models/Admin";
export { default as Brand } from "./models/Brand";
export { default as Category } from "./models/Category";
export { default as Coupon } from "./models/Coupon";
export { default as Order } from "./models/Order";
export { default as Product } from "./models/Product";
export { default as User } from "./models/User"; 