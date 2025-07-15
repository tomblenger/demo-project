const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Test the Cloudinary API routes
async function testCloudinaryRoutes() {
  console.log('🧪 Testing Cloudinary API Routes...\n');
  
  const baseUrl = 'http://localhost:3000';
  
  // Test 1: Check if API routes are accessible
  console.log('📋 Testing API Route Accessibility...');
  
  try {
    const response = await fetch(`${baseUrl}/api/cloudinary/add-img`, {
      method: 'POST',
      body: JSON.stringify({ test: 'test' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.status === 400) {
      console.log('✅ API route is accessible (expected 400 for invalid request)');
    } else {
      console.log('❌ Unexpected response status:', response.status);
      const text = await response.text();
      console.log('Response:', text);
    }
  } catch (error) {
    console.log('❌ Failed to reach API route:', error.message);
    console.log('💡 Make sure the development server is running: pnpm run dev');
    return;
  }
  
  // Test 2: Test with form data (without actual file)
  console.log('\n📋 Testing Form Data Handling...');
  
  try {
    const formData = new FormData();
    formData.append('test', 'test');
    
    const response = await fetch(`${baseUrl}/api/cloudinary/add-img`, {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', result);
    
    if (response.status === 400 && result.message === 'Image data is required') {
      console.log('✅ Form data handling is working correctly');
    } else {
      console.log('❌ Unexpected response for form data test');
    }
  } catch (error) {
    console.log('❌ Error testing form data:', error.message);
  }
  
  console.log('\n🔍 API Route Test Complete');
  console.log('💡 If tests pass, try uploading an image in the admin panel');
}

// Create a simple test image buffer for testing
function createTestImage() {
  // Create a simple 1x1 pixel PNG buffer
  const buffer = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
    0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
    0x54, 0x08, 0x1D, 0x01, 0x01, 0x00, 0x00, 0xFF,
    0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00
  ]);
  return buffer;
}

// Run the test
testCloudinaryRoutes().catch(console.error); 