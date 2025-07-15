# 🖼️ Cloudinary Setup and Configuration Guide

## 📋 Overview
This guide will help you configure Cloudinary for image storage in both the admin panel and frontend application.

## 🔧 Environment Configuration

### Web App (.env.local)
Create `apps/web/.env.local` with the following content:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/electronic-store

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
TOKEN_SECRET=your-super-secret-jwt-key-here-minimum-32-characters

# Cloudinary Configuration (Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

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
NEXTAUTH_SECRET=your-nextauth-secret
```

### Admin App (.env.local)
Create `apps/admin/.env.local` with the following content:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/electronic-store

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
TOKEN_SECRET=your-super-secret-jwt-key-here-minimum-32-characters

# Cloudinary Configuration (Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# App Configuration
NODE_ENV=development
```

## 🚀 Implementation Details

### ✅ What Has Been Implemented

1. **API Routes Created:**
   - `/api/cloudinary/add-img` - Single image upload
   - `/api/cloudinary/add-multiple-img` - Multiple image upload
   - `/api/cloudinary/img-delete` - Image deletion

2. **Shared Utilities:**
   - `packages/utils/cloudinary.js` - Centralized Cloudinary configuration
   - Helper functions for upload and delete operations

3. **Features:**
   - Image validation (type and size)
   - Automatic image optimization
   - Organized folder structure on Cloudinary
   - Error handling and validation

### 🏗️ Folder Structure on Cloudinary

Images are organized in the following structure:
```
electronic-store/
├── img_[timestamp] (single images)
└── gallery/
    └── gallery_[timestamp]_[index] (multiple images)
```

### 🔍 How It Works

1. **Image Upload Process:**
   - Files are validated for type and size
   - Converted to buffers for processing
   - Uploaded to Cloudinary with transformations
   - URLs and IDs are returned to the client

2. **Image Deletion Process:**
   - Public ID is constructed from folder and image ID
   - Image is deleted from Cloudinary
   - Success/failure status is returned

3. **Database Storage:**
   - Only Cloudinary URLs are stored in MongoDB
   - No binary data is stored in the database
   - Images are referenced by their secure URLs

## 🔧 Configuration Steps

1. **Get Cloudinary Credentials:**
   - Sign up at [cloudinary.com](https://cloudinary.com)
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret

2. **Update Environment Files:**
   - Replace placeholders with your actual credentials
   - Ensure both web and admin apps have the same Cloudinary config

3. **Test the Setup:**
   - Start both applications
   - Try uploading images in admin panel
   - Verify images appear in frontend

## 📁 File Locations

- **API Routes:** `apps/web/app/api/cloudinary/`
- **Shared Utils:** `packages/utils/cloudinary.js`
- **Frontend Redux:** `apps/web/src/redux/cloudinary/`
- **Admin Redux:** `apps/admin/src/redux/cloudinary/`

## 🧪 Testing

### Test Single Image Upload
```bash
curl -X POST http://localhost:3000/api/cloudinary/add-img \
  -F "image=@/path/to/your/image.jpg"
```

### Test Multiple Image Upload
```bash
curl -X POST http://localhost:3000/api/cloudinary/add-multiple-img \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

### Test Image Deletion
```bash
curl -X DELETE "http://localhost:3000/api/cloudinary/img-delete?folder_name=electronic-store&id=img_1234567890"
```

## 🚨 Important Notes

1. **Database Storage:** Images are stored as URLs in MongoDB, not as binary data
2. **Security:** Never expose your Cloudinary API Secret in client-side code
3. **File Limits:** Maximum file size is 10MB per image
4. **Validation:** Only image files are accepted (jpg, png, gif, webp, etc.)
5. **Optimization:** Images are automatically optimized for web delivery

## 🔒 Security Best Practices

1. Keep your Cloudinary credentials secure
2. Use environment variables for all secrets
3. Implement proper authentication for upload endpoints
4. Validate file types and sizes on the server
5. Use HTTPS in production

## 📊 Monitoring

- Check Cloudinary dashboard for usage statistics
- Monitor API response times
- Track failed uploads in application logs
- Set up alerts for quota limits

## 🛠️ Troubleshooting

### Common Issues:

1. **"Invalid credentials"** - Check your API Key and Secret
2. **"Upload failed"** - Verify file size and type
3. **"Image not found"** - Check the public ID format
4. **"Rate limited"** - You've exceeded Cloudinary's free tier limits

### Debug Steps:

1. Check environment variables are loaded
2. Verify Cloudinary credentials in dashboard
3. Test with curl commands
4. Check browser network tab for errors
5. Review server logs for detailed error messages 