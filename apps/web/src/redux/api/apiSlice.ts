import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '').replace(/\/api$/, '') || '',
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = (getState() as any).auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Admin', 
    'Product', 
    'Category', 
    'Brand', 
    'Order', 
    'Coupon',
    'DashboardAmount',
    'DashboardSalesReport', 
    'DashboardMostSellingCategory',
    'DashboardRecentOrders',
    'AllOrders',
    'AllStaff',
    'Stuff',
    'AllProducts',
    'SingleProduct',
    'AllCoupons',
    'AllCategory',
    'getCategory',
    'AllBrands',
    'getBrand'
  ],
  endpoints: (builder) => ({}),
});
