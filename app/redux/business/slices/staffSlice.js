import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const staffApi = createApi({
    reducerPath: 'staffApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Staff'],
    endpoints: (builder) => ({
        getAllStaff: builder.query({
            query: (params) => ({
                url: '/branch/staff',
                method: 'GET',
                params,
            }),
            providesTags: ['Staff'],
        }),

        addStaff: builder.mutation({
            query: (staffData) => ({
                url: '/branch/staff',
                method: 'POST',
                data: staffData,
            }),
            invalidatesTags: ['Staff'],
        }),

        updateStaff: builder.mutation({
            query: (staffData) => ({
                url: '/branch/staff',
                method: 'PUT',
                data: staffData,
            }),
            invalidatesTags: ['Staff'],
        }),

        deleteStaff: builder.mutation({
            query: (staffId) => ({
                url: `/branch/staff/${staffId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Staff'],
        }),

        getStaffRoles: builder.query({
            query: () => ({
                url: '/branch/staff/roles',
                method: 'GET',
            }),
            providesTags: ['Staff'],
        }),

        addStaffRole: builder.mutation({
            query: (roleData) => ({
                url: '/branch/staff/roles',
                method: 'POST',
                data: roleData,
            }),
            invalidatesTags: ['Staff'],
        }),

        updateStaffRole: builder.mutation({
            query: (roleData) => ({
                url: '/branch/staff/roles',
                method: 'PUT',
                data: roleData,
            }),
            invalidatesTags: ['Staff'],
        }),

        deleteStaffRole: builder.mutation({
            query: (roleId) => ({
                url: `/branch/staff/roles/${roleId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Staff'],
        }),

        getStaffPermissions: builder.query({
            query: () => ({
                url: '/branch/staff/permissions',
                method: 'GET',
            }),
            providesTags: ['Staff'],
        }),

        updateStaffPermissions: builder.mutation({
            query: (permissionData) => ({
                url: '/branch/staff/permissions',
                method: 'PUT',
                data: permissionData,
            }),
            invalidatesTags: ['Staff'],
        }),
    }),
});

export const {
    useGetAllStaffQuery,
    useAddStaffMutation,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
    useGetStaffRolesQuery,
    useAddStaffRoleMutation,
    useUpdateStaffRoleMutation,
    useDeleteStaffRoleMutation,
    useGetStaffPermissionsQuery,
    useUpdateStaffPermissionsMutation,
} = staffApi;