import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all categories
    getAllCategories: builder.query({
      query: () => `/api/category/all`,
      providesTags: ["Category"],
      keepUnusedDataFor: 600,
      transformResponse: (response: {success: boolean, data: any[]}) => {
        return response.data || [];
      },
    }),
    // add category - use POST to /api/category
    addCategory: builder.mutation({
      query(data) {
        return {
          url: `/api/category`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),
    // delete category - use DELETE to /api/category/${id}
    deleteCategory: builder.mutation({
      query(id: string) {
        return {
          url: `/api/category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),
    // edit category - use PATCH to /api/category/${id}
    editCategory: builder.mutation({
      query({ id, data }) {
        return {
          url: `/api/category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Category"],
    }),
    // get single category - use GET to /api/category/${id}
    getCategory: builder.query({
      query: (id) => `/api/category/${id}`,
      providesTags: ['Category']
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} = authApi;
