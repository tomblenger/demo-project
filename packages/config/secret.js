const secret = {
  // Database
  database_url: process.env.MONGODB_URI,
  
  // JWT
  jwt_secret: process.env.JWT_SECRET,
  jwt_secret_for_verify: process.env.JWT_SECRET,
  token_secret: process.env.TOKEN_SECRET || process.env.JWT_SECRET,
  
  // Cloudinary
  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  
  // Email
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  
  // Environment
  env: process.env.NODE_ENV || 'development',
  
  // App URLs
  app_url: process.env.APP_URL || 'http://localhost:3000',
  admin_url: process.env.ADMIN_URL || 'http://localhost:3001',
};

module.exports = { secret }; 