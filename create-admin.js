require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const createAdmin = async () => {
  try {
    await connectDB();

    // Import Admin model
    const Admin = require('./packages/db/models/Admin');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('📧 Email: admin@example.com');
      console.log('🔐 Password: 12345678');
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('12345678', 12),
      role: 'Admin',
      status: 'Active',
      joiningDate: new Date()
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔐 Password: 12345678');
    console.log('👤 Role: Admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

// Run the script
createAdmin(); 