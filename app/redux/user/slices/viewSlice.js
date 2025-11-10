import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// Views Slice
export const viewsApi = createApi({
    reducerPath: 'viewsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['View'],
    endpoints: (builder) => ({
        setView: builder.mutation({
            query: (data) => ({
                url: '/user/view',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['View'],
        }),

        // Get views
        getMyViews: builder.query({
            query: () => ({
                url: '/user/view',
                method: "GET",
                providesTags: ['View']
            }),
        }),
    }),
});

export const {
    useSetViewMutation,
    useGetMyViewsQuery,
} = viewsApi;