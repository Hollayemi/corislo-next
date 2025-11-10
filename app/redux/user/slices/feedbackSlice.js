// store/api/feedbackApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Feedback'],
    endpoints: (builder) => ({

        saveProductFeedbacks: builder.mutation({
            query: (data) => ({
                url: '/product/feedback',
                method: 'POST',
                data: data,
            }),
        }),

        getProductFeedbacks: builder.query({
            query: ({ productId, page }) => ({
                url: `/product/feedback/${productId}`,
                params: { page },
                method: 'GET',
            }),
        }),

        saveStoreFeedbacks: builder.mutation({
            query: (data) => ({
                url: '/product/feedback',
                method: 'POST',
                data: data,
            }),
        }),

        getStoreFeedbacks: builder.query({
            query: ({ store, branch }) => ({
                url: `/store/feedback/${store}/${branch}`,
                method: 'GET',
            }),
        }),

    }),
});

export const {
    useSaveProductFeedbacksMutation,
    useGetProductFeedbacksQuery,
    useSaveStoreFeedbacksMutation,
    useGetStoreFeedbacksQuery
} = feedbackApi;