import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all brands
    getAllBrands: builder.query({
      query: () => `/api/brand/all`,
      providesTags: ["Brand"],
      keepUnusedDataFor: 600,
      transformResponse: (response: {success: boolean, data: any[]}) => {
        return response.data || [];
      },
    }),
    // add brand - use POST to /api/brand
    addBrand: builder.mutation({
      query(data) {
        return {
          url: `/api/brand`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Brand"],
    }),
    // edit brand - use PATCH to /api/brand/${id}
    editBrand: builder.mutation({
      query({ id, data }) {
        return {
          url: `/api/brand/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Brand"],
    }),
    // get single brand - use GET to /api/brand/${id}
    getBrand: builder.query({
      query: (id) => `/api/brand/${id}`,
      providesTags: ["Brand"]
    }),
    // delete brand - use DELETE to /api/brand/${id}
    deleteBrand: builder.mutation({
      query(id: string) {
        return {
          url: `/api/brand/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useAddBrandMutation,
  useEditBrandMutation,
  useGetBrandQuery,
  useDeleteBrandMutation,
} = authApi;
