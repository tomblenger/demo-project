# Quick Start Validation

Follow these steps to validate your monorepo setup:

## ✅ Installation Check

```bash
# 1. Install dependencies
pnpm install

# 2. Check workspace structure
ls -la apps/web/app
# Should show: (admin), (public), api folders

# 3. Verify packages
ls -la packages/
# Should show: db, utils folders
```

## ✅ Environment Setup

```bash
# 1. Copy environment file
cp env.example .env.local

# 2. Update database connection in .env.local
MONGO_URI=mongodb://localhost:27017/oakistni-store

# 3. Add JWT secret
TOKEN_SECRET=your-super-secret-jwt-token-here
```

## ✅ Development Server

```bash
# Start the development server
pnpm dev

# The app should be available at:
# - Store: http://localhost:3000
# - Admin: http://localhost:3000/admin  
# - API: http://localhost:3000/api
```

## ✅ Validation Checklist

Test these URLs to confirm everything works:

### Store Frontend (Public)
- [ ] http://localhost:3000 → Homepage loads
- [ ] http://localhost:3000/shop → Shop page loads
- [ ] http://localhost:3000/cart → Cart page loads

### Admin Panel
- [ ] http://localhost:3000/admin → Redirects to login
- [ ] http://localhost:3000/admin/login → Admin login page loads
- [ ] http://localhost:3000/admin/dashboard → Protected (requires login)

### API Endpoints
- [ ] http://localhost:3000/api/products → Returns JSON product list
- [ ] http://localhost:3000/api/category → Returns JSON category list
- [ ] http://localhost:3000/api/admin → POST login/register endpoint

## ✅ Build Test

```bash
# Test production build
pnpm build

# Should complete without TypeScript errors
```

## 🚨 Common Issues

### Database Connection
- Ensure MongoDB is running locally or update MONGO_URI
- Check firewall/network settings for cloud databases

### Missing Dependencies
```bash
# If you see import errors, try:
pnpm install --force
```

### TypeScript Errors
```bash
# Check workspace TypeScript config:
npx tsc --noEmit

# Fix path aliases if needed in tsconfig.json
```

### Port Already in Use
```bash
# Kill existing Next.js processes:
npx kill-port 3000

# Or use different port:
pnpm dev -- --port 3001
```

## 📚 Next Steps

1. **Database Setup**: Import your existing data or create seed data
2. **Authentication**: Test admin login functionality  
3. **File Uploads**: Configure Cloudinary for image uploads
4. **Payments**: Set up Stripe integration
5. **Deploy**: Push to GitHub and deploy via Vercel

## 🆘 Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is accessible
4. Check that all files are in the correct locations per the README

The migration preserves all original functionality while consolidating into a single deployable application. 