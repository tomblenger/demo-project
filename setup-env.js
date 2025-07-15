const fs = require('fs');
const path = require('path');

// Create root .env.local
const rootEnvContent = `# Database Configuration
MONGODB_URI=your-cloud-mongodb-url-here

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
TOKEN_SECRET=your-super-secret-jwt-key-here

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Payment
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
NEXT_PUBLIC_STRIPE_KEY=your-stripe-key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret`;

// Create web app .env.local
const webEnvContent = `# Database Configuration
MONGODB_URI=your-cloud-mongodb-url-here

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Payment
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret`;

// Create admin app .env.local
const adminEnvContent = `# Database Configuration
MONGODB_URI=your-cloud-mongodb-url-here

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret`;

// Write files
fs.writeFileSync('.env.local', rootEnvContent);
fs.writeFileSync('apps/web/.env.local', webEnvContent);
fs.writeFileSync('apps/admin/.env.local', adminEnvContent);

console.log('✅ Environment files created successfully!');
console.log('');
console.log('📝 NEXT STEPS:');
console.log('1. Replace "your-cloud-mongodb-url-here" with your actual MongoDB cloud URL');
console.log('2. Update other placeholder values as needed');
console.log('3. Run: node seed-data.js (to seed cloud database)');
console.log('4. Run: pnpm dev (to start the apps)');
console.log('');
console.log('🔗 Files created:');
console.log('- .env.local (root)');
console.log('- apps/web/.env.local');
console.log('- apps/admin/.env.local'); 