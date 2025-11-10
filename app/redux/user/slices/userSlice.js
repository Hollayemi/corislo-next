import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

// User Slice
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['User', 'Notification', 'Search'],
    endpoints: (builder) => ({
        // Get user account
        getUserAccount: builder.query({
            query: () => ({
                url: '/user/get-account',
                providesTags: ['User'],
                method: "GET"
            }),
        }),

        // Update user account
        updateUserAccount: builder.mutation({
            query: (userData) => ({
                url: '/user/update',
                method: 'POST',
                data: userData,
            }),
            invalidatesTags: ['User'],
        }),

        // Update profile picture
        updateProfilePicture: builder.mutation({
            query: (formData) => ({
                url: '/user/update-picture',
                method: 'POST',
                data: formData,
            }),
            invalidatesTags: ['User'],
        }),

        // Get user searches
        getUserSearches: builder.query({
            query: () => ({
                url: '/user/searches',
                providesTags: ['Search'],
                method: "GET"
            }),
        }),

        // Get suggestions
        getDiscoverMore: builder.query({
            query: () => ({ url: '/user/suggestions', method: "GET" }),
        }),

        // Notifications
        getUserNotifications: builder.query({
            query: () => ({
                url: '/user/notification',
                providesTags: ['Notification'],
                method: "GET"
            }),
        }),

        viewAllNotifications: builder.query({
            query: () => ({
                url: '/user/notification/view-all',
                providesTags: ['Notification'],
                method: "GET"
            }),
        }),

        updateNotifications: builder.mutation({
            query: (data) => ({
                url: '/user/notification',
                method: 'PATCH',
                data: data,
            }),
            invalidatesTags: ['Notification'],
        }),

        deleteNotification: builder.mutation({
            query: ({ notificationId }) => ({
                url: '/user/notification/delete',
                method: 'DELETE',
                data: { notificationId },
            }),
            invalidatesTags: ['Notification'],
        }),

        subscribeToNotification: builder.mutation({
            query: (data) => ({
                url: '/notifications/subscription',
                method: 'POST',
                data: data,
            }),
        }),

        createNotification: builder.mutation({
            query: (data) => ({
                url: '/user/notification',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Notification'],
        }),

        savePaymentAccount: builder.mutation({
            query: (data) => ({
                url: '/payment/add-account',
                method: 'POST',
                data: data,
            }),
        }),

        getPaymentAccount: builder.query({
            query: () => ({
                url: '/payment/accounts',
                method: 'GET',
            }),
        }),

        getPaymentLogs: builder.query({
            query: () => ({
                url: '/payment/log',
                method: 'GET',
            }),
        }),

    }),
});

export const {
    useGetUserAccountQuery,
    useUpdateUserAccountMutation,
    useUpdateProfilePictureMutation,
    useGetUserSearchesQuery,
    useGetDiscoverMoreQuery,
    useGetUserNotificationsQuery,
    useViewAllNotificationsQuery,
    useUpdateNotificationsMutation,
    useDeleteNotificationMutation,
    useSubscribeToNotificationMutation,
    useCreateNotificationMutation,
    useSavePaymentAccountMutation,
    useGetPaymentAccountQuery,
    useGetPaymentLogsQuery,
} = userApi;