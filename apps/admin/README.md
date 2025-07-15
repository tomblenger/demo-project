# Harri Admin Panel 🛡️

A comprehensive e-commerce admin dashboard built with Next.js 13.4, TypeScript, Redux Toolkit, and Tailwind CSS. This admin panel provides complete control over products, categories, orders, brands, coupons, and staff management.

## 🚀 Features

### 📊 Dashboard
- Real-time analytics and sales reports
- Recent orders overview
- Stock management insights
- Revenue tracking with charts

### 🛍️ Product Management
- **Product List View** - Tabular view with sorting and filtering
- **Product Grid View** - Visual grid layout for product browsing
- **Add/Edit Products** - Complete product form with image upload
- **Stock Management** - Inventory tracking and stock alerts
- **Product Reviews** - Customer review management

### 🏷️ Category Management
- Hierarchical category structure
- Category CRUD operations
- Category-wise product organization
- Dynamic category filtering

### 🔖 Brand Management
- Brand registration and management
- Brand-wise product organization
- Brand logo upload and management

### 📦 Order Management
- Order status tracking
- Order details and invoice generation
- Payment status management
- Customer order history

### 🎫 Coupon System
- Discount coupon creation
- Percentage and fixed amount discounts
- Coupon usage tracking
- Expiry date management

### 👥 Staff Management
- Admin user management
- Role-based access control
- Staff profile management
- Authentication system

### 🔐 Authentication
- Secure admin login
- Password reset functionality
- Token-based authentication
- Session management

## 🛠️ Technology Stack

### Frontend
- **Next.js 13.4** - React framework with App Router
- **React 18.2** - JavaScript library for building user interfaces
- **TypeScript 5.0.4** - Static type checking
- **Tailwind CSS 3.3.2** - Utility-first CSS framework
- **Poppins Font** - Google Fonts integration

### State Management
- **Redux Toolkit 1.9.5** - State management
- **RTK Query** - Data fetching and caching
- **React Redux 8.0.5** - React bindings for Redux

### UI Components & Libraries
- **React Hook Form 7.45.1** - Form handling and validation
- **React Select 5.7.3** - Dropdown and multi-select components
- **React Paginate 8.2.0** - Pagination component
- **React Toastify 9.1.3** - Toast notifications
- **SweetAlert2 11.7.12** - Beautiful alert dialogs
- **React Spinners 0.13.8** - Loading indicators

### Charts & Data Visualization
- **Chart.js 4.4.7** - Chart library
- **React ChartJS 2 5.2.0** - React wrapper for Chart.js

### Utilities
- **Day.js 1.11.7** - Date manipulation
- **Cloudinary 1.37.0** - Image upload and management
- **js-cookie 3.0.5** - Cookie management
- **slugify 1.6.6** - URL slug generation
- **Yup 1.2.0** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
harri-admin-panel/
├── public/                          # Static assets
│   ├── assets/
│   │   ├── css/                     # Custom stylesheets
│   │   └── img/                     # Images and icons
│   └── favicon.png
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── add-product/             # Add new product page
│   │   ├── brands/                  # Brand management pages
│   │   ├── category/                # Category management pages
│   │   ├── components/              # Reusable components
│   │   │   ├── auth/                # Authentication components
│   │   │   ├── brand/               # Brand-related components
│   │   │   ├── breadcrumb/          # Navigation breadcrumbs
│   │   │   ├── button/              # Button components
│   │   │   ├── category/            # Category components
│   │   │   ├── chart/               # Chart components
│   │   │   ├── common/              # Common UI components
│   │   │   ├── coupon/              # Coupon components
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   ├── forgot/              # Password reset components
│   │   │   ├── order-details/       # Order detail components
│   │   │   ├── orders/              # Order management components
│   │   │   ├── our-staff/           # Staff management components
│   │   │   ├── products/            # Product components
│   │   │   ├── profile/             # Profile components
│   │   │   ├── tooltip/             # Tooltip components
│   │   │   └── ui/                  # UI utility components
│   │   ├── coupon/                  # Coupon management pages
│   │   ├── dashboard/               # Main dashboard page
│   │   ├── edit-product/            # Product editing pages
│   │   ├── forgot-password/         # Password reset pages
│   │   ├── login/                   # Login page
│   │   ├── order-details/           # Order detail pages
│   │   ├── orders/                  # Order management pages
│   │   ├── our-staff/               # Staff management pages
│   │   ├── product-grid/            # Product grid view
│   │   ├── product-list/            # Product list view
│   │   ├── profile/                 # Admin profile page
│   │   ├── register/                # Registration page
│   │   ├── globals.css              # Global styles
│   │   └── layout.tsx               # Root layout component
│   ├── auth/                        # Authentication utilities
│   ├── data/                        # Static data and configurations
│   │   └── sidebar-menus.ts         # Sidebar navigation menu
│   ├── forms/                       # Form components
│   │   ├── login-form.tsx           # Login form
│   │   └── register-form.tsx        # Registration form
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-auth-check.ts        # Authentication checking
│   │   ├── use-pagination.ts        # Pagination logic
│   │   ├── useBrandSubmit.ts        # Brand form handling
│   │   ├── useCategorySubmit.ts     # Category form handling
│   │   ├── useCloudinary.ts         # Image upload handling
│   │   ├── useCouponSubmit.ts       # Coupon form handling
│   │   ├── useProductSubmit.ts      # Product form handling
│   │   ├── useStaffSubmit.ts        # Staff form handling
│   │   └── useUploadImg.ts          # Image upload utilities
│   ├── layout/                      # Layout components
│   │   ├── component/               # Layout sub-components
│   │   ├── header.tsx               # Header component
│   │   ├── sidebar.tsx              # Sidebar navigation
│   │   └── wrapper.tsx              # Layout wrapper
│   ├── redux/                       # Redux store and slices
│   │   ├── api/
│   │   │   └── apiSlice.ts          # RTK Query API configuration
│   │   ├── auth/                    # Authentication state
│   │   │   ├── authApi.ts           # Auth API endpoints
│   │   │   └── authSlice.ts         # Auth state slice
│   │   ├── brand/                   # Brand state management
│   │   ├── category/                # Category state management
│   │   ├── cloudinary/              # Image upload state
│   │   ├── coupon/                  # Coupon state management
│   │   ├── order/                   # Order state management
│   │   ├── product/                 # Product state management
│   │   ├── provider.tsx             # Redux provider
│   │   └── store.ts                 # Redux store configuration
│   ├── svg/                         # SVG icon components
│   ├── types/                       # TypeScript type definitions
│   │   ├── admin-type.ts            # Admin and staff types
│   │   ├── brand-type.ts            # Brand related types
│   │   ├── category-type.ts         # Category related types
│   │   ├── coupon.ts                # Coupon types
│   │   ├── menu-types.ts            # Navigation menu types
│   │   ├── order-amount-type.ts     # Order and analytics types
│   │   └── product-type.ts          # Product related types
│   └── utils/                       # Utility functions
├── .eslintrc.json                   # ESLint configuration
├── .gitignore                       # Git ignore patterns
├── next.config.js                   # Next.js configuration
├── package.json                     # Dependencies and scripts
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🎨 UI Components

### Dashboard Components
- **CardItems** - Metric cards for quick stats
- **RecentOrders** - Latest order overview
- **SalesReport** - Revenue and sales analytics
- **TopSelling** - Best performing products

### Product Components
- **ProductGrid** - Visual product gallery
- **ProductLists** - Tabular product view
- **AddProduct** - Product creation form
- **EditProduct** - Product modification interface

### Form Components
- **BrandForm** - Brand management forms
- **CategoryForm** - Category creation/editing
- **CouponForm** - Discount coupon forms
- **StaffForm** - Admin user management

### UI Elements
- **Pagination** - Page navigation component
- **ErrorMessage** - Error display component
- **Loading** - Loading state indicators
- **Tooltips** - Interactive help tooltips

## 🔄 Redux Store Structure

### API Slice
Central RTK Query configuration with:
- **Base URL**: Configurable API endpoint
- **Authentication**: JWT token management
- **Cache Tags**: Efficient data invalidation

### State Slices
- **Auth Slice**: User authentication state
- **API Endpoints**: 
  - Authentication (login, register, password reset)
  - Product management (CRUD operations)
  - Category management
  - Brand management
  - Order processing
  - Coupon management
  - Staff administration

### RTK Query Tags
- `DashboardAmount`, `DashboardSalesReport`
- `AllProducts`, `StockOutProducts`, `SingleProduct`
- `AllCategory`, `getCategory`
- `AllBrands`, `getBrand`
- `AllOrders`, `ReviewProducts`
- `AllCoupons`, `Coupon`
- `AllStaff`, `Stuff`

## 🌐 API Endpoints

### Authentication
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login
- `PATCH /api/admin/forget-password` - Request password reset
- `PATCH /api/admin/confirm-forget-password` - Confirm password reset
- `PATCH /api/admin/change-password` - Change password

### Product Management
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Category Management
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Brand Management
- `GET /api/brands` - Get all brands
- `POST /api/brands` - Create brand
- `PUT /api/brands/:id` - Update brand
- `DELETE /api/brands/:id` - Delete brand

### Order Management
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id` - Update order status

### Coupon Management
- `GET /api/coupons` - Get all coupons
- `POST /api/coupons` - Create coupon
- `PUT /api/coupons/:id` - Update coupon
- `DELETE /api/coupons/:id` - Delete coupon

### Staff Management
- `GET /api/admin/all` - Get all staff members
- `POST /api/admin/add` - Add staff member
- `GET /api/admin/get/:id` - Get staff details
- `PATCH /api/admin/update-stuff/:id` - Update staff
- `DELETE /api/admin/:id` - Delete staff member

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# JWT Secret (for backend)
TOKEN_SECRET=your-super-secret-jwt-key-here

# MongoDB Connection (for backend)
MONGODB_URI=mongodb://localhost:27017/harri-admin

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Development Settings
NODE_ENV=development
```

### Backend API Requirement

This admin panel requires a backend API. You can use the main e-commerce API from the `oakistni-mono` project or set up your own backend with the following endpoints structure.

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or later
- npm, yarn, or pnpm
- Backend API server running

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd harri-admin-panel
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📱 Usage

### First Time Setup

1. **Register Admin Account:**
   - Navigate to `/register`
   - Fill in admin details
   - Verify email if required

2. **Login:**
   - Use `/login` to access the dashboard
   - Dashboard will show analytics overview

3. **Setup Categories:**
   - Create product categories first
   - Organize in hierarchical structure

4. **Add Brands:**
   - Register product brands
   - Upload brand logos

5. **Create Products:**
   - Add products with complete details
   - Upload product images
   - Set pricing and inventory

### Navigation

The admin panel uses a sidebar navigation with the following sections:

- **📊 Dashboard** - Analytics and overview
- **🛍️ Products** - Product management (List/Grid/Add)
- **🏷️ Category** - Category management
- **📦 Orders** - Order processing
- **🔖 Brand** - Brand management
- **🎫 Coupons** - Discount management
- **👤 Profile** - Admin profile
- **⚙️ Online Store** - Store settings
- **👥 Our Staff** - Staff management
- **📄 Pages** - Authentication pages

### Key Features Usage

#### Product Management
- **List View**: Table format with sorting, filtering, and bulk actions
- **Grid View**: Visual cards showing product images and key info
- **Add Product**: Multi-step form with image upload and rich text editor
- **Edit Product**: Update existing products with version control

#### Order Processing
- View order details and customer information
- Update order status (pending, processing, shipped, delivered)
- Generate and print invoices
- Track payment status

#### Analytics Dashboard
- Real-time sales metrics
- Revenue charts and graphs
- Best-selling products
- Recent order activity
- Stock alerts for low inventory

## 🎨 Customization

### Theming

The project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Add your brand colors
      },
    },
  },
}
```

### Adding New Pages

1. **Create page component:**
```bash
src/app/new-page/page.tsx
```

2. **Add to sidebar menu:**
```typescript
// src/data/sidebar-menus.ts
const sidebar_menu = [
  // ... existing items
  {
    id: 11,
    icon: YourIcon,
    link: "/new-page",
    title: "New Page",
  },
];
```

3. **Create corresponding components:**
```bash
src/app/components/new-page/
```

### Adding New API Endpoints

1. **Create API slice:**
```typescript
// src/redux/new-feature/newFeatureApi.ts
export const newFeatureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewFeature: builder.query({
      query: () => '/api/new-feature',
      providesTags: ['NewFeature'],
    }),
  }),
});
```

2. **Export hooks:**
```typescript
export const { useGetNewFeatureQuery } = newFeatureApi;
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel:**
```bash
npm i -g vercel
vercel
```

2. **Set environment variables in Vercel dashboard**

3. **Deploy:**
```bash
vercel --prod
```

### Manual Deployment

1. **Build the application:**
```bash
npm run build
```

2. **Copy files to server:**
```bash
# Copy .next/, public/, package.json, next.config.js
```

3. **Install dependencies and start:**
```bash
npm install --production
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### Adding Tests
Create test files alongside components:
```
src/components/dashboard/__tests__/
├── card-items.test.tsx
├── recent-orders.test.tsx
└── sales-report.test.tsx
```

## 🔒 Security

### Authentication
- JWT token-based authentication
- Secure cookie storage
- Token expiration handling
- Role-based access control

### Data Protection
- Input validation with Yup schemas
- XSS protection
- CSRF protection
- Secure API communication

### Best Practices
- Environment variable protection
- Secure headers configuration
- Regular dependency updates
- Code quality checks

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch:**
```bash
git checkout -b feature/amazing-feature
```

3. **Make changes and commit:**
```bash
git commit -m 'Add amazing feature'
```

4. **Push to branch:**
```bash
git push origin feature/amazing-feature
```

5. **Create Pull Request**

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured rules
- **Prettier**: Code formatting
- **Conventional Commits**: Use semantic commit messages

### Component Guidelines

- Use TypeScript for all components
- Follow React hooks best practices
- Implement proper error handling
- Add JSDoc comments for complex functions
- Use custom hooks for reusable logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Getting Help
- Create an issue for bugs or feature requests
- Check existing documentation and README
- Review code comments and TypeScript types

### Troubleshooting

#### Common Issues

1. **Build Errors:**
   - Check TypeScript errors
   - Verify environment variables
   - Clear `.next` cache

2. **API Connection Issues:**
   - Verify `NEXT_PUBLIC_API_BASE_URL`
   - Check backend server status
   - Validate authentication tokens

3. **Style Issues:**
   - Clear browser cache
   - Check Tailwind configuration
   - Verify CSS import order

## 🗺️ Roadmap

### Upcoming Features
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Bulk product operations
- [ ] Advanced filtering and search
- [ ] Real-time notifications
- [ ] Mobile responsive improvements
- [ ] Dark mode theme
- [ ] Export functionality (PDF, Excel)
- [ ] Advanced role management
- [ ] API rate limiting
- [ ] Advanced caching strategies

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Enhanced product management
- **v1.2.0** - Advanced analytics dashboard

---

**Built with ❤️ by the Harri Admin Panel Team**

