import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Chat'],
    endpoints: (builder) => ({
        getUsersToChat: builder.query({
            query: (params) => ({
                url: '/chat/users',
                method: 'GET',
                params,
                providesTags: ['Chat']
            }),
        }),

        getChatMessages: builder.query({
            query: (params) => ({
                url: '/store/chat/messages',
                method: "GET",
                params,
                providesTags: ['Chat']
            }),
        }),
    }),
});

export const {
    useGetChatMessagesQuery,
    useGetUsersToChatQuery,
} = chatApi;