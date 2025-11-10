import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const ordersCustomersApi = createApi({
    reducerPath: 'ordersCustomersApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Order', 'Customer', 'Cart', 'OrderCount'],
    endpoints: (builder) => ({
        fetchStoreOrders: builder.query({
            query: (params) => ({
                url: '/branch/order-request',
                method: 'GET',
                params,
            }),
            providesTags: ['Order'],
        }),

        BriefRecentOrders: builder.query({
            query: (params) => ({
                url: '/branch/orders-brief',
                method: 'GET',
                params,
            }),
            providesTags: ['Order'],
        }),

        fetchOrderProducts: builder.query({
            query: (orderId) => ({
                url: `branch/order-product/${orderId}`,
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        listOrderItems: builder.query({
            query: (orderId) => ({
                url: `branch/order/${orderId}`,
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        getStoreOrderCount: builder.query({
            query: () => ({
                url: '/branch/order-count',
                method: 'GET',
            }),
            providesTags: ['OrderCount'],
        }),

        fetchOrderByPicker: builder.mutation({
            query: (data) => ({
                url: '/branch/picker-order',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Order'],
        }),

        confirmPicker: builder.mutation({
            query: (data) => ({
                url: '/branch/confirm-picker',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Order'],
        }),

        updateOrder: builder.mutation({
            query: (data) => ({
                url: '/branch/order-update',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Order', 'OrderCount'],
        }),

        getCustomers: builder.query({
            query: (params) => ({
                url: '/branch/customers',
                method: 'GET',
                params,
            }),
            providesTags: ['Customer'],
        }),

        getCustomerSegmentation: builder.query({
            query: () => ({
                url: '/branch/customers/segment',
                method: 'GET',
            }),
            providesTags: ['Customer'],
        }),

        getPurchaseHistory: builder.query({
            query: (params) => ({
                url: '/branch/customers/history',
                method: 'GET',
                params,
            }),
            providesTags: ['Customer'],
        }),

        getMyCarts: builder.query({
            query: (params) => ({
                url: '/branch/cart-products',
                method: 'GET',
                params,
            }),
            providesTags: ['Cart'],
        }),
    }),
});

export const {
    useFetchStoreOrdersQuery,
    useBriefRecentOrdersQuery,
    useFetchOrderProductsQuery,
    useListOrderItemsQuery,
    useGetStoreOrderCountQuery,
    useFetchOrderByPickerMutation,
    useConfirmPickerMutation,
    useUpdateOrderMutation,
    useGetCustomersQuery,
    useGetCustomerSegmentationQuery,
    useGetPurchaseHistoryQuery,
    useGetMyCartsQuery,
} = ordersCustomersApi;