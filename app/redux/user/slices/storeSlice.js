import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// Views Slice
export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Store', 'Search'],
    endpoints: (builder) => ({
        // Set view
        getStoresNearby: builder.query({
            query: (params) => ({
                url: '/home/near-stores',
                method: 'GET',
                params,
            }),
            providesTags: ['Search'],
        }),

        // Get views
        searchStore: builder.query({
            query: (params) => ({
                url: '/store-search',
                method: "GET",
                params,
                providesTags: ['Search']
            }),
        }),

        getStoreInfo: builder.query({
            query: (params) => ({
                url: '/branch/info',
                method: "GET",
                params,
                providesTags: ['View']
            }),
        }),

        getStoreCategories: builder.query({
            query: (params) => ({
                url: '/store/all-categories',
                method: "GET",
                params,
            }),
        }),
        getStoreProducts: builder.query({
            query: (params) => ({
                url: '/store/products-campaign',
                method: "GET",
                params,
            }),
        }),
    }),
});

export const {
    useGetStoresNearbyQuery,
    useSearchStoreQuery,
    useGetStoreInfoQuery,
    useGetStoreCategoriesQuery,
    useGetStoreProductsQuery,
} = storeApi;