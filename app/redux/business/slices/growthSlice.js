import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";

export const growthApi = createApi({
    reducerPath: "growthApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getBranchInfo: builder.mutation({
            query: (payload) => ({
                url: "/store/new",
                method: "POST",
                data: payload,
            }),
        }),

        getStoreDetails: builder.query({
            query: (params = {}) => ({
                url: "/store",
                method: "GET",
                params,
                forceRefetch: ({
                    currentArg,
                    previousArg,
                }) => currentArg !== previousArg,
                invalidatesTags: ["storeInfo"],
            }),
        }),

        getStoreGrowth: builder.query({
            query: ({ dateFrom, dateTo, interval }) => ({
                url: `/store/growth?startDate=${dateFrom}&endDate=${dateTo}&interval=${interval}`,
                method: "GET",
                forceRefetch: ({
                    currentArg,
                    previousArg,
                }) => currentArg !== previousArg,
            }),
        }),

        getStoreCategoriesGrowth: builder.query({
            query: ({ dateFrom, dateTo, interval }) => ({
                url: `/store/category-sales?startDate=${dateFrom}&endDate=${dateTo}&interval=${interval}`,
                method: "GET",
                forceRefetch: ({
                    currentArg,
                    previousArg,
                }) => currentArg !== previousArg,
            }),
        }),

        getStoreProductsGrowth: builder.query({
            query: ({ dateFrom, dateTo, interval }) => ({
                url: `/store/product-count?start=${dateFrom}&end=${dateTo}&interval=${interval.toLowerCase()}`,
                method: "GET",
                forceRefetch: ({
                    currentArg,
                    previousArg,
                }) => currentArg !== previousArg,
            }),
        }),

        getStoreSalesGrowth: builder.query({
            query: ({ dateFrom, dateTo, interval }) => ({
                url: `/store/sales-count?start=${dateFrom}&end=${dateTo}&interval=${interval.toLowerCase()}`,
                method: "GET",
                forceRefetch: ({
                    currentArg,
                    previousArg,
                }) => currentArg !== previousArg,
            }),
        }),

        getFeaturedCategories: builder.query({
            query: (for_store) => ({
                url: `/corisio/category/thread?for_store=${for_store ? "true" : "false"}`,
                method: "GET",
                forceRefetch: ({
                    currentArg,
                    previousArg,
                }) => currentArg !== previousArg,
            }),
        }),

        updateBranchImages: builder.mutation({
            query: (payload) => ({
                url: "/branch/images",
                method: "POST",
                data: payload,
                providesTags: ["storeInfo"],
            }),
        }),

        getStaffAccount: builder.query({
            query: () => ({
                url: "/store/get-account",
                method: "GET",
                forceRefetch: ({
                    currentArg,
                    previousArg,
                }) => currentArg !== previousArg,
            }),
        }),
    }),
});

export const {
    useGetFeaturedCategoriesQuery,
    useGetStoreDetailsQuery,
    useGetStoreGrowthQuery,
    useGetStoreProductsGrowthQuery,
    useGetStoreSalesGrowthQuery,
    useGetStoreCategoriesGrowthQuery,
    useGetBranchInfoMutation,
    useUpdateBranchImagesMutation,
    useGetStaffAccountQuery,
} = growthApi;