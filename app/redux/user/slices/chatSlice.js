import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// Views Slice
export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Chat'],
    endpoints: (builder) => ({
        // Set view
        getStoresToChat: builder.query({
            query: (params) => ({
                url: '/chat/stores',
                method: 'GET',
                params,
                providesTags: ['Chat']
            }),
        }),

        // Get views
        getChatMessages: builder.query({
            query: (params) => ({
                url: '/user/chat/messages',
                method: "GET",
                params,
                providesTags: ['Chat']
            }),
        }),
    }),
});

export const {
    useGetChatMessagesQuery,
    useGetStoresToChatQuery,
} = chatApi;