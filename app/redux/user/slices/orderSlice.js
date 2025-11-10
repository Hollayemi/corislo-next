import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// Order Slice
export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        // Create new order
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/user/order',
                method: 'POST',
                data: orderData,
                params: { platform: "browser" }
            }),
            invalidatesTags: ['Order'],
        }),

        // Get user orders
        getMyOrders: builder.query({
            query: ({ status, store, branch, limit = 6, page = 1 }) => ({
                url: `/user/order`,
                method: "GET",
                params: { status, store, branch, limit, page },
                providesTags: ['Order']
            }),
        }),

        // Get single order
        getSingleOrder: builder.query({
            query: (orderId) => ({
                url: `/user/order/${orderId}`,
                method: 'GET',
            }),
        }),

        getPickers: builder.query({
            query: (slugs) => ({
                url: '/user/order/pickers',
                method: "GET",
                params: { slugs }
            })
        }),

        // Get order products
        getOrderProducts: builder.query({
            query: (orderId) => ({
                url: `/user/order/${orderId}`,
                method: "GET",
                providesTags: ['Order']
            }),
        }),

        // Calculate order price
        calculateOrderPrice: builder.mutation({
            query: (data) => ({
                url: '/user/order-price',
                method: 'POST',
                data: data,
            }),
        }),

        // Count orders
        countOrders: builder.query({
            query: () => ({
                url: '/user/order-count',
                method: "GET",
                providesTags: ['Order']
            }),
        }),

        // Track order
        trackOrder: builder.query({
            query: () => ({
                url: '/user/order-track',
                method: "GET",
                providesTags: ['Order']
            }),
        }),

        // Update order
        updateOrder: builder.mutation({
            query: (data) => ({
                url: '/user/order-action',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Order'],
        }),

        // Delete order
        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: `/user/delete-order/${orderId}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Order'],
        }),

        // Get pending reviews
        getPendingReviews: builder.query({
            query: () => ({
                url: '/user/pending-reviews',
                method: "GET",
                providesTags: ['Order']
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetSingleOrderQuery,
    useGetPickersQuery,
    useGetOrderProductsQuery,
    useCalculateOrderPriceMutation,
    useCountOrdersQuery,
    useTrackOrderQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetPendingReviewsQuery,
} = orderApi;