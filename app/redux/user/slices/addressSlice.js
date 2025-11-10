// store/api/addressApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Address'],
    endpoints: (builder) => ({

        // Register
        saveAddress: builder.mutation({
            query: (data) => ({
                url: '/user/address',
                method: 'POST',
                data: data,
            }),
        }),

        // Verify OTP
        getAddresses: builder.query({
            query: (data) => ({
                url: '/user/addresses',
                method: 'GET',
                data: data,
            }),
        }),

        asDefault: builder.mutation({
            query: (data) => ({
                url: '/user/select',
                method: 'POST',
                data,
            }),
        }),

        // Forgot Password
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/user/address/delete/${id}`,
                method: 'DELETE',
                data: { id },
            }),
        }),

        // Reset Password
        updateAddress: builder.mutation({
            query: (data) => ({
                url: '/user/address/edit',
                method: 'POST',
                data: data,
            }),
        }),


    }),
});

export const {
    useAsDefaultMutation,
    useDeleteAddressMutation,
    useGetAddressesQuery,
    useSaveAddressMutation,
    useUpdateAddressMutation
} = addressApi;