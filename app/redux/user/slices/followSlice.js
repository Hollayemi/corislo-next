import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// Following Stores Slice
export const followingApi = createApi({
    reducerPath: 'followingApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Following'],
    endpoints: (builder) => ({
        // Follow store
        followStore: builder.mutation({
            query: (data) => ({
                url: '/user/following',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Following'],
        }),

        // Get following stores
        getFollowingStores: builder.query({
            query: () => ({
                url: '/user/following',
                method: "GET",
                providesTags: ['Following']
            }),
        }),
    }),
});

export const {
    useFollowStoreMutation,
    useGetFollowingStoresQuery,
} = followingApi;