# Admin Panel Troubleshooting Guide

## Issues Addressed
1. Product images not showing in admin panel
2. Different product counts between frontend and admin panel

## 🔧 Quick Fixes

### 1. Set Up Environment Variables

Create `.env.local` files in both app directories:

**File: `oakistni-mono/apps/admin/.env.local`**
```env
# API Configuration - Point to the web app where the API routes are
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Database Configuration  
MONGODB_URI=mongodb://localhost:27017/electronic-store

# JWT Secret
TOKEN_SECRET=your-super-secret-jwt-token-minimum-32-characters
JWT_SECRET=your-super-secret-jwt-token-minimum-32-characters

# Development Settings
NODE_ENV=development
```

**File: `oakistni-mono/apps/web/.env.local`**
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/electronic-store

# JWT Secret
TOKEN_SECRET=your-super-secret-jwt-token-minimum-32-characters
JWT_SECRET=your-super-secret-jwt-token-minimum-32-characters

# Development Settings
NODE_ENV=development
```

### 2. Start the Applications in Correct Order

```bash
# Terminal 1: Start the web app (includes API routes)
cd oakistni-mono
npm run dev

# This will start:
# - Web app on http://localhost:3000 (with API routes)
# - Admin app on http://localhost:3001
```

### 3. Seed the Database

```bash
# Make sure MongoDB is running, then:
cd oakistni-mono
node seed-data.js
```

### 4. Test the Setup

1. **Check API Debug Panel**: Visit `http://localhost:3001/dashboard` and look for the "🔧 API Debug Panel" at the top
2. **Verify API Connection**: The debug panel should show:
   - Status: SUCCESS
   - Total Products: 6
   - All products should have images

### 5. Common Issues and Solutions

#### Problem: API Debug Panel shows "ERROR"
**Solution**: 
- Ensure web app is running on port 3000
- Check if MongoDB is running: `mongosh` or `mongo`
- Verify environment variables are set correctly

#### Problem: Images show "Error" or "No Image"
**Solutions**:
1. **Check Internet Connection**: Images are loaded from Unsplash
2. **Verify Next.js Image Configuration**: 
   - Check `apps/admin/next.config.js` includes `images.unsplash.com`
   - Restart the admin app after any config changes
3. **Check Browser Console**: Look for CORS or network errors

#### Problem: Different Product Counts
**Causes & Solutions**:
1. **Database not seeded**: Run `node seed-data.js`
2. **API connection issues**: Check debug panel
3. **Caching issues**: Clear browser cache or restart apps

### 6. Development Workflow

```bash
# Start development servers
cd oakistni-mono
npm run dev

# Access applications:
# Frontend: http://localhost:3000
# Admin Panel: http://localhost:3001
# API: http://localhost:3000/api/*
```

### 7. Debug API Manually

Test the API directly:
```bash
# Test products API
curl http://localhost:3000/api/products/all

# Should return JSON with success: true and data array
```

### 8. Reset Everything

If issues persist:
```bash
# 1. Stop all servers
# 2. Clear database
mongosh electronic-store --eval "db.dropDatabase()"

# 3. Reseed database
node seed-data.js

# 4. Clear browser cache
# 5. Restart servers
npm run dev
```

## 🚀 Improvements Made

1. **Added API Debug Panel**: Shows real-time API status and product data
2. **Enhanced Error Handling**: Better error messages with debugging info
3. **Image Error Handling**: Fallback displays for broken/missing images
4. **Environment Configuration**: Proper API URL configuration

## 📊 Expected Results

After following this guide:
- ✅ Admin panel should display all 6 products
- ✅ Product images should load correctly from Unsplash
- ✅ Same product count in both frontend and admin
- ✅ Debug panel shows "SUCCESS" status

## 🆘 Still Having Issues?

1. Check browser console for errors
2. Verify MongoDB connection: `mongosh electronic-store`
3. Test API manually: `curl http://localhost:3000/api/products/all`
4. Ensure ports 3000 and 3001 are not blocked by firewall 