import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const savedItemsApi = createApi({
    reducerPath: 'savedItemsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['SavedItem'],
    endpoints: (builder) => ({
        // Save item
        saveItem: builder.mutation({
            query: (data) => ({
                url: '/user/save-item',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['SavedItem'],
        }),

        saveCartItem: builder.mutation({
            query: (data) => ({
                url: '/user/save-cart-item',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['SavedItem'],
        }),

        // Get saved items
        getSavedItems: builder.query({
            query: () => ({
                url: '/user/saved-items',
                providesTags: ['SavedItem'],
                method: "GET"
            }),
        }),

        // Get saved products
        getSavedProducts: builder.query({
            query: () => ({
                url: '/user/save-item/prods',
                providesTags: ['SavedItem'],
                method: "GET"
            }),
        }),

        // Get grouped saved items
        getGroupedSavedItems: builder.query({
            query: () => ({
                url: '/user/saved-items/group',
                providesTags: ['SavedItem'],
                method: "GET"
            }),
        }),

        // Change saved item quantity
        changeSavedItemQuantity: builder.mutation({
            query: (data) => ({
                url: '/user/saved-item/qty',
                method: 'GET',
                data,
            }),
            invalidatesTags: ['SavedItem'],
        }),

        // Delete bulk saved items
        deleteBulkSavedItems: builder.mutation({
            query: (data) => ({
                url: '/user/saved-items/delete-bulk',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['SavedItem'],
        }),
    }),
});

export const {
    useSaveItemMutation,
    useSaveCartItemMutation,
    useGetSavedItemsQuery,
    useGetSavedProductsQuery,
    useGetGroupedSavedItemsQuery,
    useChangeSavedItemQuantityMutation,
    useDeleteBulkSavedItemsMutation,
} = savedItemsApi;