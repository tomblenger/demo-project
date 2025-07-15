import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, Product, Brand, Category } from '@oakistni/db';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const show = searchParams.get('show');
    const discount = searchParams.get('discount');
    const related = searchParams.get('related');
    const tags = searchParams.get('tags');

    let query = {};
    
    if (show === 'true') {
      query = { status: 'active' };
    } else if (discount === 'true') {
      query = { discount: { $gt: 0 } };
    } else if (related === 'true' && tags) {
      const queryTags = tags.split(',');
      const products = await Product.find({ tags: { $in: queryTags } }).limit(4);
      return NextResponse.json({
        status: true,
        product: products,
      });
    }

    const products = await Product.find(query);
    
    return NextResponse.json({
      success: true,
      data: products,
      products: products,
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Ensure relatedImages is always an array
    const relatedImages = Array.isArray(body.relatedImages) ? body.relatedImages : [];
    const imageURLs = [body.image, ...relatedImages];
    
    // Provide default values for all required fields
    const productData = {
      ...body,
      sku: body.sku || `SKU-${Date.now()}`,
      title: body.title || body.name || 'Untitled Product',
      parent: body.parent || 'Main Category',
      children: body.children || 'Sub Category',
      image: body.image || 'https://via.placeholder.com/300',
      originalPrice: body.originalPrice || body.price || 0,
      price: body.price || 0,
      description: body.description || 'Product description',
      brand: {
        name: body.brand?.name || 'Generic Brand',
        id: body.brand?.id || '507f1f77bcf86cd799439011' // Default ObjectId
      },
      category: {
        name: body.category?.name || 'General',
        id: body.category?.id || '507f1f77bcf86cd799439012' // Default ObjectId
      },
      unit: body.unit || 'piece',
      quantity: body.quantity || 1,
      relatedImages: imageURLs,
    };
    
    const newProduct = new Product(productData);
    
    await newProduct.save();
    const { _id: productId, brand, category } = newProduct;
    
    // Only update brand/category if they have valid IDs and are not default IDs
    if (brand?.id && brand.id !== '507f1f77bcf86cd799439011') {
      try {
        await Brand.updateOne(
          { _id: brand.id },
          { $push: { products: productId } }
        );
      } catch (error) {
        console.warn('Failed to update brand products:', error);
      }
    }
    
    if (category?.id && category.id !== '507f1f77bcf86cd799439012') {
      try {
        await Category.updateOne(
          { _id: category.id },
          { $push: { products: productId } }
        );
      } catch (error) {
        console.warn('Failed to update category products:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Product added successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add product' },
      { status: 500 }
    );
  }
} 

// Handle unsupported HTTP methods
export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
} 