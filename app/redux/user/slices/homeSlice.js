import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';
// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Product', 'Search', 'HomeData'],
    endpoints: (builder) => ({
        // Get all products (requires authentication)
        getAllCategories: builder.query({
            query: () => ({
                url: '/corisio/all-categories',
                method: "GET",
            }),
        }),
        // Get all products (requires authentication)
        getAllProducts: builder.query({
            query: ({ productId, p = 1, search, limit = 20, lat, lng, ...rest }) => {
                const currentLocation = {};
                console.log("currentLocation===>", currentLocation)
                return ({
                    url: '/products',
                    method: "GET",
                    params: {
                        lat: lat || currentLocation?.latitude,
                        lng: lng || currentLocation?.longitude,
                        limit,
                        search,
                        productId,
                        p,
                        ...rest
                    },
                    providesTags: ['Product']
                })
            },
        }),
        // Search products
        searchProducts: builder.mutation({
            query: (searchData) => ({
                url: '/search',
                method: 'POST',
                body: searchData,
            }),
            invalidatesTags: ['Search'],
        }),
        // Get available ads for home page
        getAvailableAds: builder.query({
            query: () => ({
                url: '/home/ads',
                method: "GET",
                providesTags: ['HomeData']
            }),
        }),
        // Get flash sales for home page
        getFlashSales: builder.query({
            query: () => ({
                url: '/home/flashsales',
                method: "GET",
                providesTags: ['HomeData']
            }),
        }),

        // Get popular products for home page
        getPopularProducts: builder.query({
            query: ({ lat, lng }) => ({
                url: '/home/popular-products',
                method: "GET",
                params: {
                    lat,
                    lng,
                },
                providesTags: ['HomeData']
            }),
        }),

    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetAllProductsQuery,
    useSearchProductsMutation,
    useGetAvailableAdsQuery,
    useGetFlashSalesQuery,
    useGetPopularProductsQuery,
} = homeApi;