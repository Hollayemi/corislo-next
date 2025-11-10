import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        // Add to cart
        addToCart: builder.mutation({
            query: (data) => ({
                url: '/user/cart',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Cart'],
        }),
        // Get user cart
        getMyCart: builder.query({
            query: () => ({
                url: '/user/cart',
                method: "GET",
                providesTags: ['Cart']
            }),
        }),

        // Get cart groups
        getCartGroups: builder.query({
            query: () => ({
                url: '/user/cart-group',
                method: "GET",
                providesTags: ['Cart']
            }),
        }),

        // Get single cart item
        getSingleCartItem: builder.query({
            query: (productId) => ({
                url: `/user/cart/${productId}`,
                method: "GET",
                providesTags: ['Cart']
            }),
        }),

        // Change quantity
        changeCartQuantity: builder.mutation({
            query: (data) => ({
                url: '/user/cart-qty',
                method: 'GET',
                params: data,
            }),
            invalidatesTags: ['Cart'],
        }),

        // Delete bulk cart items
        deleteBulkCart: builder.mutation({
            query: (data) => ({
                url: '/user/cart/delete-bulk',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Cart'],
        }),


        // to-do
        // Clear entire cart
        clearCart: builder.mutation({
            query: () => ({
                url: '/delete/all-cart',
                providesTags: ['Cart'],
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
        // Add multiple items to cart (bulk add for localStorage sync)
        addBulkToCart: builder.mutation({
            query: ({ items }) => ({
                url: '/cart/bulk-add',
                method: 'POST',
                data: { items },
            }),
            invalidatesTags: ['Cart'],
        }),
        // Sync cart from localStorage
        syncCartFromLocal: builder.mutation({
            query: ({ items }) => ({
                url: '/user/cart/bulk-add',
                method: 'POST',
                data: { items },
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useAddToCartMutation,
    useGetMyCartQuery,
    useGetCartGroupsQuery,
    useGetSingleCartItemQuery,
    useChangeCartQuantityMutation,
    useDeleteBulkCartMutation,
    // new
    useAddBulkToCartMutation,
    useClearCartMutation,
    useSyncCartFromLocalMutation,
} = cartApi;