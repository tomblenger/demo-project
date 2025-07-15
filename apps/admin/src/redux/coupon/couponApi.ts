import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // add coupon - use POST to /api/coupon
    addCoupon: builder.mutation({
      query(data) {
        return {
          url: `/api/coupon`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCoupons"],
    }),
    // getUserOrders
    getAllCoupons: builder.query({
      query: () => `/api/coupon`,
      providesTags: ["AllCoupons"],
      keepUnusedDataFor: 600,
      transformResponse: (response: {success: boolean, data: any[]}) => {
        return response.data || [];
      },
    }),
    // get single coupon - use GET to /api/coupon/${id}
    getCoupon: builder.query({
      query: (id) => `/api/coupon/${id}`,
      providesTags: ['Coupon']
    }),
    // edit coupon - use PATCH to /api/coupon/${id}
    editCoupon: builder.mutation({
      query({ id, data }) {
        return {
          url: `/api/coupon/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllCoupons", "Coupon"],
    }),
    // delete coupon - use DELETE to /api/coupon/${id}
    deleteCoupon: builder.mutation({
      query(id: string) {
        return {
          url: `/api/coupon/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCoupons"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
  useAddCouponMutation,
  useGetCouponQuery,
  useEditCouponMutation,
} = authApi;
