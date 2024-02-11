import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";

export const productsApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "products",
  //= queryKey in react-query, for caching
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET Products
    getProductList: builder.query({
      query: (arg) => {
        return {
          // => {baseURl}/products
          url: `/products?populate=category,thumbnail&pagination[page]=${arg}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: number }) => ({
                type: "Products",
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    //** GET Product
    getProduct: builder.query({
      query: (arg) => {
        return {
          // => {baseURl}/products
          url: `/products/${arg.id}?populate=thumbnail,category&fields[0]=title&fields[1]=description&fields[2]=price`,
        };
      },
    }),

    // ** CREATE
    createDashboardProducts: builder.mutation({
      query: (body) => {
        return {
          url: `/products`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    // ** DELETE
    deleteDashboardProducts: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    // ** UPDATE
    updateDashboardProducts: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getProductList",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

//useGetProductListQuery is a hook that can be used to fetch products
export const {
  useGetProductListQuery,
  useGetProductQuery,
  useDeleteDashboardProductsMutation,
  useUpdateDashboardProductsMutation,
  useCreateDashboardProductsMutation,
} = productsApiSlice;
