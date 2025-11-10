import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const campaignsDashboardApi = createApi({
    reducerPath: 'campaignsDashboardApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Campaign', 'Announcement', 'Dashboard', 'Notification'],
    endpoints: (builder) => ({
        getAllCampaigns: builder.query({
            query: (params) => ({
                url: '/branch/campaign',
                method: 'GET',
                params,
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Campaign', id })), 'Campaign']
                    : ['Campaign'],
        }),

        addCampaign: builder.mutation({
            query: (campaignData) => ({
                url: '/branch/campaign',
                method: 'POST',
                body: campaignData,
            }),
            invalidatesTags: ['Campaign'],
        }),

        getCampaignStats: builder.query({
            query: () => ({
                url: '/branch/campaign/stats',
                method: 'GET',
            }),
            providesTags: ['Campaign'],
        }),

        getAnnouncements: builder.query({
            query: (params) => ({
                url: '/branch/announcement',
                method: 'GET',
                params,
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Announcement', id }), 'Announcement')]
                    : ['Announcement'],
        }),

        addAnnouncement: builder.mutation({
            query: (announcementData) => ({
                url: '/branch/announcement',
                method: 'POST',
                body: announcementData,
            }),
            invalidatesTags: ['Announcement'],
        }),

        getDashboardCards: builder.query({
            query: (params) => ({
                url: '/dashboard/cards',
                method: 'GET',
                params,
            }),
            providesTags: ['Dashboard'],
        }),

        getCategorySalesCount: builder.query({
            query: (params) => ({
                url: '/dashboard/categorie-count',
                method: 'GET',
                params,
            }),
            providesTags: ['Dashboard'],
        }),

        getOrderCartViewIncrement: builder.query({
            query: (params) => ({
                url: '/branch/increment-chart',
                method: 'GET',
                params,
            }),
            providesTags: ['Dashboard'],
        }),

        getRecentBuyersBubble: builder.query({
            query: (params) => ({
                url: '/branch/buyer-chart',
                method: 'GET',
                params,
            }),
            providesTags: ['Dashboard'],
        }),

        getBusinessNotifications: builder.query({
            query: (params) => ({
                url: '/store/notification',
                method: 'GET',
                params,
            })
        }),

        viewAllStoreNotifications: builder.mutation({
            query: () => ({
                url: '/branch/notification/view-all',
                method: 'POST',
            }),
            invalidatesTags: ['Notification'],
        }),

        deleteNotifications: builder.mutation({
            query: (data) => ({
                url: '/store/delete/notification',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});

export const {
    useGetAllCampaignsQuery,
    useAddCampaignMutation,
    useGetCampaignStatsQuery,
    useGetAnnouncementsQuery,
    useAddAnnouncementMutation,
    useGetDashboardCardsQuery,
    useGetCategorySalesCountQuery,
    useGetOrderCartViewIncrementQuery,
    useGetRecentBuyersBubbleQuery,
    useGetBusinessNotificationsQuery,
    useViewAllStoreNotificationsMutation,
    useDeleteNotificationsMutation,
} = campaignsDashboardApi;