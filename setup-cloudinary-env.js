const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Cloudinary Environment Configuration...\n');

// Prompt user for Cloudinary credentials
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function setupEnvironment() {
  console.log('📋 Please provide your Cloudinary credentials:');
  console.log('   (You can find these in your Cloudinary Dashboard)\n');
  
  const cloudName = await askQuestion('Enter your CLOUDINARY_CLOUD_NAME: ');
  const apiKey = await askQuestion('Enter your CLOUDINARY_API_KEY: ');
  const apiSecret = await askQuestion('Enter your CLOUDINARY_API_SECRET: ');
  
  console.log('\n📋 Optional: Provide other configurations (press Enter to skip):');
  const jwtSecret = await askQuestion('JWT_SECRET (or press Enter for default): ') || 'your-super-secret-jwt-key-here-minimum-32-characters-long';
  const mongoUri = await askQuestion('MONGODB_URI (or press Enter for default): ') || 'mongodb://localhost:27017/electronic-store';
  
  rl.close();
  
  // Root .env.local content
  const rootEnvContent = `# Database Configuration
MONGODB_URI=${mongoUri}

# Authentication
JWT_SECRET=${jwtSecret}
TOKEN_SECRET=${jwtSecret}

# Cloudinary Configuration (Image Storage)
CLOUDINARY_CLOUD_NAME=${cloudName}
CLOUDINARY_API_KEY=${apiKey}
CLOUDINARY_API_SECRET=${apiSecret}

# Stripe Payment Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# App Configuration
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret`;

  // Web app .env.local content
  const webEnvContent = `# Database Configuration
MONGODB_URI=${mongoUri}

# Authentication
JWT_SECRET=${jwtSecret}
TOKEN_SECRET=${jwtSecret}

# Cloudinary Configuration (Image Storage)
CLOUDINARY_CLOUD_NAME=${cloudName}
CLOUDINARY_API_KEY=${apiKey}
CLOUDINARY_API_SECRET=${apiSecret}

# Stripe Payment Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# App Configuration
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret`;

  // Admin app .env.local content
  const adminEnvContent = `# Database Configuration
MONGODB_URI=${mongoUri}

# Authentication
JWT_SECRET=${jwtSecret}
TOKEN_SECRET=${jwtSecret}

# Cloudinary Configuration (Image Storage)
CLOUDINARY_CLOUD_NAME=${cloudName}
CLOUDINARY_API_KEY=${apiKey}
CLOUDINARY_API_SECRET=${apiSecret}

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# App Configuration
NODE_ENV=development`;

  try {
    // Create .env.local files
    fs.writeFileSync('.env.local', rootEnvContent);
    console.log('✅ Created root .env.local');
    
    fs.writeFileSync('apps/web/.env.local', webEnvContent);
    console.log('✅ Created apps/web/.env.local');
    
    fs.writeFileSync('apps/admin/.env.local', adminEnvContent);
    console.log('✅ Created apps/admin/.env.local');
    
    console.log('\n🎉 Environment files created successfully!');
    console.log('\n🔍 Next steps:');
    console.log('1. Run: pnpm run test:cloudinary');
    console.log('2. If tests pass, run: pnpm run dev');
    console.log('3. Test image upload in admin panel');
    console.log('4. Check images appear in frontend');
    console.log('5. Verify images are stored in Cloudinary dashboard');
    
  } catch (error) {
    console.error('❌ Error creating environment files:', error.message);
  }
}

setupEnvironment().catch(console.error); 