import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// Views Slice
export const referralApi = createApi({
    reducerPath: 'referralApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Refer'],
    endpoints: (builder) => ({
        // Set view
        setBankAccount: builder.mutation({
            query: (data) => ({
                url: '/agent/account',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Refer'],
        }),

        // Get views
        getAgentInfo: builder.query({
            query: () => ({
                url: '/agent',
                method: "GET",
                providesTags: ['Refer']
            }),
        }),
    }),
});

export const {
    useSetBankAccountMutation,
    useGetAgentInfoQuery,
} = referralApi;