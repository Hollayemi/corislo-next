import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../api/axiosBaseQuery';

export const branchApi = createApi({
    reducerPath: 'branchApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Branch', 'ProductSuggestion', 'BranchInfo'],
    endpoints: (builder) => ({
        getAllBranches: builder.query({
            query: () => ({
                url: '/branch/all',
                method: 'GET',
            }),
            providesTags: ['Branch'],
        }),

        getBranchInfo: builder.query({
            query: (params) => ({
                url: '/branch/info',
                method: 'GET',
                params: params,
            }),
            providesTags: ['BranchInfo'],
        }),

        updateStoreInfo: builder.mutation({
            query: (payload) => ({
                url: `/store/profile`,
                method: "PATCH",
                data: payload,
            }),
        }),

        createNewBranch: builder.mutation({
            query: (branchData) => ({
                url: '/create/branch',
                method: 'POST',
                data: branchData,
            }),
            invalidatesTags: ['Branch'],
        }),

        editBranchInfo: builder.mutation({
            query: (branchData) => ({
                url: '/edit/branch',
                method: 'PUT',
                data: branchData,
            }),
            invalidatesTags: ['Branch', 'BranchInfo'],
        }),

        updateBranchLocation: builder.mutation({
            query: (locationData) => ({
                url: '/branch/location',
                method: 'PUT',
                data: locationData,
            }),
            invalidatesTags: ['Branch', 'BranchInfo'],
        }),

        deleteBranch: builder.mutation({
            query: (branchId) => ({
                url: `delete/branch/${branchId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Branch'],
        }),

        connectBranch: builder.mutation({
            query: ({ branchId, file }) => {
                const formData = new FormData();
                formData.append('branchId', branchId);
                if (file) formData.append('file', file);

                return {
                    url: '/connect/branch',
                    method: 'POST',
                    data: formData,
                };
            },
            invalidatesTags: ['Branch'],
        }),

        uploadStorePicture: builder.mutation({
            query: (data) => ({
                url: '/branch/images',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Branch'],
        }),

        uploadStorePictureLink: builder.mutation({
            query: (data) => ({
                url: '/branch/images/link',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Branch'],
        }),

        deleteStoreFile: builder.mutation({
            query: (data) => ({
                url: '/branch/file/delete',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Branch'],
        }),

        loadAllSuggestions: builder.query({
            query: (category) => ({
                url: `branch/product-suggestion/${category}`,
                method: 'GET',
            }),
            providesTags: ['ProductSuggestion'],
        }),

        productSuggestionsAction: builder.mutation({
            query: (data) => ({
                url: '/branch/product-suggestion-action',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['ProductSuggestion'],
        }),

        getNearBranches: builder.query({
            query: (params) => ({
                url: '/branch/near',
                method: 'GET',
                params,
            }),
        }),

        getBranchFeedbacks: builder.query({
            query: ({ store, branch }) => ({
                url: `/store/feedback/${store}/${branch}`,
                method: 'GET',
            }),
            providesTags: ['Branch'],
        })
    }),
});

export const {
    useGetAllBranchesQuery,
    useGetBranchInfoQuery,
    useUpdateStoreInfoMutation,
    useCreateNewBranchMutation,
    useEditBranchInfoMutation,
    useDeleteBranchMutation,
    useUpdateBranchLocationMutation,
    useConnectBranchMutation,
    useUploadStorePictureMutation,
    useUploadStorePictureLinkMutation,
    useDeleteStoreFileMutation,
    useLoadAllSuggestionsQuery,
    useProductSuggestionsActionMutation,
    useGetNearBranchesQuery,
    useGetBranchFeedbacksQuery,
} = branchApi;