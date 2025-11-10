import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        uploadProduct: builder.mutation({
            query: (payload) => ({
                url: "/store/product/new",
                method: "POST",
                data: payload,
            }),
        }),

        updateProduct: builder.mutation({
            query: (payload) => ({
                url: "/store/product/edit",
                method: "POST",
                data: payload,
            }),
        }),

        updateProductStatus: builder.mutation({
            query: (payload) => ({
                url: "/store/product/status",
                method: "PUT",
                data: payload,
            }),
        }),

        getStoreProducts: builder.query({
            query: () => ({
                url: "/store/get-products",
                method: "GET",
            }),
        }),

        getOneProducts: builder.query({
            query: ({ id }) => ({
                url: "/store/get-one-product/" + id,
                method: "GET",
            }),
        }),

        getStoreFilesCount: builder.query({
            query: () => ({
                url: "/store/files-count",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useUploadProductMutation,
    useUpdateProductMutation,
    useUpdateProductStatusMutation,
    useGetStoreProductsQuery,
    useGetOneProductsQuery,
    useGetStoreFilesCountQuery
} = productApi;