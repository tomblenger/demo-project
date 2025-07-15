import { apiSlice } from "src/redux/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    // get offer coupon
    getOfferCoupons: builder.query({
      query: () => `/api/coupon`,
      providesTags: ["Coupon"],
      keepUnusedDataFor: 600,
      transformResponse: (response) => {
        // Handle the API response structure which wraps coupons in a 'data' property
        return response.data || [];
      },
    }),
  }),
});

export const { useGetOfferCouponsQuery } = authApi;
