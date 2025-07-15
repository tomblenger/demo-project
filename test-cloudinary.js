const dotenv = require('dotenv');

// Load environment variables from .env.local first, then .env
dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback to .env if .env.local doesn't exist

// Test Cloudinary configuration
async function testCloudinaryConfig() {
  console.log('🧪 Testing Cloudinary Configuration...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing');
  console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
  console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
  console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET ? '✅ Set' : '❌ Missing');

  // Test Cloudinary connection
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    try {
      console.log('\n🔗 Testing Cloudinary Connection...');
      
      const cloudinary = require('cloudinary').v2;
      
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // Test API connection
      const result = await cloudinary.api.ping();
      console.log('✅ Cloudinary connection successful!');
      console.log('📊 Status:', result.status);
      
      // Get account info
      const usage = await cloudinary.api.usage();
      console.log('💾 Storage used:', usage.storage.usage, 'bytes');
      console.log('🌐 Transformations:', usage.transformations.usage);
      console.log('📊 Requests:', usage.requests.usage);
      
    } catch (error) {
      console.log('❌ Cloudinary connection failed!');
      console.error('Error:', error.message);
      
      if (error.message.includes('Invalid API Key')) {
        console.log('💡 Check your CLOUDINARY_API_KEY');
      } else if (error.message.includes('Invalid API Secret')) {
        console.log('💡 Check your CLOUDINARY_API_SECRET');
      } else if (error.message.includes('Invalid cloud name')) {
        console.log('💡 Check your CLOUDINARY_CLOUD_NAME');
      }
    }
  } else {
    console.log('\n❌ Missing Cloudinary environment variables');
    console.log('💡 Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET');
  }

  // Test Database connection
  if (process.env.MONGODB_URI) {
    try {
      console.log('\n🔗 Testing MongoDB Connection...');
      
      const mongoose = require('mongoose');
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB connection successful!');
      
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      console.log('📊 Database collections:', collections.length);
      
      await mongoose.disconnect();
      
    } catch (error) {
      console.log('❌ MongoDB connection failed!');
      console.error('Error:', error.message);
      console.log('💡 Check your MONGODB_URI');
    }
  } else {
    console.log('\n❌ Missing MONGODB_URI environment variable');
  }

  console.log('\n🎯 Next Steps:');
  console.log('1. Make sure all environment variables are set correctly');
  console.log('2. Start the development server: npm run dev');
  console.log('3. Test image upload in admin panel');
  console.log('4. Check images appear in frontend');
  console.log('5. Verify images are stored in Cloudinary dashboard');
}

// Run the test
testCloudinaryConfig().catch(console.error); 