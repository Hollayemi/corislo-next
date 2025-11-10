import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const referralApi = createApi({
    reducerPath: 'referralApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Refer'],
    endpoints: (builder) => ({
        setBankAccount: builder.mutation({
            query: (data) => ({
                url: '/agent/account',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Refer'],
        }),

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