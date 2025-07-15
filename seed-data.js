require('dotenv').config();
const mongoose = require('mongoose');

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

// Categories with correct images
const categories = [
  {
    _id: "63a9a063d283e1a02a2a6af9",
    parent: "Smartphones & Phones",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    children: ["smartphones", "phones", "mobile"],
    status: "Show"
  },
  {
    _id: "63a9a063d283e1a02a2a6afd",
    parent: "Laptops & Computers",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    children: ["laptops", "computers", "desktops"],
    status: "Show"
  },
  {
    _id: "63a9a063d283e1a02a2a6afb",
    parent: "Tablets & iPads",
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    children: ["tablets", "ipads", "pads"],
    status: "Show"
  },
  {
    _id: "63a9a063d283e1a02a2a6afc",
    parent: "Headphones & Audio",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    children: ["headphones", "earphones", "speakers"],
    status: "Show"
  },
  {
    _id: "63a9a063d283e1a02a2a6afa",
    parent: "Smart Watches",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    children: ["smartwatches", "watches", "fitness-trackers"],
    status: "Show"
  },
  {
    _id: "63a9a063d283e1a02a2a6afe",
    parent: "Cameras & Photography",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    children: ["cameras", "photography", "lenses"],
    status: "Show"
  },
  {
    _id: "63a9a063d283e1a02a2a6af8",
    parent: "Gaming & Accessories",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    children: ["gaming", "consoles", "accessories"],
    status: "Show"
  }
];

// Brands
const brands = [
  {
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=200",
    email: "contact@apple.com",
    website: "https://apple.com",
    description: "Premium technology products",
    location: "Cupertino, CA",
    status: "active"
  },
  {
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200",
    email: "info@samsung.com",
    website: "https://samsung.com",
    description: "Innovative electronics manufacturer",
    location: "Seoul, South Korea",
    status: "active"
  },
  {
    name: "Sony",
    logo: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200",
    email: "support@sony.com",
    website: "https://sony.com",
    description: "Entertainment and electronics",
    location: "Tokyo, Japan",
    status: "active"
  },
  {
    name: "Dell",
    logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200",
    email: "info@dell.com",
    website: "https://dell.com",
    description: "Computer technology solutions",
    location: "Round Rock, TX",
    status: "active"
  },
  {
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200",
    email: "info@microsoft.com",
    website: "https://microsoft.com",
    description: "Software and hardware solutions",
    location: "Redmond, WA",
    status: "active"
  },
  {
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
    email: "info@nike.com",
    website: "https://nike.com",
    description: "Sports and fitness equipment",
    location: "Beaverton, OR",
    status: "active"
  }
];

// Coupons/Deals
const coupons = [
  {
    title: "New Year Special Discount",
    couponCode: "NEWYEAR2024",
    endTime: "2024-12-31T23:59:59Z",
    discountPercentage: 25,
    minimumAmount: 1000,
    productType: "Smartphones & Phones",
    logo: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400"
  },
  {
    title: "Summer Sale Discount",
    couponCode: "SUMMER2024",
    endTime: "2024-08-31T23:59:59Z",
    discountPercentage: 15,
    minimumAmount: 800,
    productType: "Laptops & Computers",
    logo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
  },
  {
    title: "Black Friday Special",
    couponCode: "BLACKFRIDAY",
    endTime: "2024-11-30T23:59:59Z",
    discountPercentage: 30,
    minimumAmount: 1500,
    productType: "Tablets & iPads",
    logo: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"
  },
  {
    title: "Weekend Special Offer",
    couponCode: "WEEKEND20",
    endTime: "2024-12-31T23:59:59Z",
    discountPercentage: 20,
    minimumAmount: 500,
    productType: "Headphones & Audio",
    logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
  },
  {
    title: "Student Discount",
    couponCode: "STUDENT15",
    endTime: "2024-12-31T23:59:59Z",
    discountPercentage: 15,
    minimumAmount: 300,
    productType: "Smart Watches",
    logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Import models
    const Category = require('./packages/db/models/Category');
    const Brand = require('./packages/db/models/Brand');
    const Product = require('./packages/db/models/Product');
    const Coupon = require('./packages/db/models/Coupon');

    // Clear existing data
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});

    // Insert categories
    console.log('Inserting categories...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ ${insertedCategories.length} categories created`);

    // Insert brands
    console.log('Inserting brands...');
    const insertedBrands = await Brand.insertMany(brands);
    console.log(`✅ ${insertedBrands.length} brands created`);

    // Insert coupons
    console.log('Inserting coupons...');
    const insertedCoupons = await Coupon.insertMany(coupons);
    console.log(`✅ ${insertedCoupons.length} coupons created`);

    // Products for each category
    const products = [
      // Smartphones & Phones
      {
        sku: 'IPH14-001',
        title: 'iPhone 14 Pro',
        parent: 'Smartphones & Phones',
        children: 'Smartphones',
        tags: ['smartphone', 'apple', 'ios', 'premium'],
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        originalPrice: 1299,
        price: 1199,
        discount: 100,
        relatedImages: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400'
        ],
        description: 'Latest iPhone with advanced camera system and A16 Bionic chip',
        brand: {
          name: insertedBrands[0].name,
          id: insertedBrands[0]._id
        },
        category: {
          name: insertedCategories[0].parent,
          id: insertedCategories[0]._id
        },
        unit: 'piece',
        quantity: 50,
        colors: ['Deep Purple', 'Gold', 'Silver', 'Space Black'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'SAM-S23-001',
        title: 'Samsung Galaxy S23 Ultra',
        parent: 'Smartphones & Phones',
        children: 'Smartphones',
        tags: ['smartphone', 'samsung', 'android', 'camera'],
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
        originalPrice: 1399,
        price: 1299,
        discount: 100,
        relatedImages: [
          'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
        ],
        description: 'Flagship Samsung phone with S Pen and 200MP camera',
        brand: {
          name: insertedBrands[1].name,
          id: insertedBrands[1]._id
        },
        category: {
          name: insertedCategories[0].parent,
          id: insertedCategories[0]._id
        },
        unit: 'piece',
        quantity: 30,
        colors: ['Phantom Black', 'Cream', 'Green', 'Lavender'],
        type: 'physical',
        itemInfo: 'best-selling',
        status: 'active'
      },
      {
        sku: 'GOOG-PIXEL-001',
        title: 'Google Pixel 7 Pro',
        parent: 'Smartphones & Phones',
        children: 'Smartphones',
        tags: ['smartphone', 'google', 'android', 'camera'],
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        originalPrice: 899,
        price: 799,
        discount: 100,
        relatedImages: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
        ],
        description: 'Google\'s flagship with advanced AI camera features',
        brand: {
          name: insertedBrands[2].name,
          id: insertedBrands[2]._id
        },
        category: {
          name: insertedCategories[0].parent,
          id: insertedCategories[0]._id
        },
        unit: 'piece',
        quantity: 25,
        colors: ['Obsidian', 'Snow', 'Hazel'],
        type: 'physical',
        itemInfo: 'latest-product',
        status: 'active'
      },

      // Laptops & Computers
      {
        sku: 'DELL-XPS-001',
        title: 'Dell XPS 13 Laptop',
        parent: 'Laptops & Computers',
        children: 'Laptops',
        tags: ['laptop', 'dell', 'ultrabook', 'business'],
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        originalPrice: 1599,
        price: 1399,
        discount: 200,
        relatedImages: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
        ],
        description: 'Premium ultrabook with Intel i7 processor and 16GB RAM',
        brand: {
          name: insertedBrands[3].name,
          id: insertedBrands[3]._id
        },
        category: {
          name: insertedCategories[1].parent,
          id: insertedCategories[1]._id
        },
        unit: 'piece',
        quantity: 25,
        colors: ['Silver', 'Black'],
        type: 'physical',
        itemInfo: 'latest-product',
        status: 'active'
      },
      {
        sku: 'MAC-AIR-001',
        title: 'MacBook Air M2',
        parent: 'Laptops & Computers',
        children: 'Laptops',
        tags: ['laptop', 'apple', 'macbook', 'ultrabook'],
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        originalPrice: 1199,
        price: 1099,
        discount: 100,
        relatedImages: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
        ],
        description: 'Apple\'s thinnest and lightest laptop with M2 chip',
        brand: {
          name: insertedBrands[0].name,
          id: insertedBrands[0]._id
        },
        category: {
          name: insertedCategories[1].parent,
          id: insertedCategories[1]._id
        },
        unit: 'piece',
        quantity: 40,
        colors: ['Space Gray', 'Silver', 'Gold', 'Midnight'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'LENOVO-THINK-001',
        title: 'Lenovo ThinkPad X1 Carbon',
        parent: 'Laptops & Computers',
        children: 'Laptops',
        tags: ['laptop', 'lenovo', 'business', 'thinkpad'],
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        originalPrice: 1799,
        price: 1599,
        discount: 200,
        relatedImages: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
        ],
        description: 'Premium business laptop with exceptional build quality',
        brand: {
          name: insertedBrands[4].name,
          id: insertedBrands[4]._id
        },
        category: {
          name: insertedCategories[1].parent,
          id: insertedCategories[1]._id
        },
        unit: 'piece',
        quantity: 20,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'best-selling',
        status: 'active'
      },

      // Tablets & iPads
      {
        sku: 'IPD-AIR-001',
        title: 'iPad Air (5th Generation)',
        parent: 'Tablets & iPads',
        children: 'Tablets',
        tags: ['tablet', 'apple', 'ipad', 'creative'],
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        originalPrice: 749,
        price: 699,
        discount: 50,
        relatedImages: [
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
        ],
        description: 'Powerful iPad Air with M1 chip and stunning display',
        brand: {
          name: insertedBrands[0].name,
          id: insertedBrands[0]._id
        },
        category: {
          name: insertedCategories[2].parent,
          id: insertedCategories[2]._id
        },
        unit: 'piece',
        quantity: 35,
        colors: ['Space Gray', 'Pink', 'Purple', 'Blue', 'Starlight'],
        type: 'physical',
        itemInfo: 'best-selling',
        status: 'active'
      },
      {
        sku: 'SAM-TAB-001',
        title: 'Samsung Galaxy Tab S9',
        parent: 'Tablets & iPads',
        children: 'Tablets',
        tags: ['tablet', 'samsung', 'android', 'amoled'],
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        originalPrice: 799,
        price: 699,
        discount: 100,
        relatedImages: [
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
        ],
        description: 'Premium Android tablet with S Pen and AMOLED display',
        brand: {
          name: insertedBrands[1].name,
          id: insertedBrands[1]._id
        },
        category: {
          name: insertedCategories[2].parent,
          id: insertedCategories[2]._id
        },
        unit: 'piece',
        quantity: 30,
        colors: ['Graphite', 'Beige'],
        type: 'physical',
        itemInfo: 'latest-product',
        status: 'active'
      },

      // Headphones & Audio
      {
        sku: 'SONY-WH-001',
        title: 'Sony WH-1000XM4 Headphones',
        parent: 'Headphones & Audio',
        children: 'Headphones',
        tags: ['headphones', 'sony', 'wireless', 'noise-cancelling'],
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        originalPrice: 399,
        price: 299,
        discount: 100,
        relatedImages: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
        ],
        description: 'Industry-leading noise cancelling wireless headphones',
        brand: {
          name: insertedBrands[2].name,
          id: insertedBrands[2]._id
        },
        category: {
          name: insertedCategories[3].parent,
          id: insertedCategories[3]._id
        },
        unit: 'piece',
        quantity: 40,
        colors: ['Black', 'Silver'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'APPLE-AIR-001',
        title: 'AirPods Pro (2nd Generation)',
        parent: 'Headphones & Audio',
        children: 'Earbuds',
        tags: ['earbuds', 'apple', 'wireless', 'noise-cancelling'],
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        originalPrice: 249,
        price: 199,
        discount: 50,
        relatedImages: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
        ],
        description: 'Premium wireless earbuds with active noise cancellation',
        brand: {
          name: insertedBrands[0].name,
          id: insertedBrands[0]._id
        },
        category: {
          name: insertedCategories[3].parent,
          id: insertedCategories[3]._id
        },
        unit: 'piece',
        quantity: 60,
        colors: ['White'],
        type: 'physical',
        itemInfo: 'best-selling',
        status: 'active'
      },

      // Smart Watches
      {
        sku: 'APPLE-WATCH-001',
        title: 'Apple Watch Series 9',
        parent: 'Smart Watches',
        children: 'Smartwatches',
        tags: ['smartwatch', 'apple', 'fitness', 'health'],
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        originalPrice: 399,
        price: 349,
        discount: 50,
        relatedImages: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
        ],
        description: 'Latest Apple Watch with advanced health features',
        brand: {
          name: insertedBrands[0].name,
          id: insertedBrands[0]._id
        },
        category: {
          name: insertedCategories[4].parent,
          id: insertedCategories[4]._id
        },
        unit: 'piece',
        quantity: 45,
        colors: ['Midnight', 'Starlight', 'Silver', 'Red'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'SAM-WATCH-001',
        title: 'Samsung Galaxy Watch 6',
        parent: 'Smart Watches',
        children: 'Smartwatches',
        tags: ['smartwatch', 'samsung', 'android', 'fitness'],
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        originalPrice: 349,
        price: 299,
        discount: 50,
        relatedImages: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
        ],
        description: 'Premium Android smartwatch with health monitoring',
        brand: {
          name: insertedBrands[1].name,
          id: insertedBrands[1]._id
        },
        category: {
          name: insertedCategories[4].parent,
          id: insertedCategories[4]._id
        },
        unit: 'piece',
        quantity: 35,
        colors: ['Graphite', 'Silver', 'Gold'],
        type: 'physical',
        itemInfo: 'latest-product',
        status: 'active'
      },

      // Cameras & Photography
      {
        sku: 'CANON-EOS-001',
        title: 'Canon EOS R6 Mark II',
        parent: 'Cameras & Photography',
        children: 'Cameras',
        tags: ['camera', 'canon', 'mirrorless', 'professional'],
        image: 'http://localhost:3000/assets/img/product/product-1.jpg',
        originalPrice: 2499,
        price: 2199,
        discount: 300,
        relatedImages: [
          'http://localhost:3000/assets/img/product/product-1.jpg'
        ],
        description: 'Professional mirrorless camera with 4K video',
        brand: {
          name: insertedBrands[2].name,
          id: insertedBrands[2]._id
        },
        category: {
          name: insertedCategories[5].parent,
          id: insertedCategories[5]._id
        },
        unit: 'piece',
        quantity: 15,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'SONY-A7-001',
        title: 'Sony A7 IV Camera',
        parent: 'Cameras & Photography',
        children: 'Cameras',
        tags: ['camera', 'sony', 'mirrorless', '4k'],
        image: 'http://localhost:3000/assets/img/product/product-2.jpg',
        originalPrice: 2499,
        price: 2299,
        discount: 200,
        relatedImages: [
          'http://localhost:3000/assets/img/product/product-2.jpg'
        ],
        description: 'Full-frame mirrorless camera with 33MP sensor',
        brand: {
          name: insertedBrands[2].name,
          id: insertedBrands[2]._id
        },
        category: {
          name: insertedCategories[5].parent,
          id: insertedCategories[5]._id
        },
        unit: 'piece',
        quantity: 20,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'best-selling',
        status: 'active'
      },

      // Gaming & Accessories
      {
        sku: 'PS5-001',
        title: 'PlayStation 5 Console',
        parent: 'Gaming & Accessories',
        children: 'Gaming Consoles',
        tags: ['gaming', 'playstation', 'console', '4k'],
        image: 'http://localhost:3000/assets/img/product/product-3.jpg',
        originalPrice: 499,
        price: 449,
        discount: 50,
        relatedImages: [
          'http://localhost:3000/assets/img/product/product-3.jpg'
        ],
        description: 'Next-generation gaming console with 4K graphics',
        brand: {
          name: insertedBrands[2].name,
          id: insertedBrands[2]._id
        },
        category: {
          name: insertedCategories[6].parent,
          id: insertedCategories[6]._id
        },
        unit: 'piece',
        quantity: 25,
        colors: ['White'],
        type: 'physical',
        itemInfo: 'top-rated',
        status: 'active'
      },
      {
        sku: 'XBOX-SERIES-001',
        title: 'Xbox Series X Console',
        parent: 'Gaming & Accessories',
        children: 'Gaming Consoles',
        tags: ['gaming', 'xbox', 'console', '4k'],
        image: 'http://localhost:3000/assets/img/product/product-4.jpg',
        originalPrice: 499,
        price: 449,
        discount: 50,
        relatedImages: [
          'http://localhost:3000/assets/img/product/product-4.jpg'
        ],
        description: 'Microsoft\'s most powerful gaming console',
        brand: {
          name: insertedBrands[4].name,
          id: insertedBrands[4]._id
        },
        category: {
          name: insertedCategories[6].parent,
          id: insertedCategories[6]._id
        },
        unit: 'piece',
        quantity: 30,
        colors: ['Black'],
        type: 'physical',
        itemInfo: 'best-selling',
        status: 'active'
      }
    ];

    // Insert products
    console.log('Inserting products...');
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ ${insertedProducts.length} products created`);

    // --- Add sample users ---
    const bcrypt = require('bcryptjs');
    const User = require('./packages/db/models/User');
    await User.deleteMany({});
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('password123', 10),
        isEmailVerified: true,
        role: 'user',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        phone: '+1234567890',
        address: 'New York, USA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: bcrypt.hashSync('password123', 10),
        isEmailVerified: true,
        role: 'user',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        phone: '+1987654321',
        address: 'London, UK',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    const insertedUsers = await User.insertMany(users);
    console.log(`✅ ${insertedUsers.length} users created`);

    // --- Add sample orders ---
    const Order = require('./packages/db/models/Order');
    await Order.deleteMany({});
    const orders = [
      {
        user: insertedUsers[0]._id,
        cart: [
          { product: insertedProducts[0]._id, quantity: 1, price: insertedProducts[0].price },
          { product: insertedProducts[1]._id, quantity: 2, price: insertedProducts[1].price }
        ],
        shippingAddress: { city: 'New York', country: 'USA', address: '123 Main St' },
        paymentMethod: 'Credit Card',
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        totalAmount: insertedProducts[0].price + 2 * insertedProducts[1].price,
        shippingCost: 20,
        subTotal: insertedProducts[0].price + 2 * insertedProducts[1].price - 20,
        zipCode: '10001',
        country: 'USA',
        city: 'New York',
        contact: '+1234567890',
        email: 'john@example.com',
        address: '123 Main St, New York, USA',
        name: 'John Doe',
        invoiceNumber: 'INV-692d24',
        invoiceUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: insertedUsers[1]._id,
        cart: [
          { product: insertedProducts[2]._id, quantity: 1, price: insertedProducts[2].price }
        ],
        shippingAddress: { city: 'London', country: 'UK', address: '456 Queen St' },
        paymentMethod: 'PayPal',
        paymentStatus: 'pending',
        orderStatus: 'processing',
        totalAmount: insertedProducts[2].price,
        shippingCost: 15,
        subTotal: insertedProducts[2].price - 15,
        zipCode: 'SW1A 1AA',
        country: 'UK',
        city: 'London',
        contact: '+1987654321',
        email: 'jane@example.com',
        address: '456 Queen St, London, UK',
        name: 'Jane Smith',
        invoiceNumber: 'INV-692d25',
        invoiceUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // More demo orders
      {
        user: insertedUsers[0]._id,
        cart: [
          { product: insertedProducts[3]._id, quantity: 2, price: insertedProducts[3].price }
        ],
        shippingAddress: { city: 'Los Angeles', country: 'USA', address: '789 Sunset Blvd' },
        paymentMethod: 'Card',
        paymentStatus: 'paid',
        orderStatus: 'pending',
        totalAmount: insertedProducts[3].price * 2,
        shippingCost: 18,
        subTotal: insertedProducts[3].price * 2 - 18,
        zipCode: '90001',
        country: 'USA',
        city: 'Los Angeles',
        contact: '+1234567890',
        email: 'john@example.com',
        address: '789 Sunset Blvd, Los Angeles, USA',
        name: 'John Doe',
        invoiceNumber: 'INV-692d26',
        invoiceUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user: insertedUsers[1]._id,
        cart: [
          { product: insertedProducts[4]._id, quantity: 1, price: insertedProducts[4].price },
          { product: insertedProducts[5]._id, quantity: 1, price: insertedProducts[5].price }
        ],
        shippingAddress: { city: 'Manchester', country: 'UK', address: '101 Oxford Rd' },
        paymentMethod: 'Card',
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        totalAmount: insertedProducts[4].price + insertedProducts[5].price,
        shippingCost: 12,
        subTotal: insertedProducts[4].price + insertedProducts[5].price - 12,
        zipCode: 'M13 9PL',
        country: 'UK',
        city: 'Manchester',
        contact: '+1987654321',
        email: 'jane@example.com',
        address: '101 Oxford Rd, Manchester, UK',
        name: 'Jane Smith',
        invoiceNumber: 'INV-692d27',
        invoiceUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    const insertedOrders = await Order.insertMany(orders);
    console.log(`✅ ${insertedOrders.length} orders created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Brands: ${insertedBrands.length}`);
    console.log(`   Coupons: ${insertedCoupons.length}`);
    console.log(`   Products: ${insertedProducts.length}`);
    console.log(`   Users: ${insertedUsers.length}`);
    console.log(`   Orders: ${insertedOrders.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 