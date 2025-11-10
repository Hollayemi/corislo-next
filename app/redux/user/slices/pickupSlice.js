import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// Pickup Agent Slice
export const pickupApi = createApi({
    reducerPath: 'pickupApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Pickup'],
    endpoints: (builder) => ({
        // Add pickup agent
        addPickupAgent: builder.mutation({
            query: (data) => ({
                url: '/user/pickup',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Pickup'],
        }),

        // Get pickup agents
        getPickupAgents: builder.query({
            query: () => ({
                url: '/user/pickers',
                method: "GET",
                providesTags: ['Pickup']
            }),
        }),

        // Delete pickup agent
        deletePickupAgent: builder.mutation({
            query: (pickupId) => ({
                url: `/user/pickup/${pickupId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Pickup'],
        }),
    }),
});

export const {
    useAddPickupAgentMutation,
    useGetPickupAgentsQuery,
    useDeletePickupAgentMutation,
} = pickupApi;