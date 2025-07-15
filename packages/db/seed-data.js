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

// Sample Categories
const categories = [
  {
    parent: 'Smartphones',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    children: ['iPhone', 'Samsung', 'Google Pixel'],
    description: 'Mobile phones and smartphones',
    status: 'Show'
  },
  {
    parent: 'Laptops',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    children: ['Gaming', 'Business', 'Ultrabooks'],
    description: 'Portable computers and laptops',
    status: 'Show'
  },
  {
    parent: 'Headphones',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    children: ['Wireless', 'Wired', 'Gaming'],
    description: 'Premium audio headphones',
    status: 'Show'
  },
  {
    parent: 'Speakers',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400',
    children: ['Bluetooth', 'Smart', 'Portable'],
    description: 'High-quality speakers and sound systems',
    status: 'Show'
  },
  {
    parent: 'Tablets',
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    children: ['iPad', 'Android', 'Windows'],
    description: 'Tablets and portable devices',
    status: 'Show'
  },
  {
    parent: 'Gaming',
    img: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400',
    children: ['Consoles', 'Accessories', 'Controllers'],
    description: 'Gaming consoles and accessories',
    status: 'Show'
  },
  {
    parent: 'Cameras',
    img: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
    children: ['DSLR', 'Mirrorless', 'Action'],
    description: 'Professional cameras and equipment',
    status: 'Show'
  },
  {
    parent: 'Smartwatches',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    children: ['Apple Watch', 'Samsung Galaxy', 'Fitness'],
    description: 'Smart wearable devices',
    status: 'Show'
  }
];

// Sample Brands
const brands = [
  {
    name: 'Apple',
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200',
    email: 'info@apple.com',
    website: 'https://apple.com',
    description: 'Innovative technology company',
    location: 'Cupertino, CA',
    status: 'active'
  },
  {
    name: 'Samsung',
    logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200',
    email: 'info@samsung.com',
    website: 'https://samsung.com',
    description: 'Innovative electronics manufacturer',
    location: 'Seoul, South Korea',
    status: 'active'
  },
  {
    name: 'Sony',
    logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
    email: 'support@sony.com',
    website: 'https://sony.com',
    description: 'Entertainment and electronics',
    location: 'Tokyo, Japan',
    status: 'active'
  },
  {
    name: 'Dell',
    logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200',
    email: 'info@dell.com',
    website: 'https://dell.com',
    description: 'Computer technology solutions',
    location: 'Round Rock, TX',
    status: 'active'
  },
  {
    name: 'HP',
    logo: 'https://images.unsplash.com/photo-1633114127408-af671c774b39?w=200',
    email: 'info@hp.com',
    website: 'https://hp.com',
    description: 'Personal computing and printing',
    location: 'Palo Alto, CA',
    status: 'active'
  },
  {
    name: 'Lenovo',
    logo: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200',
    email: 'info@lenovo.com',
    website: 'https://lenovo.com',
    description: 'Global technology leader',
    location: 'Beijing, China',
    status: 'active'
  },
  {
    name: 'Canon',
    logo: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200',
    email: 'info@canon.com',
    website: 'https://canon.com',
    description: 'Imaging and optical products',
    location: 'Tokyo, Japan',
    status: 'active'
  },
  {
    name: 'Bose',
    logo: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200',
    email: 'info@bose.com',
    website: 'https://bose.com',
    description: 'Premium audio equipment',
    location: 'Framingham, MA',
    status: 'active'
  },
  {
    name: 'JBL',
    logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200',
    email: 'info@jbl.com',
    website: 'https://jbl.com',
    description: 'Professional audio solutions',
    location: 'Los Angeles, CA',
    status: 'active'
  },
  {
    name: 'Microsoft',
    logo: 'https://images.unsplash.com/photo-1633114127408-af671c774b39?w=200',
    email: 'info@microsoft.com',
    website: 'https://microsoft.com',
    description: 'Software and cloud computing',
    location: 'Redmond, WA',
    status: 'active'
  },
  {
    name: 'Google',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200',
    email: 'info@google.com',
    website: 'https://google.com',
    description: 'Internet services and products',
    location: 'Mountain View, CA',
    status: 'active'
  },
  {
    name: 'OnePlus',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200',
    email: 'info@oneplus.com',
    website: 'https://oneplus.com',
    description: 'Premium smartphone manufacturer',
    location: 'Shenzhen, China',
    status: 'active'
  },
  {
    name: 'Xiaomi',
    logo: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200',
    email: 'info@xiaomi.com',
    website: 'https://xiaomi.com',
    description: 'Consumer electronics and mobile phones',
    location: 'Beijing, China',
    status: 'active'
  },
  {
    name: 'ASUS',
    logo: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=200',
    email: 'info@asus.com',
    website: 'https://asus.com',
    description: 'Computer hardware and electronics',
    location: 'Taipei, Taiwan',
    status: 'active'
  },
  {
    name: 'MSI',
    logo: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=200',
    email: 'info@msi.com',
    website: 'https://msi.com',
    description: 'Gaming hardware and components',
    location: 'New Taipei City, Taiwan',
    status: 'active'
  },
  {
    name: 'Sennheiser',
    logo: 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=200',
    email: 'info@sennheiser.com',
    website: 'https://sennheiser.com',
    description: 'Professional audio equipment',
    location: 'Wedemark, Germany',
    status: 'active'
  },
  {
    name: 'SteelSeries',
    logo: 'https://images.unsplash.com/photo-1566443280617-35db331c54fb?w=200',
    email: 'info@steelseries.com',
    website: 'https://steelseries.com',
    description: 'Gaming peripherals and accessories',
    location: 'Copenhagen, Denmark',
    status: 'active'
  },
  {
    name: 'Beats',
    logo: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200',
    email: 'info@beats.com',
    website: 'https://beats.com',
    description: 'Premium audio products',
    location: 'Cupertino, CA',
    status: 'active'
  },
  {
    name: 'Audio-Technica',
    logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200',
    email: 'info@audio-technica.com',
    website: 'https://audio-technica.com',
    description: 'Professional and consumer audio',
    location: 'Tokyo, Japan',
    status: 'active'
  },
  {
    name: 'Sonos',
    logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200',
    email: 'info@sonos.com',
    website: 'https://sonos.com',
    description: 'Smart speakers and home audio',
    location: 'Santa Barbara, CA',
    status: 'active'
  },
  {
    name: 'Marshall',
    logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200',
    email: 'info@marshallheadphones.com',
    website: 'https://marshallheadphones.com',
    description: 'Rock and roll inspired audio',
    location: 'Bletchley, UK',
    status: 'active'
  },
  {
    name: 'Ultimate Ears',
    logo: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=200',
    email: 'info@ultimateears.com',
    website: 'https://ultimateears.com',
    description: 'Portable speakers and earphones',
    location: 'Fremont, CA',
    status: 'active'
  },
  {
    name: 'Harman Kardon',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    email: 'info@harmankardon.com',
    website: 'https://harmankardon.com',
    description: 'High-end audio equipment',
    location: 'Stamford, CT',
    status: 'active'
  },
  {
    name: 'Amazon',
    logo: 'https://images.unsplash.com/photo-1566288120560-e9e1b03b9b05?w=200',
    email: 'info@amazon.com',
    website: 'https://amazon.com',
    description: 'E-commerce and cloud computing',
    location: 'Seattle, WA',
    status: 'active'
  },
  {
    name: 'Nintendo',
    logo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200',
    email: 'info@nintendo.com',
    website: 'https://nintendo.com',
    description: 'Video game consoles and games',
    location: 'Kyoto, Japan',
    status: 'active'
  },
  {
    name: 'Valve',
    logo: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200',
    email: 'info@valvesoftware.com',
    website: 'https://valvesoftware.com',
    description: 'Gaming software and hardware',
    location: 'Bellevue, WA',
    status: 'active'
  },
  {
    name: 'Razer',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200',
    email: 'info@razer.com',
    website: 'https://razer.com',
    description: 'Gaming peripherals and laptops',
    location: 'Irvine, CA',
    status: 'active'
  },
  {
    name: 'Corsair',
    logo: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200',
    email: 'info@corsair.com',
    website: 'https://corsair.com',
    description: 'Gaming peripherals and components',
    location: 'Fremont, CA',
    status: 'active'
  },
  {
    name: 'Nikon',
    logo: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=200',
    email: 'info@nikon.com',
    website: 'https://nikon.com',
    description: 'Camera and imaging products',
    location: 'Tokyo, Japan',
    status: 'active'
  },
  {
    name: 'Fujifilm',
    logo: 'https://images.unsplash.com/photo-1604595231885-b06e6f8e9aeb?w=200',
    email: 'info@fujifilm.com',
    website: 'https://fujifilm.com',
    description: 'Photography and imaging solutions',
    location: 'Tokyo, Japan',
    status: 'active'
  },
  {
    name: 'GoPro',
    logo: 'https://images.unsplash.com/photo-1551818014-7c8ace9c6399?w=200',
    email: 'info@gopro.com',
    website: 'https://gopro.com',
    description: 'Action cameras and accessories',
    location: 'San Mateo, CA',
    status: 'active'
  },
  {
    name: 'DJI',
    logo: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?w=200',
    email: 'info@dji.com',
    website: 'https://dji.com',
    description: 'Drone technology and cameras',
    location: 'Shenzhen, China',
    status: 'active'
  },
  {
    name: 'Insta360',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200',
    email: 'info@insta360.com',
    website: 'https://insta360.com',
    description: '360-degree cameras and VR',
    location: 'Shenzhen, China',
    status: 'active'
  },
  {
    name: 'Garmin',
    logo: 'https://images.unsplash.com/photo-1586796518817-96c0e2b9f8e2?w=200',
    email: 'info@garmin.com',
    website: 'https://garmin.com',
    description: 'GPS and wearable technology',
    location: 'Olathe, KS',
    status: 'active'
  },
  {
    name: 'Fitbit',
    logo: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=200',
    email: 'info@fitbit.com',
    website: 'https://fitbit.com',
    description: 'Fitness trackers and smartwatches',
    location: 'San Francisco, CA',
    status: 'active'
  },
  {
    name: 'Huawei',
    logo: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200',
    email: 'info@huawei.com',
    website: 'https://huawei.com',
    description: 'Telecommunications and consumer electronics',
    location: 'Shenzhen, China',
    status: 'active'
  },
  {
    name: 'Amazfit',
    logo: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200',
    email: 'info@amazfit.com',
    website: 'https://amazfit.com',
    description: 'Smart wearables and fitness trackers',
    location: 'Hefei, China',
    status: 'active'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Import models
    const Category = require('./models/Category');
    const Brand = require('./models/Brand');
    const Product = require('./models/Product');
    const Admin = require('./models/Admin');
    const Coupon = require('./models/Coupon');
    const User = require('./models/User');
    const Order = require('./models/Order');

    // Clear existing data
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Product.deleteMany({});
    await Admin.deleteMany({});
    await Coupon.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Insert categories
    console.log('Inserting categories...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ ${insertedCategories.length} categories created`);

    // Insert brands
    console.log('Inserting brands...');
    const insertedBrands = await Brand.insertMany(brands);
    console.log(`✅ ${insertedBrands.length} brands created`);

    // Insert admin user
    console.log('Inserting admin user...');
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    const adminUser = new Admin({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      phone: '+1234567890',
      role: 'Admin',
      image: '/assets/img/users/user-1.jpg'
    });
    const insertedAdmin = await adminUser.save();
    console.log(`✅ Admin user created - Email: admin@example.com, Password: admin123`);

    // Insert coupons
    console.log('Inserting coupons...');
    const coupons = [
      {
        title: 'Black Friday Sale',
        logo: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop',
        couponCode: 'BLACKFRIDAY50',
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        discountPercentage: 50,
        minimumAmount: 100,
        productType: 'all'
      },
      {
        title: 'New Year Special',
        logo: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=300&fit=crop',
        couponCode: 'NEWYEAR25',
        endTime: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        discountPercentage: 25,
        minimumAmount: 50,
        productType: 'all'
      },
      {
        title: 'Weekend Deal',
        logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
        couponCode: 'WEEKEND15',
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        discountPercentage: 15,
        minimumAmount: 30,
        productType: 'all'
      }
    ];
    const insertedCoupons = await Coupon.insertMany(coupons);
    console.log(`✅ ${insertedCoupons.length} coupons created`);

    // Sample Products
    const products = [
      // SMARTPHONES (7 products)
      {
        sku: 'IPH15-001',
        title: 'iPhone 15 Pro Max',
        parent: 'Electronics',
        children: 'Smartphones',
        tags: ['smartphone', 'apple', 'ios', 'premium', 'pro'],
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&h=600&fit=crop',
        originalPrice: 1299,
        price: 1199,
        discount: 8,
        relatedImages: [
          'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&h=600&fit=crop',
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=600&fit=crop'
        ],
        description: 'Latest iPhone with titanium design, A17 Pro chip, and advanced camera system',
        brand: { name: 'Apple', id: null },
        category: { name: 'Smartphones', id: null },
        unit: 'piece',
        quantity: 50,
        colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'SAM-S24-001',
        title: 'Samsung Galaxy S24 Ultra',
        parent: 'Electronics',
        children: 'Smartphones',
        tags: ['smartphone', 'samsung', 'android', 'camera', 'spen'],
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=600&fit=crop',
        originalPrice: 1399,
        price: 1299,
        discount: 7,
        relatedImages: [
          'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=600&fit=crop'
        ],
        description: 'Flagship Samsung phone with built-in S Pen and 200MP camera',
        brand: { name: 'Samsung', id: null },
        category: { name: 'Smartphones', id: null },
        unit: 'piece',
        quantity: 45,
        colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
        type: 'physical',
        itemInfo: 'best-selling',
        status: 'active'
      },
      {
        sku: 'GOOG-P8-001',
        title: 'Google Pixel 8 Pro',
        parent: 'Electronics',
        children: 'Smartphones',
        tags: ['smartphone', 'google', 'android', 'camera', 'ai'],
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=600&fit=crop',
        originalPrice: 999,
        price: 899,
        discount: 10,
        relatedImages: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=600&fit=crop'
        ],
        description: 'Google Pixel with advanced AI features and computational photography',
        brand: { name: 'Google', id: null },
        category: { name: 'Smartphones', id: null },
        unit: 'piece',
        quantity: 35,
        colors: ['Obsidian', 'Porcelain', 'Bay'],
        type: 'physical',
        itemInfo: 'featured',
        status: 'active'
      },
      {
        sku: 'ONE-12-001',
        title: 'OnePlus 12',
        parent: 'Electronics',
        children: 'Smartphones',
        tags: ['smartphone', 'oneplus', 'android', 'fast-charging'],
        image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&h=600&fit=crop',
        originalPrice: 799,
        price: 749,
        discount: 6,
        relatedImages: [
          'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&h=600&fit=crop'
        ],
        description: 'Flagship killer with Snapdragon 8 Gen 3 and 100W fast charging',
        brand: { name: 'OnePlus', id: null },
        category: { name: 'Smartphones', id: null },
        unit: 'piece',
        quantity: 30,
        colors: ['Silky Black', 'Flowy Emerald'],
        type: 'physical',
        itemInfo: 'latest-product',
        status: 'active'
      },
      {
        sku: 'XIA-14-001',
        title: 'Xiaomi 14 Ultra',
        parent: 'Electronics',
        children: 'Smartphones',
        tags: ['smartphone', 'xiaomi', 'android', 'photography'],
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=600&fit=crop',
        originalPrice: 1199,
        price: 1099,
        discount: 8,
        relatedImages: [
          'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=600&fit=crop'
        ],
        description: 'Photography powerhouse with Leica cameras and Snapdragon 8 Gen 3',
        brand: { name: 'Xiaomi', id: null },
        category: { name: 'Smartphones', id: null },
        unit: 'piece',
        quantity: 25,
        colors: ['Black', 'White'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'SAM-A55-001',
        title: 'Samsung Galaxy A55',
        parent: 'Electronics',
        children: 'Smartphones',
        tags: ['smartphone', 'samsung', 'android', 'mid-range'],
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=600&fit=crop',
        originalPrice: 449,
        price: 399,
        discount: 11,
        relatedImages: [
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=600&fit=crop'
        ],
        description: 'Mid-range Samsung phone with excellent camera and long battery life',
        brand: { name: 'Samsung', id: null },
        category: { name: 'Smartphones', id: null },
        unit: 'piece',
        quantity: 60,
        colors: ['Awesome Blue', 'Awesome Navy', 'Awesome Lilac', 'Awesome Lemon'],
        type: 'physical',
        itemInfo: 'best-selling',
        status: 'active'
      },
      {
        sku: 'IPH-SE-001',
        title: 'iPhone SE (3rd Generation)',
        parent: 'Electronics',
        children: 'Smartphones',
        tags: ['smartphone', 'apple', 'ios', 'budget', 'compact'],
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=600&fit=crop',
        originalPrice: 429,
        price: 379,
        discount: 12,
        relatedImages: [
          'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=600&fit=crop'
        ],
        description: 'Compact iPhone with A15 Bionic chip and classic design',
        brand: { name: 'Apple', id: null },
        category: { name: 'Smartphones', id: null },
        unit: 'piece',
        quantity: 40,
        colors: ['Midnight', 'Starlight', 'Red'],
        type: 'physical',
        itemInfo: 'budget-friendly',
        status: 'active'
      },

      // LAPTOPS (7 products)
      {
        sku: 'MBP-16-001',
        title: 'MacBook Pro 16-inch M3 Max',
        parent: 'Electronics',
        children: 'Laptops',
        tags: ['laptop', 'apple', 'macbook', 'pro', 'creative'],
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=600&fit=crop',
        originalPrice: 2499,
        price: 2299,
        discount: 8,
        relatedImages: [
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=600&fit=crop'
        ],
        description: 'Powerful MacBook Pro with M3 Max chip for professional workflows',
        brand: { name: 'Apple', id: null },
        category: { name: 'Laptops', id: null },
        unit: 'piece',
        quantity: 20,
        colors: ['Space Black', 'Silver'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'DELL-XPS-002',
        title: 'Dell XPS 15 OLED',
        parent: 'Electronics',
        children: 'Laptops',
        tags: ['laptop', 'dell', 'windows', 'oled', 'creative'],
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop',
        originalPrice: 1999,
        price: 1799,
        discount: 10,
        relatedImages: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop'
        ],
        description: 'Premium Dell laptop with stunning OLED display and Intel Core i7',
        brand: { name: 'Dell', id: null },
        category: { name: 'Laptops', id: null },
        unit: 'piece',
        quantity: 30,
        colors: ['Platinum Silver', 'Graphite'],
        type: 'physical',
        itemInfo: 'featured',
        status: 'active'
      },
      {
        sku: 'HP-SPEC-001',
        title: 'HP Spectre x360 16',
        parent: 'Electronics',
        children: 'Laptops',
        tags: ['laptop', 'hp', 'convertible', '2-in-1', 'touchscreen'],
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=600&fit=crop',
        originalPrice: 1599,
        price: 1399,
        discount: 13,
        relatedImages: [
          'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=600&fit=crop'
        ],
        description: 'Convertible laptop with 360-degree hinge and OLED touchscreen',
        brand: { name: 'HP', id: null },
        category: { name: 'Laptops', id: null },
        unit: 'piece',
        quantity: 25,
        colors: ['Nightfall Black', 'Natural Silver'],
        type: 'physical',
        itemInfo: 'versatile',
        status: 'active'
      },
      {
        sku: 'LEN-X1-001',
        title: 'Lenovo ThinkPad X1 Carbon',
        parent: 'Electronics',
        children: 'Laptops',
        tags: ['laptop', 'lenovo', 'business', 'ultrabook', 'carbon'],
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=600&fit=crop',
        originalPrice: 1899,
        price: 1699,
        discount: 11,
        relatedImages: [
          'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=600&fit=crop'
        ],
        description: 'Ultra-lightweight business laptop with carbon fiber construction',
        brand: { name: 'Lenovo', id: null },
        category: { name: 'Laptops', id: null },
        unit: 'piece',
        quantity: 35,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'business',
        status: 'active'
      },
      {
        sku: 'ASUS-ROG-001',
        title: 'ASUS ROG Strix G16',
        parent: 'Electronics',
        children: 'Laptops',
        tags: ['laptop', 'asus', 'gaming', 'rgb', 'high-performance'],
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=600&fit=crop',
        originalPrice: 1799,
        price: 1599,
        discount: 11,
        relatedImages: [
          'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=600&fit=crop'
        ],
        description: 'Gaming laptop with RTX 4070 and 165Hz display',
        brand: { name: 'ASUS', id: null },
        category: { name: 'Laptops', id: null },
        unit: 'piece',
        quantity: 20,
        colors: ['Eclipse Gray', 'Volt Green'],
        type: 'physical',
        itemInfo: 'gaming',
        status: 'active'
      },
      {
        sku: 'MSI-TIT-001',
        title: 'MSI Titan GT77 HX',
        parent: 'Electronics',
        children: 'Laptops',
        tags: ['laptop', 'msi', 'gaming', 'extreme', 'rtx'],
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=600&fit=crop',
        originalPrice: 4999,
        price: 4599,
        discount: 8,
        relatedImages: [
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=600&fit=crop'
        ],
        description: 'Extreme gaming laptop with RTX 4090 and mechanical keyboard',
        brand: { name: 'MSI', id: null },
        category: { name: 'Laptops', id: null },
        unit: 'piece',
        quantity: 10,
        colors: ['Core Black'],
        type: 'physical',
        itemInfo: 'extreme',
        status: 'active'
      },
      {
        sku: 'MBA-15-001',
        title: 'MacBook Air 15-inch M3',
        parent: 'Electronics',
        children: 'Laptops',
        tags: ['laptop', 'apple', 'macbook', 'air', 'ultrabook'],
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=600&fit=crop',
        originalPrice: 1299,
        price: 1199,
        discount: 8,
        relatedImages: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=600&fit=crop'
        ],
        description: 'Larger MacBook Air with M3 chip and all-day battery life',
        brand: { name: 'Apple', id: null },
        category: { name: 'Laptops', id: null },
        unit: 'piece',
        quantity: 40,
        colors: ['Midnight', 'Starlight', 'Silver', 'Space Gray'],
        type: 'physical',
        itemInfo: 'popular',
        status: 'active'
      },

      // HEADPHONES (7 products)
      {
        sku: 'SONY-WH5-001',
        title: 'Sony WH-1000XM5',
        parent: 'Electronics',
        children: 'Headphones',
        tags: ['headphones', 'sony', 'wireless', 'noise-cancelling'],
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop',
        originalPrice: 399,
        price: 299,
        discount: 25,
        relatedImages: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=600&fit=crop'
        ],
        description: 'Industry-leading noise cancelling wireless headphones with 30-hour battery',
        brand: { name: 'Sony', id: null },
        category: { name: 'Headphones', id: null },
        unit: 'piece',
        quantity: 40,
        colors: ['Black', 'Silver'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'AIRPODS-MAX-001',
        title: 'Apple AirPods Max',
        parent: 'Electronics',
        children: 'Headphones',
        tags: ['headphones', 'apple', 'wireless', 'premium'],
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=600&fit=crop',
        originalPrice: 549,
        price: 449,
        discount: 18,
        relatedImages: [
          'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=600&fit=crop'
        ],
        description: 'Over-ear headphones with spatial audio and premium materials',
        brand: { name: 'Apple', id: null },
        category: { name: 'Headphones', id: null },
        unit: 'piece',
        quantity: 25,
        colors: ['Space Gray', 'Silver', 'Pink', 'Green', 'Blue'],
        type: 'physical',
        itemInfo: 'premium',
        status: 'active'
      },
      {
        sku: 'BOSE-QC45-001',
        title: 'Bose QuietComfort 45',
        parent: 'Electronics',
        children: 'Headphones',
        tags: ['headphones', 'bose', 'wireless', 'comfort'],
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop',
        originalPrice: 329,
        price: 279,
        discount: 15,
        relatedImages: [
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=600&fit=crop'
        ],
        description: 'Legendary quiet with premium comfort and 24-hour battery',
        brand: { name: 'Bose', id: null },
        category: { name: 'Headphones', id: null },
        unit: 'piece',
        quantity: 35,
        colors: ['Black', 'White Smoke'],
        type: 'physical',
        itemInfo: 'comfortable',
        status: 'active'
      },
      {
        sku: 'SENN-HD660-001',
        title: 'Sennheiser HD 660S2',
        parent: 'Electronics',
        children: 'Headphones',
        tags: ['headphones', 'sennheiser', 'wired', 'audiophile'],
        image: 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=500&h=600&fit=crop',
        originalPrice: 599,
        price: 499,
        discount: 17,
        relatedImages: [
          'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=500&h=600&fit=crop'
        ],
        description: 'Reference-quality open-back headphones for audiophiles',
        brand: { name: 'Sennheiser', id: null },
        category: { name: 'Headphones', id: null },
        unit: 'piece',
        quantity: 20,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'audiophile',
        status: 'active'
      },
      {
        sku: 'STEEL-ARCT7-001',
        title: 'SteelSeries Arctis 7P',
        parent: 'Electronics',
        children: 'Headphones',
        tags: ['headphones', 'steelseries', 'gaming', 'wireless'],
        image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=600&fit=crop',
        originalPrice: 169,
        price: 129,
        discount: 24,
        relatedImages: [
          'https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=600&fit=crop'
        ],
        description: 'Lossless 2.4GHz wireless gaming headset with 24-hour battery',
        brand: { name: 'SteelSeries', id: null },
        category: { name: 'Headphones', id: null },
        unit: 'piece',
        quantity: 30,
        colors: ['Black', 'White'],
        type: 'physical',
        itemInfo: 'gaming',
        status: 'active'
      },
      {
        sku: 'BEATS-STU3-001',
        title: 'Beats Studio3 Wireless',
        parent: 'Electronics',
        children: 'Headphones',
        tags: ['headphones', 'beats', 'wireless', 'bass'],
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=600&fit=crop',
        originalPrice: 349,
        price: 199,
        discount: 43,
        relatedImages: [
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=600&fit=crop'
        ],
        description: 'Wireless noise cancelling headphones with Pure ANC technology',
        brand: { name: 'Beats', id: null },
        category: { name: 'Headphones', id: null },
        unit: 'piece',
        quantity: 45,
        colors: ['Matte Black', 'Red', 'Blue', 'Desert Sand'],
        type: 'physical',
        itemInfo: 'bass-heavy',
        status: 'active'
      },
      {
        sku: 'AUDIO-M50X-001',
        title: 'Audio-Technica ATH-M50x',
        parent: 'Electronics',
        children: 'Headphones',
        tags: ['headphones', 'audio-technica', 'wired', 'studio'],
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=600&fit=crop',
        originalPrice: 149,
        price: 119,
        discount: 20,
        relatedImages: [
          'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=600&fit=crop'
        ],
        description: 'Professional studio monitor headphones with exceptional clarity',
        brand: { name: 'Audio-Technica', id: null },
        category: { name: 'Headphones', id: null },
        unit: 'piece',
        quantity: 50,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'professional',
        status: 'active'
      },

      // SPEAKERS (6 products)
      {
        sku: 'JBL-FLIP6-001',
        title: 'JBL Flip 6',
        parent: 'Electronics',
        children: 'Speakers',
        tags: ['speaker', 'jbl', 'portable', 'bluetooth', 'waterproof'],
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=600&fit=crop',
        originalPrice: 129,
        price: 99,
        discount: 23,
        relatedImages: [
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=600&fit=crop'
        ],
        description: 'Portable waterproof speaker with powerful JBL Pro Sound',
        brand: { name: 'JBL', id: null },
        category: { name: 'Speakers', id: null },
        unit: 'piece',
        quantity: 60,
        colors: ['Black', 'Blue', 'Red', 'Teal', 'Pink'],
        type: 'physical',
        itemInfo: 'portable',
        status: 'active'
      },
      {
        sku: 'SONOS-ONE-001',
        title: 'Sonos One (Gen 2)',
        parent: 'Electronics',
        children: 'Speakers',
        tags: ['speaker', 'sonos', 'smart', 'alexa', 'wifi'],
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=600&fit=crop',
        originalPrice: 219,
        price: 179,
        discount: 18,
        relatedImages: [
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=600&fit=crop'
        ],
        description: 'Smart speaker with Alexa built-in and rich, room-filling sound',
        brand: { name: 'Sonos', id: null },
        category: { name: 'Speakers', id: null },
        unit: 'piece',
        quantity: 40,
        colors: ['Black', 'White'],
        type: 'physical',
        itemInfo: 'smart',
        status: 'active'
      },
      {
        sku: 'BOSE-HOME-001',
        title: 'Bose Home Speaker 500',
        parent: 'Electronics',
        children: 'Speakers',
        tags: ['speaker', 'bose', 'smart', 'alexa', 'premium'],
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop',
        originalPrice: 399,
        price: 299,
        discount: 25,
        relatedImages: [
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=600&fit=crop'
        ],
        description: 'Premium smart speaker with spacious sound and Alexa built-in',
        brand: { name: 'Bose', id: null },
        category: { name: 'Speakers', id: null },
        unit: 'piece',
        quantity: 25,
        colors: ['Black', 'Silver'],
        type: 'physical',
        itemInfo: 'premium',
        status: 'active'
      },
      {
        sku: 'MARSHALL-EMBERTON-001',
        title: 'Marshall Emberton II',
        parent: 'Electronics',
        children: 'Speakers',
        tags: ['speaker', 'marshall', 'portable', 'vintage', 'bluetooth'],
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=600&fit=crop',
        originalPrice: 169,
        price: 129,
        discount: 24,
        relatedImages: [
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=600&fit=crop'
        ],
        description: 'Compact portable speaker with classic Marshall design and 30+ hour playtime',
        brand: { name: 'Marshall', id: null },
        category: { name: 'Speakers', id: null },
        unit: 'piece',
        quantity: 35,
        colors: ['Black', 'Cream'],
        type: 'physical',
        itemInfo: 'vintage',
        status: 'active'
      },
      {
        sku: 'UE-BOOM3-001',
        title: 'Ultimate Ears BOOM 3',
        parent: 'Electronics',
        children: 'Speakers',
        tags: ['speaker', 'ultimate-ears', 'portable', '360-sound', 'waterproof'],
        image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&h=600&fit=crop',
        originalPrice: 149,
        price: 99,
        discount: 34,
        relatedImages: [
          'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&h=600&fit=crop'
        ],
        description: '360-degree sound portable speaker with 15-hour battery life',
        brand: { name: 'Ultimate Ears', id: null },
        category: { name: 'Speakers', id: null },
        unit: 'piece',
        quantity: 45,
        colors: ['Night Black', 'Sunset Red', 'Lagoon Blue', 'Ultraviolet Purple'],
        type: 'physical',
        itemInfo: '360-sound',
        status: 'active'
      },
      {
        sku: 'HARMAN-ONYX-001',
        title: 'Harman Kardon Onyx Studio 8',
        parent: 'Electronics',
        children: 'Speakers',
        tags: ['speaker', 'harman-kardon', 'premium', 'home', 'bluetooth'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
        originalPrice: 249,
        price: 199,
        discount: 20,
        relatedImages: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'
        ],
        description: 'Premium home speaker with iconic design and room-filling sound',
        brand: { name: 'Harman Kardon', id: null },
        category: { name: 'Speakers', id: null },
        unit: 'piece',
        quantity: 30,
        colors: ['Black', 'Blue'],
        type: 'physical',
        itemInfo: 'premium',
        status: 'active'
      },

      // TABLETS (7 products)
      {
        sku: 'IPAD-PRO-001',
        title: 'iPad Pro 12.9" M2',
        parent: 'Electronics',
        children: 'Tablets',
        tags: ['tablet', 'apple', 'ipad', 'pro', 'm2'],
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=600&fit=crop',
        originalPrice: 1099,
        price: 999,
        discount: 9,
        relatedImages: [
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=600&fit=crop'
        ],
        description: 'Most advanced iPad with M2 chip and Liquid Retina XDR display',
        brand: { name: 'Apple', id: null },
        category: { name: 'Tablets', id: null },
        unit: 'piece',
        quantity: 25,
        colors: ['Space Gray', 'Silver'],
        type: 'physical',
        itemInfo: 'professional',
        status: 'active'
      },
      {
        sku: 'IPAD-AIR-001',
        title: 'iPad Air (5th Generation)',
        parent: 'Electronics',
        children: 'Tablets',
        tags: ['tablet', 'apple', 'ipad', 'air', 'm1'],
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=600&fit=crop',
        originalPrice: 749,
        price: 699,
        discount: 7,
        relatedImages: [
          'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=600&fit=crop'
        ],
        description: 'Powerful iPad Air with M1 chip and stunning 10.9-inch display',
        brand: { name: 'Apple', id: null },
        category: { name: 'Tablets', id: null },
        unit: 'piece',
        quantity: 35,
        colors: ['Space Gray', 'Pink', 'Purple', 'Blue', 'Starlight'],
        type: 'physical',
        itemInfo: 'versatile',
        status: 'active'
      },
      {
        sku: 'SAM-TAB-S9-001',
        title: 'Samsung Galaxy Tab S9+',
        parent: 'Electronics',
        children: 'Tablets',
        tags: ['tablet', 'samsung', 'android', 'spen', 'premium'],
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=600&fit=crop',
        originalPrice: 999,
        price: 899,
        discount: 10,
        relatedImages: [
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=600&fit=crop'
        ],
        description: 'Premium Android tablet with S Pen and 12.4-inch Dynamic AMOLED display',
        brand: { name: 'Samsung', id: null },
        category: { name: 'Tablets', id: null },
        unit: 'piece',
        quantity: 30,
        colors: ['Graphite', 'Beige', 'Mint'],
        type: 'physical',
        itemInfo: 'premium',
        status: 'active'
      },
      {
        sku: 'SURFACE-PRO-001',
        title: 'Microsoft Surface Pro 9',
        parent: 'Electronics',
        children: 'Tablets',
        tags: ['tablet', 'microsoft', 'surface', 'windows', '2-in-1'],
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=600&fit=crop',
        originalPrice: 1299,
        price: 1099,
        discount: 15,
        relatedImages: [
          'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=600&fit=crop'
        ],
        description: '2-in-1 laptop and tablet with 13-inch touchscreen and Intel Core i7',
        brand: { name: 'Microsoft', id: null },
        category: { name: 'Tablets', id: null },
        unit: 'piece',
        quantity: 20,
        colors: ['Platinum', 'Graphite', 'Sapphire', 'Forest'],
        type: 'physical',
        itemInfo: '2-in-1',
        status: 'active'
      },
      {
        sku: 'IPAD-MINI-001',
        title: 'iPad mini (6th Generation)',
        parent: 'Electronics',
        children: 'Tablets',
        tags: ['tablet', 'apple', 'ipad', 'mini', 'compact'],
        image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=600&fit=crop',
        originalPrice: 499,
        price: 449,
        discount: 10,
        relatedImages: [
          'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=600&fit=crop'
        ],
        description: 'Compact iPad with A15 Bionic chip and 8.3-inch Liquid Retina display',
        brand: { name: 'Apple', id: null },
        category: { name: 'Tablets', id: null },
        unit: 'piece',
        quantity: 40,
        colors: ['Space Gray', 'Pink', 'Purple', 'Starlight'],
        type: 'physical',
        itemInfo: 'compact',
        status: 'active'
      },
      {
        sku: 'LENOVO-TAB-001',
        title: 'Lenovo Tab P11 Plus',
        parent: 'Electronics',
        children: 'Tablets',
        tags: ['tablet', 'lenovo', 'android', 'budget', 'family'],
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=600&fit=crop',
        originalPrice: 199,
        price: 149,
        discount: 25,
        relatedImages: [
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=600&fit=crop'
        ],
        description: 'Affordable Android tablet with 11-inch 2K display and quad speakers',
        brand: { name: 'Lenovo', id: null },
        category: { name: 'Tablets', id: null },
        unit: 'piece',
        quantity: 50,
        colors: ['Slate Gray', 'Platinum Gray'],
        type: 'physical',
        itemInfo: 'budget-friendly',
        status: 'active'
      },
      {
        sku: 'AMAZON-FIRE-001',
        title: 'Amazon Fire HD 10',
        parent: 'Electronics',
        children: 'Tablets',
        tags: ['tablet', 'amazon', 'fire', 'budget', 'entertainment'],
        image: 'https://images.unsplash.com/photo-1566288120560-e9e1b03b9b05?w=500&h=600&fit=crop',
        originalPrice: 149,
        price: 99,
        discount: 34,
        relatedImages: [
          'https://images.unsplash.com/photo-1566288120560-e9e1b03b9b05?w=500&h=600&fit=crop'
        ],
        description: 'Budget-friendly tablet with 10.1-inch Full HD display and 12-hour battery',
        brand: { name: 'Amazon', id: null },
        category: { name: 'Tablets', id: null },
        unit: 'piece',
        quantity: 60,
        colors: ['Black', 'Denim', 'Lavender', 'Olive'],
        type: 'physical',
        itemInfo: 'entertainment',
        status: 'active'
      },

      // GAMING (7 products)
      {
        sku: 'PS5-CONSOLE-001',
        title: 'PlayStation 5 Console',
        parent: 'Electronics',
        children: 'Gaming',
        tags: ['gaming', 'playstation', 'console', 'ps5', 'sony'],
        image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=500&h=600&fit=crop',
        originalPrice: 499,
        price: 479,
        discount: 4,
        relatedImages: [
          'https://images.unsplash.com/photo-1556438064-2d7646166914?w=500&h=600&fit=crop'
        ],
        description: 'Next-gen gaming console with 4K gaming and ultra-high speed SSD',
        brand: { name: 'Sony', id: null },
        category: { name: 'Gaming', id: null },
        unit: 'piece',
        quantity: 15,
        colors: ['White'],
        type: 'physical',
        itemInfo: 'next-gen',
        status: 'active'
      },
      {
        sku: 'XBOX-SERIES-X-001',
        title: 'Xbox Series X',
        parent: 'Electronics',
        children: 'Gaming',
        tags: ['gaming', 'xbox', 'console', 'microsoft', '4k'],
        image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&h=600&fit=crop',
        originalPrice: 499,
        price: 459,
        discount: 8,
        relatedImages: [
          'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&h=600&fit=crop'
        ],
        description: 'Most powerful Xbox ever with 12 teraflops of processing power',
        brand: { name: 'Microsoft', id: null },
        category: { name: 'Gaming', id: null },
        unit: 'piece',
        quantity: 18,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'powerful',
        status: 'active'
      },
      {
        sku: 'NINTENDO-SWITCH-001',
        title: 'Nintendo Switch OLED',
        parent: 'Electronics',
        children: 'Gaming',
        tags: ['gaming', 'nintendo', 'switch', 'portable', 'oled'],
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop',
        originalPrice: 349,
        price: 299,
        discount: 14,
        relatedImages: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop'
        ],
        description: 'Portable gaming console with vivid OLED screen and Joy-Con controllers',
        brand: { name: 'Nintendo', id: null },
        category: { name: 'Gaming', id: null },
        unit: 'piece',
        quantity: 40,
        colors: ['White', 'Neon Red/Blue'],
        type: 'physical',
        itemInfo: 'portable',
        status: 'active'
      },
      {
        sku: 'STEAMDECK-001',
        title: 'Steam Deck 512GB',
        parent: 'Electronics',
        children: 'Gaming',
        tags: ['gaming', 'steam', 'handheld', 'pc', 'portable'],
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=600&fit=crop',
        originalPrice: 649,
        price: 599,
        discount: 8,
        relatedImages: [
          'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=600&fit=crop'
        ],
        description: 'Portable PC gaming device with access to your Steam library',
        brand: { name: 'Valve', id: null },
        category: { name: 'Gaming', id: null },
        unit: 'piece',
        quantity: 20,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'pc-gaming',
        status: 'active'
      },
      {
        sku: 'DUALSENSE-001',
        title: 'DualSense Wireless Controller',
        parent: 'Electronics',
        children: 'Gaming',
        tags: ['gaming', 'controller', 'ps5', 'wireless', 'haptic'],
        image: 'https://images.unsplash.com/photo-1577523843426-15969fa07bf6?w=500&h=600&fit=crop',
        originalPrice: 69,
        price: 59,
        discount: 14,
        relatedImages: [
          'https://images.unsplash.com/photo-1577523843426-15969fa07bf6?w=500&h=600&fit=crop'
        ],
        description: 'Revolutionary controller with haptic feedback and adaptive triggers',
        brand: { name: 'Sony', id: null },
        category: { name: 'Gaming', id: null },
        unit: 'piece',
        quantity: 50,
        colors: ['White', 'Cosmic Red', 'Midnight Black', 'Cosmic Purple'],
        type: 'physical',
        itemInfo: 'controller',
        status: 'active'
      },
      {
        sku: 'RAZER-VIPER-001',
        title: 'Razer DeathAdder V3',
        parent: 'Electronics',
        children: 'Gaming',
        tags: ['gaming', 'mouse', 'razer', 'ergonomic', 'wired'],
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=600&fit=crop',
        originalPrice: 99,
        price: 79,
        discount: 20,
        relatedImages: [
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=600&fit=crop'
        ],
        description: 'Ergonomic gaming mouse with 30K DPI sensor and 90-hour battery',
        brand: { name: 'Razer', id: null },
        category: { name: 'Gaming', id: null },
        unit: 'piece',
        quantity: 60,
        colors: ['Black', 'White'],
        type: 'physical',
        itemInfo: 'precision',
        status: 'active'
      },
      {
        sku: 'CORSAIR-K70-001',
        title: 'Corsair K70 RGB MK.2',
        parent: 'Electronics',
        children: 'Gaming',
        tags: ['gaming', 'keyboard', 'mechanical', 'rgb', 'corsair'],
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=600&fit=crop',
        originalPrice: 169,
        price: 129,
        discount: 24,
        relatedImages: [
          'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=600&fit=crop'
        ],
        description: 'Mechanical gaming keyboard with Cherry MX switches and RGB lighting',
        brand: { name: 'Corsair', id: null },
        category: { name: 'Gaming', id: null },
        unit: 'piece',
        quantity: 35,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'mechanical',
        status: 'active'
      },

      // CAMERAS (7 products)
      {
        sku: 'CANON-R6-001',
        title: 'Canon EOS R6 Mark II',
        parent: 'Electronics',
        children: 'Cameras',
        tags: ['camera', 'canon', 'mirrorless', 'full-frame', 'professional'],
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=600&fit=crop',
        originalPrice: 2499,
        price: 2199,
        discount: 12,
        relatedImages: [
          'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=600&fit=crop'
        ],
        description: 'Professional mirrorless camera with 24.2MP sensor and 4K video',
        brand: { name: 'Canon', id: null },
        category: { name: 'Cameras', id: null },
        unit: 'piece',
        quantity: 15,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'professional',
        status: 'active'
      },
      {
        sku: 'SONY-A7IV-001',
        title: 'Sony Alpha a7 IV',
        parent: 'Electronics',
        children: 'Cameras',
        tags: ['camera', 'sony', 'mirrorless', 'full-frame', 'hybrid'],
        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=600&fit=crop',
        originalPrice: 2499,
        price: 2299,
        discount: 8,
        relatedImages: [
          'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=600&fit=crop'
        ],
        description: 'Versatile full-frame camera with 33MP sensor and advanced video features',
        brand: { name: 'Sony', id: null },
        category: { name: 'Cameras', id: null },
        unit: 'piece',
        quantity: 20,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'versatile',
        status: 'active'
      },
      {
        sku: 'NIKON-Z9-001',
        title: 'Nikon Z9',
        parent: 'Electronics',
        children: 'Cameras',
        tags: ['camera', 'nikon', 'mirrorless', 'full-frame', 'flagship'],
        image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&h=600&fit=crop',
        originalPrice: 5499,
        price: 4999,
        discount: 9,
        relatedImages: [
          'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&h=600&fit=crop'
        ],
        description: 'Flagship mirrorless camera with 45.7MP sensor and 8K video',
        brand: { name: 'Nikon', id: null },
        category: { name: 'Cameras', id: null },
        unit: 'piece',
        quantity: 8,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'flagship',
        status: 'active'
      },
      {
        sku: 'FUJI-XT5-001',
        title: 'Fujifilm X-T5',
        parent: 'Electronics',
        children: 'Cameras',
        tags: ['camera', 'fujifilm', 'mirrorless', 'aps-c', 'retro'],
        image: 'https://images.unsplash.com/photo-1604595231885-b06e6f8e9aeb?w=500&h=600&fit=crop',
        originalPrice: 1699,
        price: 1499,
        discount: 12,
        relatedImages: [
          'https://images.unsplash.com/photo-1604595231885-b06e6f8e9aeb?w=500&h=600&fit=crop'
        ],
        description: 'Retro-styled mirrorless camera with 40.2MP APS-C sensor and film simulations',
        brand: { name: 'Fujifilm', id: null },
        category: { name: 'Cameras', id: null },
        unit: 'piece',
        quantity: 25,
        colors: ['Black', 'Silver'],
        type: 'physical',
        itemInfo: 'retro',
        status: 'active'
      },
      {
        sku: 'GOPRO-12-001',
        title: 'GoPro HERO12 Black',
        parent: 'Electronics',
        children: 'Cameras',
        tags: ['camera', 'gopro', 'action', 'waterproof', '4k'],
        image: 'https://images.unsplash.com/photo-1551818014-7c8ace9c6399?w=500&h=600&fit=crop',
        originalPrice: 399,
        price: 349,
        discount: 13,
        relatedImages: [
          'https://images.unsplash.com/photo-1551818014-7c8ace9c6399?w=500&h=600&fit=crop'
        ],
        description: 'Most versatile action camera with 5.3K video and advanced stabilization',
        brand: { name: 'GoPro', id: null },
        category: { name: 'Cameras', id: null },
        unit: 'piece',
        quantity: 40,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'action',
        status: 'active'
      },
      {
        sku: 'DJI-POCKET-001',
        title: 'DJI Pocket 2',
        parent: 'Electronics',
        children: 'Cameras',
        tags: ['camera', 'dji', 'handheld', 'gimbal', 'compact'],
        image: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?w=500&h=600&fit=crop',
        originalPrice: 449,
        price: 379,
        discount: 16,
        relatedImages: [
          'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?w=500&h=600&fit=crop'
        ],
        description: 'Ultra-compact handheld camera with 3-axis gimbal and 4K video',
        brand: { name: 'DJI', id: null },
        category: { name: 'Cameras', id: null },
        unit: 'piece',
        quantity: 30,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'compact',
        status: 'active'
      },
      {
        sku: 'INSTA360-X3-001',
        title: 'Insta360 X3',
        parent: 'Electronics',
        children: 'Cameras',
        tags: ['camera', 'insta360', '360-degree', 'action', 'vr'],
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=600&fit=crop',
        originalPrice: 449,
        price: 399,
        discount: 11,
        relatedImages: [
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=600&fit=crop'
        ],
        description: '360-degree action camera with AI-powered editing and 5.7K video',
        brand: { name: 'Insta360', id: null },
        category: { name: 'Cameras', id: null },
        unit: 'piece',
        quantity: 25,
        colors: ['Black'],
        type: 'physical',
        itemInfo: '360-degree',
        status: 'active'
      },

      // SMARTWATCHES (6 products)
      {
        sku: 'APPLE-WATCH-001',
        title: 'Apple Watch Series 9',
        parent: 'Electronics',
        children: 'Smartwatches',
        tags: ['smartwatch', 'apple', 'fitness', 'health', 'gps'],
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop',
        originalPrice: 399,
        price: 349,
        discount: 13,
        relatedImages: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop'
        ],
        description: 'Most advanced Apple Watch with S9 chip and Double Tap gesture',
        brand: { name: 'Apple', id: null },
        category: { name: 'Smartwatches', id: null },
        unit: 'piece',
        quantity: 45,
        colors: ['Pink', 'Midnight', 'Starlight', 'Red', 'Storm Blue'],
        type: 'physical',
        itemInfo: 'advanced',
        status: 'active'
      },
      {
        sku: 'SAMSUNG-WATCH-001',
        title: 'Samsung Galaxy Watch6',
        parent: 'Electronics',
        children: 'Smartwatches',
        tags: ['smartwatch', 'samsung', 'android', 'fitness', 'health'],
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop',
        originalPrice: 329,
        price: 279,
        discount: 15,
        relatedImages: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop'
        ],
        description: 'Advanced smartwatch with comprehensive health monitoring and Wear OS',
        brand: { name: 'Samsung', id: null },
        category: { name: 'Smartwatches', id: null },
        unit: 'piece',
        quantity: 40,
        colors: ['Graphite', 'Silver', 'Gold'],
        type: 'physical',
        itemInfo: 'health-focused',
        status: 'active'
      },
      {
        sku: 'GARMIN-FENIX-001',
        title: 'Garmin Fenix 7',
        parent: 'Electronics',
        children: 'Smartwatches',
        tags: ['smartwatch', 'garmin', 'outdoor', 'gps', 'rugged'],
        image: 'https://images.unsplash.com/photo-1586796518817-96c0e2b9f8e2?w=500&h=600&fit=crop',
        originalPrice: 699,
        price: 599,
        discount: 14,
        relatedImages: [
          'https://images.unsplash.com/photo-1586796518817-96c0e2b9f8e2?w=500&h=600&fit=crop'
        ],
        description: 'Rugged GPS smartwatch with solar charging and advanced training features',
        brand: { name: 'Garmin', id: null },
        category: { name: 'Smartwatches', id: null },
        unit: 'piece',
        quantity: 25,
        colors: ['Black', 'Gray'],
        type: 'physical',
        itemInfo: 'outdoor',
        status: 'active'
      },
      {
        sku: 'FITBIT-SENSE-001',
        title: 'Fitbit Sense 2',
        parent: 'Electronics',
        children: 'Smartwatches',
        tags: ['smartwatch', 'fitbit', 'health', 'stress', 'fitness'],
        image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&h=600&fit=crop',
        originalPrice: 299,
        price: 199,
        discount: 33,
        relatedImages: [
          'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500&h=600&fit=crop'
        ],
        description: 'Health-focused smartwatch with stress management and sleep tracking',
        brand: { name: 'Fitbit', id: null },
        category: { name: 'Smartwatches', id: null },
        unit: 'piece',
        quantity: 35,
        colors: ['Graphite', 'Blue Mist', 'Soft Gold'],
        type: 'physical',
        itemInfo: 'health-focused',
        status: 'active'
      },
      {
        sku: 'HUAWEI-GT3-001',
        title: 'Huawei Watch GT 3',
        parent: 'Electronics',
        children: 'Smartwatches',
        tags: ['smartwatch', 'huawei', 'battery', 'fitness', 'elegant'],
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&h=600&fit=crop',
        originalPrice: 249,
        price: 199,
        discount: 20,
        relatedImages: [
          'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&h=600&fit=crop'
        ],
        description: 'Elegant smartwatch with 14-day battery life and comprehensive health tracking',
        brand: { name: 'Huawei', id: null },
        category: { name: 'Smartwatches', id: null },
        unit: 'piece',
        quantity: 30,
        colors: ['Black', 'Brown', 'White'],
        type: 'physical',
        itemInfo: 'long-battery',
        status: 'active'
      },
      {
        sku: 'AMAZFIT-GTR-001',
        title: 'Amazfit GTR 4',
        parent: 'Electronics',
        children: 'Smartwatches',
        tags: ['smartwatch', 'amazfit', 'budget', 'fitness', 'gps'],
        image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=600&fit=crop',
        originalPrice: 199,
        price: 149,
        discount: 25,
        relatedImages: [
          'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=600&fit=crop'
        ],
        description: 'Affordable smartwatch with GPS, heart rate monitoring, and 14-day battery',
        brand: { name: 'Amazfit', id: null },
        category: { name: 'Smartwatches', id: null },
        unit: 'piece',
        quantity: 50,
        colors: ['Black', 'Silver', 'Brown'],
        type: 'physical',
        itemInfo: 'budget-friendly',
        status: 'active'
      }
    ];

    // Assign brand and category IDs to products
    console.log('Assigning brand and category IDs to products...');
    const brandMap = {};
    const categoryMap = {};
    
    // Create brand mapping
    insertedBrands.forEach(brand => {
      brandMap[brand.name] = brand._id;
    });
    
    // Create category mapping
    insertedCategories.forEach(category => {
      categoryMap[category.parent] = category._id;
    });
    
    // Update products with correct IDs
    products.forEach(product => {
      if (product.brand && product.brand.name) {
        product.brand.id = brandMap[product.brand.name];
      }
      if (product.category && product.category.name) {
        product.category.id = categoryMap[product.category.name];
      }
    });

    // Insert products
    console.log('Inserting products...');
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ ${insertedProducts.length} products created`);

    // Create sample users for orders
    console.log('Inserting sample users...');
    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: bcrypt.hashSync('password123', 10),
        imageURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        status: 'active'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: bcrypt.hashSync('password123', 10),
        imageURL: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        status: 'active'
      },
      {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        password: bcrypt.hashSync('password123', 10),
        imageURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        status: 'active'
      }
    ];
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log(`✅ ${insertedUsers.length} sample users created`);

    // Create sample orders
    console.log('Inserting sample orders...');
    const sampleOrders = [
      {
        user: insertedUsers[0]._id,
        cart: [
          {
            productId: insertedProducts[0]._id,
            orderQuantity: 1,
            title: insertedProducts[0].title,
            image: insertedProducts[0].image,
            price: insertedProducts[0].price
          }
        ],
        name: 'John Doe',
        address: '123 Main St',
        email: 'john.doe@example.com',
        contact: '+1234567890',
        city: 'New York',
        country: 'United States',
        zipCode: '10001',
        subTotal: insertedProducts[0].price,
        shippingCost: 15,
        discount: 0,
        totalAmount: insertedProducts[0].price + 15,
        status: 'delivered',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        user: insertedUsers[1]._id,
        cart: [
          {
            productId: insertedProducts[1]._id,
            orderQuantity: 1,
            title: insertedProducts[1].title,
            image: insertedProducts[1].image,
            price: insertedProducts[1].price
          },
          {
            productId: insertedProducts[3]._id,
            orderQuantity: 1,
            title: insertedProducts[3].title,
            image: insertedProducts[3].image,
            price: insertedProducts[3].price
          }
        ],
        name: 'Jane Smith',
        address: '456 Oak Ave',
        email: 'jane.smith@example.com',
        contact: '+1987654321',
        city: 'Los Angeles',
        country: 'United States',
        zipCode: '90210',
        subTotal: insertedProducts[1].price + insertedProducts[3].price,
        shippingCost: 20,
        discount: 50,
        totalAmount: insertedProducts[1].price + insertedProducts[3].price + 20 - 50,
        status: 'processing',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        user: insertedUsers[2]._id,
        cart: [
          {
            productId: insertedProducts[2]._id,
            orderQuantity: 1,
            title: insertedProducts[2].title,
            image: insertedProducts[2].image,
            price: insertedProducts[2].price
          }
        ],
        name: 'Mike Johnson',
        address: '789 Pine St',
        email: 'mike.johnson@example.com',
        contact: '+1122334455',
        city: 'Chicago',
        country: 'United States',
        zipCode: '60601',
        subTotal: insertedProducts[2].price,
        shippingCost: 15,
        discount: 0,
        totalAmount: insertedProducts[2].price + 15,
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        user: insertedUsers[0]._id,
        cart: [
          {
            productId: insertedProducts[4]._id,
            orderQuantity: 2,
            title: insertedProducts[4].title,
            image: insertedProducts[4].image,
            price: insertedProducts[4].price
          }
        ],
        name: 'John Doe',
        address: '123 Main St',
        email: 'john.doe@example.com',
        contact: '+1234567890',
        city: 'New York',
        country: 'United States',
        zipCode: '10001',
        subTotal: insertedProducts[4].price * 2,
        shippingCost: 15,
        discount: 25,
        totalAmount: insertedProducts[4].price * 2 + 15 - 25,
        status: 'delivered',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        user: insertedUsers[1]._id,
        cart: [
          {
            productId: insertedProducts[5]._id,
            orderQuantity: 1,
            title: insertedProducts[5].title,
            image: insertedProducts[5].image,
            price: insertedProducts[5].price
          }
        ],
        name: 'Jane Smith',
        address: '456 Oak Ave',
        email: 'jane.smith@example.com',
        contact: '+1987654321',
        city: 'Los Angeles',
        country: 'United States',
        zipCode: '90210',
        subTotal: insertedProducts[5].price,
        shippingCost: 20,
        discount: 0,
        totalAmount: insertedProducts[5].price + 20,
        status: 'cancel',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ];
    const insertedOrders = await Order.insertMany(sampleOrders);
    console.log(`✅ ${insertedOrders.length} sample orders created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log(`📊 Summary:`);
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Brands: ${insertedBrands.length}`);
    console.log(`   Products: ${insertedProducts.length}`);
    console.log(`   Users: ${insertedUsers.length}`);
    console.log(`   Orders: ${insertedOrders.length}`);
    console.log(`   Admin Users: 1`);
    console.log(`   Coupons: ${insertedCoupons.length}`);
    console.log('\n🔑 Admin Login Credentials:');
    console.log(`   Email: admin@example.com`);
    console.log(`   Password: admin123`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase(); 