import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "products",
  //= queryKey in react-query, for caching
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (builder) => ({
    //return hook for fetching data
    getProductList: builder.query({
      query: () => {
        return {
          // => {baseURl}/products
          url: "/products?populate=thumbnail,category",
        };
      },
    }),
  }),
});

export const productApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "productId",
  //= queryKey in react-query, for caching
  tagTypes: ["ProductId"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (builder) => ({
    //return hook for fetching data
    getProduct: builder.query({
      query: (arg) => {
        return {
          // => {baseURl}/products
          url: `/products/${arg.id}?populate=thumbnail,category&fields[0]=title&fields[1]=description&fields[2]=price`,
        };
      },
    }),
  }),
});

//useGetProductListQuery is a hook that can be used to fetch products
export const { useGetProductListQuery } = productsApiSlice;
//useGetProductQuery is a hook that can be used to fetch product
export const { useGetProductQuery } = productApiSlice;
